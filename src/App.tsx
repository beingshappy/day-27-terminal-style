import React, { useState, useRef, useEffect } from 'react';
import { Terminal } from 'lucide-react';

interface CommandOutput {
  command: string;
  output: string;
  timestamp: Date;
}

function App() {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<CommandOutput[]>([]);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Welcome message
    setHistory([{
      command: 'init',
      output: `Welcome to my portfolio terminal!
Type 'help' to see available commands.`,
      timestamp: new Date()
    }]);
  }, []);

  useEffect(() => {
    // Auto-focus input and scroll to bottom
    if (inputRef.current) {
      inputRef.current.focus();
    }
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [history]);

  const commands = {
    help: () => `Available commands:
  about     - Learn about me
  skills    - View my technical skills
  projects  - See my projects
  contact   - Get in touch
  clear     - Clear terminal
  help      - Show this help message`,

    about: () => `About Me
========
Hi! I'm a passionate full-stack developer with a love for creating
beautiful, functional web applications. I specialize in React,
TypeScript, and modern web technologies.

🎯 Focus: Building scalable, user-friendly applications
📍 Location: Your City, Your Country
🎓 Education: Computer Science / Self-taught
💼 Experience: X+ years in web development`,

    skills: () => `Technical Skills
===============
Frontend:
  • React, TypeScript, JavaScript (ES6+)
  • HTML5, CSS3, Tailwind CSS
  • Next.js, Vite, Webpack
  • State Management (Redux, Zustand)

Backend:
  • Node.js, Express.js
  • Python, Django/Flask
  • RESTful APIs, GraphQL
  • Database Design (PostgreSQL, MongoDB)

Tools & Others:
  • Git, GitHub, Docker
  • AWS, Vercel, Netlify
  • Jest, Testing Library
  • Agile/Scrum methodologies`,

    projects: () => `Projects
========
1. E-Commerce Platform
   Tech: React, Node.js, PostgreSQL
   Description: Full-stack e-commerce solution with payment integration
   Status: Live in production
   
2. Task Management App
   Tech: Next.js, TypeScript, Supabase
   Description: Collaborative project management tool
   Status: In development
   
3. Weather Dashboard
   Tech: React, OpenWeather API, Chart.js
   Description: Interactive weather visualization dashboard
   Status: Completed

Type 'contact' for links to live demos and source code!`,

    contact: () => `Contact Information
==================
📧 Email: your.email@example.com
💼 LinkedIn: linkedin.com/in/yourprofile
🐙 GitHub: github.com/yourusername
🌐 Portfolio: yourwebsite.com
📱 Phone: +1 (555) 123-4567

Feel free to reach out for opportunities, collaborations,
or just to say hello! I'm always open to interesting
conversations about technology and development.`,

    clear: () => 'CLEAR_TERMINAL'
  };

  const handleCommand = (cmd: string) => {
    const trimmedCmd = cmd.trim().toLowerCase();
    const output = commands[trimmedCmd as keyof typeof commands];
    
    if (output) {
      const result = output();
      if (result === 'CLEAR_TERMINAL') {
        setHistory([]);
        return;
      }
      
      setHistory(prev => [...prev, {
        command: cmd,
        output: result,
        timestamp: new Date()
      }]);
    } else {
      setHistory(prev => [...prev, {
        command: cmd,
        output: `Command not found: ${cmd}. Type 'help' for available commands.`,
        timestamp: new Date()
      }]);
    }
    
    setCommandHistory(prev => [...prev, cmd]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      handleCommand(input);
      setInput('');
      setHistoryIndex(-1);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandHistory.length > 0) {
        const newIndex = historyIndex === -1 ? commandHistory.length - 1 : Math.max(0, historyIndex - 1);
        setHistoryIndex(newIndex);
        setInput(commandHistory[newIndex]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex >= 0) {
        const newIndex = historyIndex + 1;
        if (newIndex >= commandHistory.length) {
          setHistoryIndex(-1);
          setInput('');
        } else {
          setHistoryIndex(newIndex);
          setInput(commandHistory[newIndex]);
        }
      }
    }
  };

  return (
    <div className="min-h-screen bg-black text-green-400 font-mono overflow-hidden">
      <div className="container mx-auto p-4 max-w-4xl">
        {/* Terminal Header */}
        <div className="flex items-center space-x-2 mb-4 border-b border-green-400/20 pb-2">
          <Terminal className="w-5 h-5" />
          <span className="text-green-300">Portfolio Terminal v1.0.0</span>
        </div>

        {/* Terminal Output */}
        <div 
          ref={terminalRef}
          className="h-[calc(100vh-8rem)] overflow-y-auto scrollbar-thin scrollbar-thumb-green-400 scrollbar-track-gray-900"
        >
          {history.map((entry, index) => (
            <div key={index} className="mb-4 animate-fadeIn">
              {entry.command !== 'init' && (
                <div className="flex items-center space-x-2 text-green-300">
                  <span className="text-green-500">➜</span>
                  <span className="text-green-300">portfolio</span>
                  <span className="text-green-400">~</span>
                  <span className="text-white">{entry.command}</span>
                </div>
              )}
              <div className="whitespace-pre-line text-green-400 ml-0 mt-1 leading-relaxed">
                {entry.output}
              </div>
            </div>
          ))}

          {/* Command Input */}
          <form onSubmit={handleSubmit} className="flex items-center space-x-2 mt-4">
            <span className="text-green-500">➜</span>
            <span className="text-green-300">portfolio</span>
            <span className="text-green-400">~</span>
            <div className="flex-1 relative">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                className="bg-transparent border-none outline-none text-white w-full font-mono"
                placeholder=""
                autoComplete="off"
              />
              <span className="absolute top-0 left-0 w-full h-full pointer-events-none">
                <span className="invisible">{input}</span>
                <span className="animate-blink text-green-400">█</span>
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;