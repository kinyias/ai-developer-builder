'use client';
import { useMessage } from '@/hooks/use-message';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Button } from '../ui/button';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import axios from 'axios';
import Prompt from '@/data/Prompt';
import ReactMarkdown from 'react-markdown';
export default function ChatView() {
  const { id } = useParams();
  const [userInput, setUserInput] = useState('');
  const { messages, setMessages } = useMessage();
  useEffect(() => {
    id && getChatData();
  }, [id]);
  const getChatData = () => {
    const chatData = localStorage.getItem('chat');
    if (chatData !== null) {
      const result = JSON.parse(chatData);
      setMessages([
        {
          role: result.role,
          message: result.message,
        },
      ]);
    }
  };

  useEffect(() => {
    if (messages?.length > 0) {
      const role = messages[messages?.length - 1].role;
      if (role == 'user') {
        getAIResponse();
      }
    }
  }, [messages]);

  const getAIResponse = async () => {
    const PROMPT = JSON.stringify(messages) + ': ' + Prompt.CHAT_PROMPT;
    const result = await axios.post('/api/ai-chat', {
      prompt: PROMPT,
    });
    setMessages((prev) => [
      ...prev,
      {
        role: 'ai',
        message: result.data.result,
      },
    ]);
  };
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      setMessages((prev) => [
        ...prev,
        {
          role: 'user',
          message: userInput,
        },
      ]);
      setUserInput('');
    }
  };
  return (
    <div className="relative h-[85vh] flex flex-col">
      <div className="flex-1 overflow-y-scroll scrollbar-hide">
        {messages?.map((msg, index) => (
          <div
            key={index}
            className="flex items-center gap-3 p-3 rounded-lg mb-2 leading-7 bg-gray-800 dark:bg-secondary text-white"
          >
            {msg?.role == 'user' && (
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            )}
            <div className="flex flex-col">
              <ReactMarkdown>{msg.message}</ReactMarkdown>
            </div>
          </div>
        ))}
      </div>
      <div className="w-full my-8 relative overflow-hidden">
        <form className="relative">
          <div className="p-5 border rounded-xl w-full">
            <div className="flex gap-2">
              <textarea
                className="outline-none bg-transparent w-full h-32 max-h-56 resize-none mr-8"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="How can I help you today?"
              ></textarea>
            </div>
          </div>

          <div
            className={cn(
              'absolute top-3 right-3 transition-all duration-300',
              userInput
                ? 'opacity-100 translate-x-0'
                : 'opacity-0 translate-x-4'
            )}
          >
            <Button
              type="submit"
              size="icon"
              className="bg-primary text-primary-foreground hover:bg-primary/90"
            >
              <ArrowRight className="h-5 w-5" />
            </Button>
          </div>
          <div
            className={cn(
              'absolute top-6 right-5 transition-all duration-300',
              userInput
                ? 'opacity-0 translate-x-4'
                : 'opacity-100 translate-x-0'
            )}
          >
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          </div>
        </form>
      </div>
    </div>
  );
}
