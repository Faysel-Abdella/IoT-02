// src/Components/Design/Chatbot.js
import React, { useState } from 'react';
import './chatbot.css';
import { OpenAI } from 'openai';

const Chatbot = () => {
  const [chatMessages, setChatMessages] = useState([
    { type: 'ai', content: 'Hi there! What kind of IoT product would you like to design today?' }
  ]);
  const [userInput, setUserInput] = useState("");
  const [isMinimized, setIsMinimized] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // System prompt: only branch to steps if user says "yes"
  const systemPrompt = {
    role: 'system',
    content: `
You are an enthusiastic IoT product-design guide. Keep replies under 100 words.

1. Greet: "Hi there! What kind of IoT product would you like to design today?"
2. After their reply, repeat it: "Awesome—you want to build a smart ."
3. Ask: "Do you already know exactly what you want to design, or would you like some guidance to get started?"
4. wait for the response
4. If the user answers no, stop and say: "Okay — no worries!", remind students you are there for supportinng.
5. If the user answers yes, present a simple numbered list of steps:
   1. Choose hardware (microcontroller, battery, etc.)
   2. Add sensors and actuators
   3. Select connectivity (Bluetooth, Wi-Fi, etc.)
   4. Decide on data storage (cloud vs local)
   5. Plan the end-user interface (what users will see and do)
   Then ask:
   "Will you integrate any third-party controllers or data processors?"
Use only plain text and numbered lists; do not use markdown asterisks or bold formatting.
`  };
  

  const openai = new OpenAI({
    baseURL: "https://openrouter.ai/api/v1",
    apiKey: "", // keep this safe!
    defaultHeaders: {
      "HTTP-Referer": window.location.origin,
      "X-Title": "AI Chatbot Interface",
    },
    dangerouslyAllowBrowser: true
  });

  const toggleMinimize = () => setIsMinimized(m => !m);

  const getAIResponse = async (userMessage) => {
    setIsLoading(true);
    try {
      const messages = [
        systemPrompt,
        ...chatMessages.map(m => ({
          role: m.type === 'user' ? 'user' : 'assistant',
          content: m.content
        })),
        { role: 'user', content: userMessage }
      ];

      const completion = await openai.chat.completions.create({
        model: "deepseek/deepseek-r1:free",
        messages
      });

      const aiResponse = completion.choices[0].message.content.trim();
      setChatMessages(prev => [...prev, { type: 'ai', content: aiResponse }]);
    } catch (err) {
      console.error(err);
      setChatMessages(prev => [
        ...prev,
        { type: 'ai', content: "Sorry, I encountered an error. Please try again." }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSend = () => {
    if (!userInput.trim()) return;
    setChatMessages(prev => [...prev, { type: 'user', content: userInput }]);
    getAIResponse(userInput);
    setUserInput("");
  };

  const handleKeyPress = e => {
    if (e.key === 'Enter') handleSend();
  };

  return (
    <div className={`chatbot-box ${isMinimized ? 'minimized' : ''}`}>
      <div className="chatbot-header" onClick={toggleMinimize}>
        <div className="header-content">
          <span>Chatbot</span>
          <svg 
            className={`collapse-icon ${isMinimized ? 'collapsed' : ''}`}
            xmlns="http://www.w3.org/2000/svg" 
            width="16" height="16" viewBox="0 0 16 16">
            <path d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"/>
          </svg>
        </div>
      </div>

      {!isMinimized && (
        <>
          <div className="chatbot-messages">
            {chatMessages.map((m,i) => (
              <div key={i} className={`chatbot-message ${m.type === 'user' ? 'user-message' : 'ai-message'}`}>
                {m.type === 'user' ? `You: ${m.content}` : `AI: ${m.content}`}
              </div>
            ))}
            {isLoading && <div className="loading-indicator">AI is thinking...</div>}
          </div>
          <div className="chatbot-footer">
            <input
              type="text"
              placeholder="Type your message..."
              value={userInput}
              onChange={e => setUserInput(e.target.value)}
              onKeyPress={handleKeyPress}
              disabled={isLoading}
            />
            <button onClick={handleSend} disabled={isLoading}>
              {isLoading ? '...' : 'Send'}
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Chatbot;
