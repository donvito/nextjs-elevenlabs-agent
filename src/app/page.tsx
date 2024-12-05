import { Conversation } from './components/conversation';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-white dark:bg-gray-900">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm">
        <h1 className="text-4xl font-bold mb-8 text-center bg-gradient-to-r from-blue-500 to-purple-600 text-transparent bg-clip-text animate-gradient dark:text-white">
          ElevenLabs Conversational AI
          <br/>NextJS v15 Template
        </h1>
        <Conversation />
        <div className="mt-8 text-center text-sm text-gray-500 dark:text-gray-400">
          <p>Made by{' '}
            <a href="https://x.com/donvito" className="text-blue-500 hover:underline" target="_blank" rel="noopener noreferrer">@donvito</a> |{' '}
            <a href="https://github.com/donvito" className="text-blue-500 hover:underline" target="_blank" rel="noopener noreferrer">GitHub</a> |{' '}
            <a href="https://donvitocodes.com" className="text-blue-500 hover:underline" target="_blank" rel="noopener noreferrer">donvitocodes.com</a>
          </p>
        </div>
      </div>
    </main>
  );
}
