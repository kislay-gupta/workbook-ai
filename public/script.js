// DOM elements
const fileInput = document.getElementById("fileInput");
const textInput = document.getElementById("textInput");
const urlInput = document.getElementById("urlInput");
const uploadArea = document.getElementById("uploadArea");
const messages = document.getElementById("messages");
const chatInput = document.getElementById("chatInput");
const status = document.getElementById("status");
const loading = document.getElementById("loading");

// File upload handling
fileInput.addEventListener("change", handleFileUpload);

// Drag and drop functionality
uploadArea.addEventListener("dragover", (e) => {
  e.preventDefault();
  uploadArea.classList.add("dragover");
});

uploadArea.addEventListener("dragleave", () => {
  uploadArea.classList.remove("dragover");
});

uploadArea.addEventListener("drop", (e) => {
  e.preventDefault();
  uploadArea.classList.remove("dragover");
  const files = e.dataTransfer.files;
  if (files.length > 0) {
    fileInput.files = files;
    handleFileUpload();
  }
});

// Handle file upload
async function handleFileUpload() {
  const files = fileInput.files;
  if (files.length === 0) return;

  for (let file of files) {
    if (file.type !== "application/pdf") {
      showStatus("Only PDF files are supported", "error");
      continue;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      showStatus(`Uploading ${file.name}...`, "info");

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (response.ok) {
        showStatus(
          `✅ ${file.name} uploaded and indexed successfully! (${result.documentsCount} documents)`,
          "success"
        );
      } else {
        showStatus(`❌ Error uploading ${file.name}: ${result.error}`, "error");
      }
    } catch (error) {
      showStatus(`❌ Error uploading ${file.name}: ${error.message}`, "error");
    }
  }

  // Clear file input
  fileInput.value = "";
}

// Index text data
async function indexText() {
  const text = textInput.value.trim();
  if (!text) {
    showStatus("Please enter some text to index", "error");
    return;
  }

  try {
    showStatus("Indexing text...", "info");

    const response = await fetch("/api/index-text", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text }),
    });

    const result = await response.json();

    if (response.ok) {
      showStatus(
        `✅ Text indexed successfully! (${result.chunksCount} chunks)`,
        "success"
      );
      textInput.value = "";
    } else {
      showStatus(`❌ Error indexing text: ${result.error}`, "error");
    }
  } catch (error) {
    showStatus(`❌ Error indexing text: ${error.message}`, "error");
  }
}

async function indexWebsite() {
  const url = urlInput.value.trim();
  if (!url) {
    showStatus("Please enter a website URL to index", "error");
    return;
  }

  // Basic URL validation
  try {
    new URL(url);
  } catch {
    showStatus("Please enter a valid URL (e.g., https://example.com)", "error");
    return;
  }

  try {
    showStatus("Indexing website... This may take a moment.", "info");

    const response = await fetch("/api/index-website", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ url }),
    });

    const result = await response.json();

    if (response.ok) {
      showStatus(
        `✅ Website indexed successfully! (${result.chunksCount} chunks from ${result.url})`,
        "success"
      );
      urlInput.value = "";
    } else {
      showStatus(`❌ Error indexing website: ${result.error}`, "error");
    }
  } catch (error) {
    showStatus(`❌ Error indexing website: ${error.message}`, "error");
  }
}

// Send chat message
async function sendMessage() {
  const question = chatInput.value.trim();
  if (!question) return;

  // Add user message to chat
  addMessage(question, "user");
  chatInput.value = "";

  // Show loading
  loading.style.display = "block";

  try {
    const response = await fetch("/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ question }),
    });

    const result = await response.json();

    if (response.ok) {
      addMessage(result.answer, "bot");
      if (result.sources) {
        addMessage(
          `📚 Found information from ${result.sources} source(s)`,
          "bot",
          true
        );
      }
    } else {
      addMessage(`❌ Error: ${result.error}`, "bot");
    }
  } catch (error) {
    addMessage(`❌ Error: ${error.message}`, "bot");
  } finally {
    loading.style.display = "none";
  }
}

// Add message to chat
function addMessage(text, sender, isInfo = false) {
  const messageDiv = document.createElement("div");
  messageDiv.className = `message ${sender}-message`;

  if (isInfo) {
    messageDiv.style.fontSize = "0.9em";
    messageDiv.style.opacity = "0.8";
  }

  const senderLabel = sender === "user" ? "You" : "Assistant";
  messageDiv.innerHTML = `<strong>${senderLabel}:</strong> ${text}`;

  messages.appendChild(messageDiv);
  messages.scrollTop = messages.scrollHeight;
}

// Show status message
function showStatus(message, type) {
  status.innerHTML = `<div class="status ${type}">${message}</div>`;

  // Auto-hide success messages after 3 seconds
  if (type === "success") {
    setTimeout(() => {
      status.innerHTML = "";
    }, 3000);
  }
}

// Handle Enter key in chat input
function handleKeyPress(event) {
  if (event.key === "Enter") {
    sendMessage();
  }
}

// Check server status on load
async function checkStatus() {
  try {
    const response = await fetch("/api/status");
    const result = await response.json();

    if (response.ok) {
      showStatus(`🟢 ${result.status} - ${result.message}`, "success");
    }
  } catch (error) {
    showStatus("🔴 Server connection failed", "error");
  }
}

// Initialize
document.addEventListener("DOMContentLoaded", () => {
  checkStatus();
});
