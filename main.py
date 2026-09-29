from pathlib import Path

from fastapi import FastAPI, Request
from fastapi.responses import HTMLResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from pydantic import BaseModel, Field


BASE_DIR = Path(__file__).resolve().parent

app = FastAPI(title="Simple Response UI")
app.mount("/static", StaticFiles(directory=BASE_DIR / "static"), name="static")
templates = Jinja2Templates(directory=BASE_DIR / "templates")


class MessageRequest(BaseModel):
    message: str = Field(min_length=1, max_length=2_000)


class MessageResponse(BaseModel):
    response: str


@app.get("/", response_class=HTMLResponse)
async def home(request: Request) -> HTMLResponse:
    return templates.TemplateResponse(request=request, name="index.html")


@app.post("/api/respond", response_model=MessageResponse)
async def respond(payload: MessageRequest) -> MessageResponse:
    """Return a response for the message submitted through the UI."""
    return MessageResponse(response=f"You entered: {payload.message.strip()}")

