'use client';
import React, { useEffect, useState } from 'react';
import {
  SandpackProvider,
  SandpackLayout,
  SandpackCodeEditor,
  SandpackPreview,
  SandpackFileExplorer,
} from '@codesandbox/sandpack-react';
import axios from 'axios';
import { useMessage } from '@/hooks/use-message';
import Prompt from '@/data/Prompt';
import { Loader2Icon } from 'lucide-react';
export default function CodeView() {
  const [activeTab, setActiveTab] = useState('code');
  const [files, setFiles] = useState(Prompt.DEFAULT_FILE);
  const { messages, setMessages } = useMessage();
  const [loading, setLoading] = useState(false);
  const generateAiCode = async () => {
    setLoading(true);
    const PROMPT =
      messages[messages?.length - 1].message + ': ' + Prompt.CODE_GEN_PROMPT;
    const result = await axios.post('/api/gen-ai-code', {
      prompt: PROMPT,
    });
    const aiRes = JSON.parse(result.data);
    console.log(aiRes);

    const mergedFiles = { ...Prompt.DEFAULT_FILE, ...aiRes?.files };
    setFiles(mergedFiles);
    setLoading(false);
  };

  useEffect(() => {
    if (messages?.length > 0) {
      const role = messages[messages?.length - 1].role;
      if (role == 'user') {
        generateAiCode();
      }
    }
  }, [messages]);
  return (
    <div className="relative">
      <div className="bg-[#181818] w-full p-2 border">
        <div className="flex items-center flex-wrap shink-0 justify-center bg-black p-1 w-[140px] gap-3 rounded-full">
          <h2
            onClick={() => setActiveTab('code')}
            className={`text-sm cursor-pointer ${
              activeTab == 'code' &&
              'text-blue-500 bg-blue-500 bg-opacity-25 p-1 px-2 rounded-full'
            }`}
          >
            Code
          </h2>
          <h2
            onClick={() => setActiveTab('preview')}
            className={`text-sm cursor-pointer ${
              activeTab == 'preview' &&
              'text-blue-500 bg-blue-500 bg-opacity-25 p-1 px-2 rounded-full'
            }`}
          >
            Preview
          </h2>
        </div>
      </div>
      <SandpackProvider
        template="react"
        theme={'light'}
        files={files}
        customSetup={{
          dependencies: Prompt.DEPENDANCY,
        }}
        options={{
          externalResources: ['https://unpkg.com/@tailwindcss/browser@4'],
        }}
      >
        <SandpackLayout>
          {activeTab == 'code' ? (
            <>
              <SandpackFileExplorer style={{ height: '80vh' }} />
              <SandpackCodeEditor style={{ height: '80vh' }} />
            </>
          ) : (
            <>
              <SandpackPreview
                style={{ height: '80vh' }}
                showNavigator={true}
              />
            </>
          )}
        </SandpackLayout>
      </SandpackProvider>
      {loading && (
        <div
          className="p-10 bg-gray-900 bg-opacity-80
      absolute top-0 rounded-lg w-full h-full flex items-center justify-center"
        >
          <Loader2Icon className="animate-spin h-10 w-10 text-white" />
          <h2 className="text-white">Generating your file</h2>
        </div>
      )}
    </div>
  );
}
