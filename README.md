LEXASSIST AI
An AI agent for legal practitioners to simplify documentation and paralegal work.

## Project Structure

- `client/` – React + Vite frontend
- `server/` – Node.js/Express (or similar) backend
- `pyserver/` – Python FastAPI service
- `myenv/` – Python virtual environment (not checked in; can be recreated)

## Prerequisites

- Node.js (LTS recommended)
- npm or yarn
- Python 3.10+ (matching your local environment)

## Setup

### 1. Install frontend dependencies

```bash
cd client
npm install
```

### 2. Install Node backend dependencies

```bash
cd server
npm install
```

### 3. Install Python dependencies

Activate your virtual environment (Windows PowerShell example):

```bash
cd pyserver
..
myenv\Scripts\Activate.ps1
```

Then install requirements:

```bash
cd pyserver
pip install -r requirements.txt
```

## Running the App

### Frontend (Vite dev server)

```bash
cd client
npm run dev
```

### Node backend

```bash
cd server
npm start
```

(or the script defined in `server/package.json`, e.g. `npm run dev`.)

### Python FastAPI server

From the `pyserver` directory with the virtual environment activated:

```bash
uvicorn main:app --reload
```

This starts the FastAPI app defined in `main.py`.

## Environment Variables

Create `.env` files as needed (not committed) for:

- API keys
- Database URLs
- External service credentials

