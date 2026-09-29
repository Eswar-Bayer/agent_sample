const form = document.querySelector("#message-form");
const message = document.querySelector("#message");
const characterCount = document.querySelector("#character-count");
const submitButton = document.querySelector("#submit-button");
const result = document.querySelector("#result");
const responseText = document.querySelector("#response-text");

message.addEventListener("input", () => {
  characterCount.textContent = `${message.value.length} / 2000`;
});

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const value = message.value.trim();
  if (!value) return;

  submitButton.disabled = true;
  submitButton.textContent = "Sending...";
  result.hidden = true;
  result.classList.remove("error");

  try {
    const response = await fetch("/api/respond", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: value }),
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.detail?.[0]?.msg || "The request failed.");
    }

    responseText.textContent = data.response;
  } catch (error) {
    result.classList.add("error");
    responseText.textContent = error.message || "Unable to contact the server.";
  } finally {
    result.hidden = false;
    submitButton.disabled = false;
    submitButton.textContent = "Send message";
  }
});
