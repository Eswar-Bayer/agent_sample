# FastAPI Response UI

A small FastAPI application that accepts a message in the browser and displays
the response returned by the backend.

## Run locally

```bash
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
uvicorn main:app --reload
```

Open [http://127.0.0.1:8000](http://127.0.0.1:8000).

The response logic is in `respond()` in `main.py`. Replace the current echo
response there when you are ready to call an AI model or another service.

## API request

```bash
curl -X POST http://127.0.0.1:8000/api/respond \
  -H "Content-Type: application/json" \
  -d '{"message":"Hello"}'
```