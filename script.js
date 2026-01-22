document.addEventListener('DOMContentLoaded', () => {
    // Chatbot functionality
    const chatbotToggler = document.querySelector(".chatbot-toggler");
    const closeBtn = document.querySelector(".chatbot header span"); // Close button in header
    const chatbox = document.querySelector(".chatbox");
    const chatInput = document.querySelector(".chat-input textarea");
    const sendChatBtn = document.querySelector(".chat-input span");

    let userMessage = null; // Variable to store user's message

    const inputInitHeight = chatInput.scrollHeight;

    const createChatLi = (message, className) => {
        // Create a chat <li> element with passed message and className
        const chatLi = document.createElement("li");
        chatLi.classList.add("chat", className);
        let chatContent = className === "outgoing" ? `<p></p>` : `<span class="fas fa-robot"></span><p></p>`;
        chatLi.innerHTML = chatContent;
        chatLi.querySelector("p").textContent = message;
        return chatLi; // return chat <li> element
    }

    const generateResponse = (userMsg) => {
        const incomingChatLi = createChatLi("Thinking...", "incoming");
        chatbox.appendChild(incomingChatLi);
        chatbox.scrollTo(0, chatbox.scrollHeight);

        // Simulate AI response delay
        setTimeout(() => {
            const messageElement = incomingChatLi.querySelector("p");
            
            // Simple keyword-based response logic for the demo
            let response = "Thank you for reaching out. A member of our team will get back to you shortly.";
            const msg = userMsg.toLowerCase();

            if(msg.includes("price") || msg.includes("cost") || msg.includes("quote")) {
                response = "For a detailed quote, please call us at +971 55 642 8126 or click the WhatsApp button.";
            } else if(msg.includes("service") || msg.includes("cutting")) {
                response = "We offer Core Cutting, Concrete Cutting, Wall Sawing, and Demolition services. Which one are you interested in?";
            } else if(msg.includes("location") || msg.includes("where")) {
                response = "We are based in Sharjah but provide services all across the UAE.";
            } else if(msg.includes("hello") || msg.includes("hi")) {
                response = "Hello! How can I help you with your construction needs today?";
            }

            messageElement.textContent = response;
            chatbox.scrollTo(0, chatbox.scrollHeight);
        }, 1000);
    }

    const handleChat = () => {
        userMessage = chatInput.value.trim(); // Get user entered message and remove extra whitespace
        if(!userMessage) return;

        // Clear the input textarea and set its height to default
        chatInput.value = "";
        chatInput.style.height = `${inputInitHeight}px`;

        // Append the user's message to the chatbox
        chatbox.appendChild(createChatLi(userMessage, "outgoing"));
        chatbox.scrollTo(0, chatbox.scrollHeight);
        
        // Generate response
        setTimeout(() => {
            generateResponse(userMessage);
        }, 600);
    }

    // Toggle chatbot
    chatbotToggler.addEventListener("click", () => {
        document.body.classList.toggle("show-chatbot");
        // Toggle icon
        const icon1 = chatbotToggler.querySelector(".fas.fa-comment-dots");
        const icon2 = chatbotToggler.querySelector(".fas.fa-times");
        if (document.body.classList.contains("show-chatbot")) {
            icon1.style.display = "none";
            icon2.style.display = "block";
        } else {
            icon1.style.display = "block";
            icon2.style.display = "none";
        }
    });

    closeBtn.addEventListener("click", () => {
        document.body.classList.remove("show-chatbot");
        chatbotToggler.querySelector(".fas.fa-comment-dots").style.display = "block";
        chatbotToggler.querySelector(".fas.fa-times").style.display = "none";
    });

    chatInput.addEventListener("input", () => {
        // Adjust the height of the input textarea based on its content
        chatInput.style.height = `${inputInitHeight}px`;
        chatInput.style.height = `${chatInput.scrollHeight}px`;
    });

    chatInput.addEventListener("keydown", (e) => {
        // If Enter key is pressed without Shift key and the window width is > 800px, handle the chat
        if(e.key === "Enter" && !e.shiftKey && window.innerWidth > 800) {
            e.preventDefault();
            handleChat();
        }
    });

    sendChatBtn.addEventListener("click", handleChat);
});
