// Chatbot UI Component
class ChatbotUI {
  constructor() {
    this.isOpen = false;
    this.isMinimized = false;
    this.createChatbotElement();
    this.bindEvents();
  }

  createChatbotElement() {
    // Create chatbot container
    const chatbotContainer = document.createElement('div');
    chatbotContainer.id = 'chatbot-container';
    chatbotContainer.innerHTML = `
      <div id="chatbot-toggle" class="chatbot-toggle">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M20 2H4C2.9 2 2 2.9 2 4V22L6 18H20C21.1 18 22 17.1 22 16V4C22 2.9 21.1 2 20 2ZM20 16H6L4 18V4H20V16Z" fill="currentColor"/>
        </svg>
        <span>Ask about Marble</span>
      </div>
      
      <div id="chatbot-window" class="chatbot-window">
        <div class="chatbot-header">
          <div class="chatbot-title">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM13 17H11V15H13V17ZM13 13H11V7H13V13Z" fill="currentColor"/>
            </svg>
            Marble Expert Assistant
          </div>
          <div class="chatbot-controls">
            <button id="chatbot-minimize" class="chatbot-btn" title="Minimize">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M19 13H5V11H19V13Z" fill="currentColor"/>
              </svg>
            </button>
            <button id="chatbot-close" class="chatbot-btn" title="Close">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41Z" fill="currentColor"/>
              </svg>
            </button>
          </div>
        </div>
        
        <div class="chatbot-body">
          <div id="chatbot-messages" class="chatbot-messages">
            <div class="chatbot-message bot">
              <div class="message-content">
                <p>Hello! I'm your marble expert assistant. I can help you with questions about travertine marble, our mining processes, applications, and more. How can I assist you today?</p>
              </div>
            </div>
          </div>
          
          <div class="chatbot-input-container">
            <div class="chatbot-input-wrapper">
              <textarea 
                id="chatbot-input" 
                class="chatbot-input" 
                placeholder="Ask about travertine marble, mining, applications..."
                rows="1"
              ></textarea>
              <div class="chatbot-input-controls">
                <button id="chatbot-tts" class="chatbot-btn tts-btn" title="Text to Speech">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M3 9V11H7L12 16V4L7 9H3ZM16.5 12C16.5 10.23 15.48 8.71 14 7.97V10.05L16.05 12.1C16.07 12.07 16.09 12.04 16.1 12H16.5ZM19.07 4.93L17.66 6.34C19.11 7.78 20 9.79 20 12H22C22 9.28 20.87 6.74 19.07 4.93ZM14 17.97V20C15.48 19.27 16.5 17.75 16.5 16H14.05L14 17.97ZM17.66 17.66L19.07 19.07C20.87 17.27 22 14.72 22 12H20C20 14.21 19.11 16.22 17.66 17.66Z" fill="currentColor"/>
                  </svg>
                </button>
                <button id="chatbot-send" class="chatbot-btn send-btn" title="Send">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M2.01 21L23 12L2.01 3L2 10L17 12L2 14L2.01 21Z" fill="currentColor"/>
                  </svg>
                </button>
              </div>
            </div>
            <div class="chatbot-suggestions">
              <button class="suggestion-btn" data-query="What is travertine marble?">What is travertine marble?</button>
              <button class="suggestion-btn" data-query="Tell me about your mining process">Mining process</button>
              <button class="suggestion-btn" data-query="What are the applications of travertine?">Applications</button>
              <button class="suggestion-btn" data-query="How do you ensure quality?">Quality standards</button>
            </div>
          </div>
        </div>
      </div>
    `;

    // Add to body
    document.body.appendChild(chatbotContainer);
    
    // Store references
    this.container = chatbotContainer;
    this.toggle = document.getElementById('chatbot-toggle');
    this.window = document.getElementById('chatbot-window');
    this.messages = document.getElementById('chatbot-messages');
    this.input = document.getElementById('chatbot-input');
    this.sendBtn = document.getElementById('chatbot-send');
    this.ttsBtn = document.getElementById('chatbot-tts');
    this.minimizeBtn = document.getElementById('chatbot-minimize');
    this.closeBtn = document.getElementById('chatbot-close');
    this.suggestionBtns = document.querySelectorAll('.suggestion-btn');
  }

  bindEvents() {
    // Toggle chatbot
    this.toggle.addEventListener('click', () => this.toggleChatbot());
    
    // Send message
    this.sendBtn.addEventListener('click', () => this.sendMessage());
    this.input.addEventListener('keypress', (e) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        this.sendMessage();
      }
    });
    
    // Auto-resize textarea
    this.input.addEventListener('input', () => this.autoResize());
    
    // Text-to-speech
    this.ttsBtn.addEventListener('click', () => this.toggleTTS());
    
    // Controls
    this.minimizeBtn.addEventListener('click', () => this.minimize());
    this.closeBtn.addEventListener('click', () => this.close());
    
    // Suggestions
    this.suggestionBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        this.input.value = btn.dataset.query;
        this.sendMessage();
      });
    });
  }

  toggleChatbot() {
    this.isOpen = !this.isOpen;
    this.window.classList.toggle('open', this.isOpen);
    this.toggle.classList.toggle('active', this.isOpen);
    
    if (this.isOpen) {
      this.input.focus();
    }
  }

  async sendMessage() {
    const message = this.input.value.trim();
    if (!message) return;

    // Add user message
    this.addMessage(message, 'user');
    this.input.value = '';
    this.autoResize();

    // Show typing indicator
    const typingIndicator = this.addTypingIndicator();

    try {
      // Get response from chatbot
      const response = await window.marbleChatbot.sendMessage(message);
      
      // Remove typing indicator and add response
      typingIndicator.remove();
      this.addMessage(response, 'bot');
      
    } catch (error) {
      typingIndicator.remove();
      this.addMessage("I'm sorry, I encountered an error. Please try again.", 'bot');
    }
  }

  addMessage(content, sender) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `chatbot-message ${sender}`;
    
    messageDiv.innerHTML = `
      <div class="message-content">
        <p>${content}</p>
      </div>
    `;
    
    this.messages.appendChild(messageDiv);
    this.scrollToBottom();
  }

  addTypingIndicator() {
    const typingDiv = document.createElement('div');
    typingDiv.className = 'chatbot-message bot typing';
    typingDiv.innerHTML = `
      <div class="message-content">
        <div class="typing-indicator">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    `;
    
    this.messages.appendChild(typingDiv);
    this.scrollToBottom();
    return typingDiv;
  }

  scrollToBottom() {
    this.messages.scrollTop = this.messages.scrollHeight;
  }

  autoResize() {
    this.input.style.height = 'auto';
    this.input.style.height = Math.min(this.input.scrollHeight, 120) + 'px';
  }

  toggleTTS() {
    this.ttsBtn.classList.toggle('active');
    // TTS functionality can be added here
  }

  minimize() {
    this.isMinimized = !this.isMinimized;
    this.window.classList.toggle('minimized', this.isMinimized);
  }

  close() {
    this.isOpen = false;
    this.window.classList.remove('open');
    this.toggle.classList.remove('active');
  }
}

// Initialize chatbot UI when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  new ChatbotUI();
});
