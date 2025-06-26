const userInput = document.getElementById("userInput");
const chatContainer = document.getElementById("chatContainer");
const sendBtn = document.getElementById("sendBtn");
const collapseBtn = document.getElementById("collapseBtn");
const sidebar = document.getElementById("sidebar");

// Sidebar collapse toggle
collapseBtn.addEventListener("click", () => {
    sidebar.classList.toggle("collapsed");
    collapseBtn.classList.toggle("collapsed");

    const aboutText = document.getElementById("aboutText");
    if (sidebar.classList.contains("collapsed")) {
        aboutText.style.display = "none";
        collapseBtn.innerHTML = "&#9776;"; // Hamburger
    } else {
        aboutText.style.display = "block";
        collapseBtn.innerHTML = "&#10005;"; // Close
    }
});

// Auto-height input textarea
userInput.addEventListener("input", () => {
    userInput.style.height = "auto";
    userInput.style.height = userInput.scrollHeight + "px";
});

// Append message to chat
function appendMessage(content, sender) {
    const message = document.createElement("div");
    message.classList.add("message", sender);
    message.innerText = content;
    chatContainer.appendChild(message);
    chatContainer.scrollTop = chatContainer.scrollHeight;
}

// Main send message function
async function sendMessage() {
    const msg = userInput.value.trim();
    if (!msg) return;

    appendMessage(msg, "user");
    userInput.value = "";
    userInput.style.height = "auto";

    // ✅ Dummy bot reply immediately
    appendMessage("Bot is thinking... (Backend coming soon...)", "bot");

    // ✅ Try calling backend (optional - you can remove this while testing dummy only)
    try {
        const res = await fetch("http://localhost:5000/ask", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ question: msg })
        });

        const data = await res.json();
        // Replace dummy response with actual answer
        const botMsgs = document.querySelectorAll(".message.bot");
        const lastBotMsg = botMsgs[botMsgs.length - 1];
        if (lastBotMsg && lastBotMsg.innerText === "Bot is thinking... (Backend coming soon...)") {
            lastBotMsg.innerText = data.answer;
        } else {
            appendMessage(data.answer, "bot");
        }
    } catch (err) {
        appendMessage("❌ Error: Couldn't reach AI backend!", "bot");
        console.error(err);
    }
}

// Send button click
sendBtn.addEventListener("click", sendMessage);

// Enter key support
userInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        sendMessage();
    }
});
