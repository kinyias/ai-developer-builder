'use client';
import { createContext, useState } from 'react';
// Create context
export const MessageContext = createContext();

// Provider component
export const MessageProvider = ({ children }) => {
  const [messages, setMessages] = useState([]);

  return (
    <MessageContext.Provider value={{ messages, setMessages }}>
      {children}
    </MessageContext.Provider>
  );
};
