// Groq API integration for chatbot and text-to-speech
// Note: In production, move API key to environment variables

// Chatbot functionality
class MarbleChatbot {
  constructor() {
    this.apiKey = "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";
    this.model = "openai/gpt-oss-20b";
    this.conversationHistory = [];
    this.isProcessing = false;
  }

  async sendMessage(userMessage) {
    if (this.isProcessing) return;
    
    this.isProcessing = true;
    
    try {
      // Add user message to history
      this.conversationHistory.push({
        role: "user",
        content: userMessage
      });

      // Prepare messages for API call
      const messages = [
        {
          role: "system",
          content: `You are a helpful marble and stone expert specializing in travertine marble from Balochistan, Pakistan. 
          You work for Loralai Stones and can answer questions about:
          - Travertine marble properties, characteristics, and benefits
          - Mining and extraction processes
          - Cutting, shaping, and customization options
          - Applications in interior and exterior design
          - Quality standards and sustainability practices
          - Logistics and export capabilities
          - Project examples and case studies
          
          Always be professional, knowledgeable, and helpful. If you don't know something specific about Loralai Stones, 
          provide general information about travertine marble and suggest contacting the company directly.`
        },
        ...this.conversationHistory.slice(-10) // Keep last 10 messages for context
      ];

      const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: this.model,
          messages: messages,
          max_tokens: 500,
          temperature: 0.7
        })
      });

      if (!response.ok) {
        throw new Error(`API request failed: ${response.status}`);
      }

      const data = await response.json();
      const assistantMessage = data.choices[0]?.message?.content || "I'm sorry, I couldn't process your request at the moment.";

      // Add assistant response to history
      this.conversationHistory.push({
        role: "assistant",
        content: assistantMessage
      });

      return assistantMessage;

    } catch (error) {
      console.error('Chatbot error:', error);
      return "I'm experiencing technical difficulties. Please try again later or contact us directly.";
    } finally {
      this.isProcessing = false;
    }
  }

  // Text-to-speech functionality
  async textToSpeech(text, voice = "Fritz-PlayAI") {
    try {
      const response = await fetch('https://api.groq.com/openai/v1/audio/speech', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: "playai-tts",
          voice: voice,
          input: text,
          response_format: "wav"
        })
      });

      if (!response.ok) {
        throw new Error(`TTS API request failed: ${response.status}`);
      }

      const audioBlob = await response.blob();
      const audioUrl = URL.createObjectURL(audioBlob);
      
      // Create and play audio
      const audio = new Audio(audioUrl);
      audio.play();
      
      // Clean up URL after playing
      audio.onended = () => URL.revokeObjectURL(audioUrl);
      
      return audioUrl;

    } catch (error) {
      console.error('Text-to-speech error:', error);
      return null;
    }
  }

  // Clear conversation history
  clearHistory() {
    this.conversationHistory = [];
  }
}

// Initialize chatbot when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  window.marbleChatbot = new MarbleChatbot();
  
  // Make all external links open in new tabs
  const externalLinks = document.querySelectorAll('a[href^="http"]');
  externalLinks.forEach(link => {
    if (!link.hasAttribute('target')) {
      link.setAttribute('target', '_blank');
      link.setAttribute('rel', 'noopener noreferrer');
    }
  });
});
