'use client';

import { useConversation } from '@11labs/react';
import { useCallback } from 'react';
import { Mic, MicOff, Activity, Volume2, Volume1 } from 'lucide-react';
import { motion } from "framer-motion";

export function Conversation() {
  const conversation = useConversation({
    onConnect: () => console.log('Connected'),
    onDisconnect: () => console.log('Disconnected'),
    onMessage: (message) => console.log('Message:', message),
    onError: (error) => console.error('Error:', error),
  });

  const getSignedUrl = async (): Promise<string> => {
    const response = await fetch("/api/get-signed-url");
    if (!response.ok) {
      throw new Error(`Failed to get signed url: ${response.statusText}`);
    }
    const { signedUrl } = await response.json();
    return signedUrl;
  };

  const startConversation = useCallback(async () => {
    try {
      await navigator.mediaDevices.getUserMedia({ audio: true });
      const signedUrl = await getSignedUrl();
      await conversation.startSession({
        signedUrl,
      });
    } catch (error) {
      console.error('Failed to start conversation:', error);
    }
  }, [conversation]);

  const stopConversation = useCallback(async () => {
    await conversation.endSession();
  }, [conversation]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[40vh] w-full">
      <div className="flex flex-col items-center gap-6 p-8 bg-white rounded-lg shadow-lg max-w-md w-full mx-auto">
        {conversation.status === 'connected' && (
          <div className="flex items-center gap-4">
            <motion.div
              className="w-2 h-2 rounded-full bg-blue-500"
              animate={{
                scale: [1, 1.5, 1],
                opacity: [1, 0.5, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            <div className="flex items-center gap-1 h-16">
              {[...Array(8)].map((_, i) => (
                <motion.div
                  key={i}
                  className="w-2 bg-blue-500 rounded-full"
                  animate={{
                    height: ["20%", "100%", "20%"],
                  }}
                  transition={{
                    duration: 0.8,
                    repeat: Infinity,
                    delay: i * 0.1,
                    ease: "easeInOut"
                  }}
                />
              ))}
            </div>
          </div>
        )}
        
        <div className="flex flex-col items-center gap-4 w-full">
          <div className="flex items-center gap-2 text-gray-600">
            <Activity className="w-5 h-5" />
            <span className="font-medium">
              Status: <span className="text-blue-600">{conversation.status}</span>
            </span>
          </div>
          
          <div className="flex items-center gap-2 text-gray-600">
            {conversation.isSpeaking ? (
              <>
                <Volume2 className="w-5 h-5 text-green-500" />
                <span className="font-medium">Agent is speaking</span>
              </>
            ) : (
              <>
                <Volume1 className="w-5 h-5 text-blue-500" />
                <span className="font-medium">Agent is listening</span>
              </>
            )}
          </div>
        </div>

        <div className="flex gap-4 w-full">
          <button
            onClick={startConversation}
            disabled={conversation.status === 'connected'}
            className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors duration-200"
          >
            <Mic className="w-5 h-5" />
            <span>Start Conversation</span>
          </button>
          <button
            onClick={stopConversation}
            disabled={conversation.status !== 'connected'}
            className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors duration-200"
          >
            <MicOff className="w-5 h-5" />
            <span>Stop Conversation</span>
          </button>
        </div>
      </div>
    </div>
  );
}
