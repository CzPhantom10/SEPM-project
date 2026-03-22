import os
from typing import List, Optional

from fastapi import FastAPI, File, Form, UploadFile, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pypdf import PdfReader
from groq import Groq
from dotenv import load_dotenv

# Load environment from project root .env
ROOT_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
load_dotenv(os.path.join(ROOT_DIR, ".env"))

api_key = os.getenv("GROQ_API_KEY")
if not api_key:
    raise RuntimeError("GROQ_API_KEY is not set in .env")

client = Groq(api_key=api_key)

app = FastAPI(title="LexAssist Python Backend")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


def extract_text_from_pdf_bytes(data: bytes) -> str:
    try:
        from io import BytesIO

        reader = PdfReader(BytesIO(data))
        texts: List[str] = []
        for page in reader.pages:
            page_text = page.extract_text() or ""
            texts.append(page_text)
        return "\n".join(texts).strip()
    except Exception as exc:  # noqa: BLE001
        raise HTTPException(status_code=400, detail=f"Failed to read PDF: {exc}") from exc


def ensure_text(file: Optional[UploadFile], text: Optional[str]) -> str:
    """Return text from either an uploaded file or a raw text field.

    - If a PDF is uploaded, extract text from the PDF.
    - If a plain text file is uploaded (e.g. .txt), decode its contents.
    - Otherwise, use the `text` form field.
    """

    if file is not None:
        # Handle text files directly
        if file.content_type and file.content_type.startswith("text/"):
            data = file.file.read()
            if not data:
                raise HTTPException(status_code=400, detail="Uploaded text file is empty")
            try:
                return data.decode("utf-8", errors="ignore").strip()
            except Exception as exc:  # noqa: BLE001
                raise HTTPException(status_code=400, detail=f"Failed to read text file: {exc}") from exc

        # Treat everything else as PDF-like content
        if file.content_type not in {
            "application/pdf",
            "application/x-pdf",
            "application/octet-stream",
        }:
            raise HTTPException(
                status_code=400,
                detail="Unsupported file type. Please upload a PDF or plain text file.",
            )

        data = file.file.read()
        if not data:
            raise HTTPException(status_code=400, detail="Uploaded PDF is empty")
        return extract_text_from_pdf_bytes(data)

    if text and text.strip():
        return text.strip()

    raise HTTPException(status_code=400, detail="No text or PDF file provided")


def call_groq_json(prompt: str, user_content: str) -> dict:
    """Call Groq with a JSON-structured instruction and return parsed JSON.

    If parsing fails, this raises HTTPException.
    """

    completion = client.chat.completions.create(
        messages=[
            {
                "role": "system",
                "content": prompt,
            },
            {
                "role": "user",
                "content": user_content,
            },
        ],
        model="llama-3.3-70b-versatile",
        temperature=0.1,
    )

    content = completion.choices[0].message.content or ""

    import json
    import re

    try:
        return json.loads(content)
    except json.JSONDecodeError:
        # Try to extract the first JSON object from the text
        match = re.search(r"\{[\s\S]*\}", content)
        if not match:
            raise HTTPException(status_code=500, detail="Groq response is not valid JSON")
        try:
            return json.loads(match.group(0))
        except json.JSONDecodeError as exc:  # noqa: B904
            raise HTTPException(status_code=500, detail="Failed to parse JSON from Groq response") from exc


def call_groq_summary(user_content: str) -> str:
    completion = client.chat.completions.create(
        messages=[
            {
                "role": "system",
                "content": (
                    "You are a legal assistant. Provide a clear, plain-language summary of the "
                    "following legal document suitable for a non-lawyer. Limit to 4-6 short "
                    "paragraphs. Respond as plain text only."
                ),
            },
            {
                "role": "user",
                "content": user_content,
            },
        ],
        model="llama-3.3-70b-versatile",
        temperature=0.3,
    )

    return completion.choices[0].message.content or "Not Available"


@app.get("/api/health")
async def health() -> dict:
    return {"status": "ok"}


@app.post("/api/analyze")
async def analyze(
    file: UploadFile | None = File(default=None),
    text: str | None = Form(default=None),
) -> dict:
    """Analyze a legal document and return structured case facts, legal issues, and judgment."""

    document_text = ensure_text(file, text)

    system_prompt = (
        "You are a legal document analysis assistant. Analyze the following legal document and "
        "extract: (1) Case Facts, (2) Legal Issues, and (3) Judgment. Respond in strict JSON with "
        "keys caseFacts, legalIssues, judgment. Each must be an array of bullet-point strings. If "
        "any section is unclear, set its value to ['Not Available']. Do not include any other keys "
        "or explanatory text."
    )

    parsed = call_groq_json(system_prompt, document_text)

    case_facts = parsed.get("caseFacts") or ["Not Available"]
    legal_issues = parsed.get("legalIssues") or ["Not Available"]
    judgment = parsed.get("judgment") or ["Not Available"]

    # Normalize to lists of strings
    def to_list(value):
        if isinstance(value, list):
            return [str(v) for v in value] or ["Not Available"]
        if not value:
            return ["Not Available"]
        return [str(value)]

    return {
        "caseFacts": to_list(case_facts),
        "legalIssues": to_list(legal_issues),
        "judgment": to_list(judgment),
    }


@app.post("/api/summary")
async def summary(
    file: UploadFile | None = File(default=None),
    text: str | None = Form(default=None),
) -> dict:
    """Return a plain-language summary for the document."""

    document_text = ensure_text(file, text)
    result = call_groq_summary(document_text)
    return {"summary": result or "Not Available"}


if __name__ == "__main__":
    import uvicorn

    uvicorn.run("main:app", host="0.0.0.0", port=5000, reload=True)
