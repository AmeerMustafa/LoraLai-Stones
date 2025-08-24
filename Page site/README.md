# Loralai Stones Website

A professional website for Loralai Stones, featuring premium white travertine marble from Balochistan, Pakistan. The website includes an AI-powered chatbot for instant customer support and information.

## Features

### 🌟 Core Website
- **Professional Design**: Modern, elegant design with premium aesthetics
- **Responsive Layout**: Mobile-friendly design that works on all devices
- **Image Gallery**: Showcase of travertine marble products and projects
- **Contact Forms**: Easy communication with the company
- **SEO Optimized**: Meta tags and structured content for search engines

### 🤖 AI-Powered Chatbot
- **24/7 Availability**: Instant responses to customer inquiries
- **Marble Expertise**: Specialized knowledge about travertine marble
- **Smart Suggestions**: Quick-access buttons for common questions
- **Text-to-Speech**: Audio playback capability for responses
- **Conversation History**: Maintains context for better interactions

### 🔗 Enhanced User Experience
- **External Links**: All external links open in new tabs
- **Smooth Animations**: Elegant reveal animations and transitions
- **Professional Typography**: Clean, readable font system
- **Accessibility**: Proper contrast and keyboard navigation

## Chatbot Capabilities

The AI assistant can answer questions about:

- **Travertine Marble Properties**: Characteristics, benefits, and unique features
- **Mining Processes**: Extraction methods and sustainability practices
- **Applications**: Interior, exterior, and artistic uses
- **Quality Standards**: How we ensure premium quality
- **Logistics**: Export capabilities and global delivery
- **Project Examples**: Real-world applications and case studies

## Technical Implementation

### Files Structure
```
Page site/
├── index.html          # Main website HTML
├── script.js           # Groq API integration and chatbot logic
├── chatbot.js          # Chatbot UI component
├── chatbot.css         # Chatbot styling
├── assets/             # Images and media files
└── README.md           # This documentation
```

### Technologies Used
- **Frontend**: HTML5, CSS3, Vanilla JavaScript
- **AI Integration**: Groq API (GPT-OSS-20B model)
- **Text-to-Speech**: Groq PlayAI TTS
- **Styling**: CSS custom properties and modern layouts

### API Integration
The chatbot uses the Groq API for:
- **Chat Completions**: Intelligent responses using GPT-OSS-20B
- **Text-to-Speech**: Audio generation for responses
- **Context Management**: Maintains conversation history

## Setup Instructions

### 1. Prerequisites
- Web server (local or hosted)
- Groq API key (already configured)

### 2. Installation
1. Upload all files to your web server
2. Ensure all JavaScript and CSS files are accessible
3. The chatbot will automatically initialize when the page loads

### 3. Configuration
- **API Key**: Currently hardcoded in `script.js` (move to environment variables in production)
- **Model**: Using `openai/gpt-oss-20b` for optimal performance
- **Voice**: Default TTS voice is `Fritz-PlayAI`

### 4. Customization
- **Styling**: Modify `chatbot.css` for visual changes
- **Behavior**: Edit `chatbot.js` for UI modifications
- **Logic**: Update `script.js` for chatbot functionality changes

## Usage

### For Visitors
1. **Access Chatbot**: Click the "Ask about Marble" button in the bottom-right corner
2. **Ask Questions**: Type your marble-related questions
3. **Quick Suggestions**: Use the suggestion buttons for common queries
4. **Audio Playback**: Click the speaker icon for text-to-speech

### For Developers
1. **Modify Responses**: Update the system prompt in `script.js`
2. **Add Features**: Extend the chatbot class with new capabilities
3. **Style Changes**: Customize the chatbot appearance in `chatbot.css`

## Security Considerations

### Production Deployment
- **API Key Security**: Move API key to environment variables
- **Rate Limiting**: Implement request throttling
- **Input Validation**: Sanitize user inputs
- **HTTPS**: Ensure secure connections

### Current Implementation
- API key is visible in client-side code (development only)
- Basic input sanitization implemented
- No rate limiting (add for production)

## Browser Support

- **Modern Browsers**: Chrome, Firefox, Safari, Edge (latest versions)
- **Mobile**: iOS Safari, Chrome Mobile, Samsung Internet
- **Features**: ES6+ JavaScript, CSS Grid, Flexbox

## Performance

- **Lightweight**: Minimal JavaScript footprint
- **Fast Loading**: Optimized CSS and efficient DOM manipulation
- **Responsive**: Smooth animations and interactions
- **Caching**: Browser-friendly resource loading

## Future Enhancements

### Planned Features
- **Multi-language Support**: International customer support
- **Voice Input**: Speech-to-text capabilities
- **File Uploads**: Image analysis for marble identification
- **Analytics**: Chatbot usage and performance metrics
- **Integration**: CRM and customer database connectivity

### Technical Improvements
- **Service Worker**: Offline functionality
- **Progressive Web App**: App-like experience
- **Advanced AI**: Fine-tuned models for specific use cases
- **Real-time Updates**: WebSocket connections for live chat

## Support

For technical support or questions about the website:
- **Email**: loralaistones@gmail.com
- **Phone**: +92 300-4349999
- **Instagram**: @loralaistones

## License

This website is proprietary to Loralai Stones. All rights reserved.

---

**Built with ❤️ for Loralai Stones - Premium White Travertine Marble from Balochistan, Pakistan**
