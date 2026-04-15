import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { sendMessage as apiSendMessage } from '../utils/chatApi';
import { saveChatHistory, loadChatHistory, clearChatHistory as storageClearChat } from '../utils/storage';

const ChatContext = createContext(null);

export function ChatProvider({ children }) {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Load chat history from localStorage on mount
  useEffect(() => {
    const saved = loadChatHistory();
    if (saved.length > 0) {
      setMessages(saved);
    }
  }, []);

  // Persist messages to localStorage whenever they change
  useEffect(() => {
    if (messages.length > 0) {
      saveChatHistory(messages);
    }
  }, [messages]);

  const sendMessage = useCallback(async (content, apiKey) => {
    setError(null);

    const userMessage = {
      role: 'user',
      content,
      timestamp: Date.now(),
    };

    setMessages((prev) => {
      const updated = [...prev, userMessage];
      // Build API messages (role + content only) for the request
      return updated;
    });

    setIsLoading(true);

    try {
      // We need the latest messages including the new user message for the API call.
      // Use a state-reading pattern to get the current value.
      let apiMessages;
      setMessages((prev) => {
        apiMessages = prev.map(({ role, content }) => ({ role, content }));
        return prev; // no change, just reading
      });

      // Small delay to ensure state setter above runs
      await new Promise((r) => setTimeout(r, 0));

      // If apiMessages wasn't captured (edge case), build from scratch
      if (!apiMessages) {
        apiMessages = [{ role: 'user', content }];
      }

      const responseText = await apiSendMessage(apiMessages, apiKey);

      const assistantMessage = {
        role: 'assistant',
        content: responseText,
        timestamp: Date.now(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (err) {
      setError(err.message || 'Failed to get a response. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const clearChat = useCallback(() => {
    setMessages([]);
    setError(null);
    storageClearChat();
  }, []);

  const loadHistory = useCallback(() => {
    const saved = loadChatHistory();
    setMessages(saved);
    setError(null);
  }, []);

  const value = React.useMemo(
    () => ({
      messages,
      isLoading,
      error,
      sendMessage,
      clearChat,
      loadHistory,
    }),
    [messages, isLoading, error, sendMessage, clearChat, loadHistory]
  );

  return (
    <ChatContext.Provider value={value}>
      {children}
    </ChatContext.Provider>
  );
}

export function useChatContext() {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error('useChatContext must be used within a ChatProvider');
  }
  return context;
}

export default ChatContext;
