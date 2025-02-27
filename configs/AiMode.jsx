const {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} = require('@google/generative-ai');

const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: 'gemini-2.0-flash-exp',
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
  responseMimeType: 'text/plain',
};
const codeGenerationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
  responseMimeType: 'application/json',
};

//   async function run() {
export const chatSession = model.startChat({
  generationConfig,
  history: [],
});

export const genAiCode = model.startChat({
  generationConfig: codeGenerationConfig,
  history: [
    {
      role: "user",
      parts: [
        {text: "Generate to do app: Generate a Project in React. Create multiple components, organizing them in separate folders with filenames using the .js extension, if needed. The output should use Tailwind CSS for styling, \nwithout any third-party dependencies or libraries, except for icons from the lucide-react library, which should only be used when necessary. Available icons include: Heart, Shield, Clock, Users, Play, Home, Search, Menu, User, Settings, Mail, Bell, Calendar, Star, Upload, Download, Trash, Edit, Plus, Minus, Check, X, and ArrowRight. For example, you can import an icon as import { Heart } from \"lucide-react\" and use it in JSX as <Heart className=\"\" />.\nalso you can use date-fns for date format and react-chartjs-2 chart, graph library\n\nReturn the response in JSON format with the following schema:\n{\n  \"projectTitle\": \"\",\n  \"explanation\": \"\",\n  \"files\": {\n    \"/App.js\": {\n      \"code\": \"\"\n    },\n    ...\n  },\n  \"generatedFiles\": []\n}\n\nHere’s the reformatted and improved version of your prompt:\n\nGenerate a programming code structure for a React project using Vite. Create multiple components, organizing them in separate folders with filenames using the .js extension, if needed. The output should use Tailwind CSS for styling, without any third-party dependencies or libraries, except for icons from the lucide-react library, which should only be used when necessary. Available icons include: Heart, Shield, Clock, Users, Play, Home, Search, Menu, User, Settings, Mail, Bell, Calendar, Star, Upload, Download, Trash, Edit, Plus, Minus, Check, X, and ArrowRight. For example, you can import an icon as import { Heart } from \"lucide-react\" and use it in JSX as <Heart className=\"\" />.\n\nReturn the response in JSON format with the following schema:\n\njson\nCopy code\n{\n  \"projectTitle\": \"\",\n  \"explanation\": \"\",\n  \"files\": {\n    \"/App.js\": {\n      \"code\": \"\"\n    },\n    ...\n  },\n  \"generatedFiles\": []\n}\nEnsure the files field contains all created files, and the generatedFiles field lists all the filenames. Each file's code should be included in the code field, following this example:\nfiles:{\n  \"/App.js\": {\n    \"code\": \"import React from 'react';\\nimport './styles.css';\\nexport default function App() {\\n  return (\\n    <div className='p-4 bg-gray-100 text-center'>\\n      <h1 className='text-2xl font-bold text-blue-500'>Hello, Tailwind CSS with Sandpack!</h1>\\n      <p className='mt-2 text-gray-700'>This is a live code editor.</p>\\n    </div>\\n  );\\n}\"\n  }\n}\n  Not use \n  files:{\n  \"src/App.js\": {\n    \"code\": \"import React from 'react';\\nimport './styles.css';\\nexport default function App() {\\n  return (\\n    <div className='p-4 bg-gray-100 text-center'>\\n      <h1 className='text-2xl font-bold text-blue-500'>Hello, Tailwind CSS with Sandpack!</h1>\\n      <p className='mt-2 text-gray-700'>This is a live code editor.</p>\\n    </div>\\n  );\\n}\"\n  }\n}\n  Additionally, include an explanation of the project's structure, purpose, and functionality in the explanation field. Make the response concise and clear in one paragraph.\n  - When asked then only use this package to import, here are some packages available to import and use (date-fns,react-chartjs-2,\"firebase\",\"@google/generative-ai\" ) only when it required\n  \n  - For placeholder images, please use a https://archive.org/download/placeholder-image/placeholder-image.jpg\n  -Add Emoji icons whenever needed to give good user experinence\n  - all designs I ask you to make, have them be beautiful, not cookie cutter. Make webpages that are fully featured and worthy for production."},
      ],
    },
    {
      role: "model",
      parts: [
        {text: "```json\n{\n  \"projectTitle\": \"React To-Do App\",\n  \"explanation\": \"This React To-Do App allows users to manage their tasks efficiently. It features a clean, user-friendly interface built with Tailwind CSS. Users can add, edit, delete, and mark tasks as completed. The app is structured into components for task listing, task input, and individual task display, promoting code reusability and maintainability. No external UI libraries are used other than lucide-react for icons, ensuring a lightweight and fast application.\",\n  \"files\": {\n    \"/App.js\": {\n      \"code\": \"import React, { useState, useEffect } from 'react';\\nimport TaskList from './components/TaskList';\\nimport TaskForm from './components/TaskForm';\\nimport Header from './components/Header';\\nimport { Plus } from 'lucide-react';\\nimport { format } from 'date-fns';\\n\\nfunction App() {\\n  const [tasks, setTasks] = useState(() => {\\n    const storedTasks = localStorage.getItem('tasks');\\n    return storedTasks ? JSON.parse(storedTasks) : [];\\n  });\\n\\n  useEffect(() => {\\n    localStorage.setItem('tasks', JSON.stringify(tasks));\\n  }, [tasks]);\\n\\n  const addTask = (text) => {\\n    if (text.trim() !== '') {\\n      setTasks([...tasks, { id: Date.now(), text, completed: false, createdAt: new Date() }]);\\n    }\\n  };\\n\\n  const toggleComplete = (id) => {\\n    setTasks(tasks.map(task => task.id === id ? { ...task, completed: !task.completed } : task));\\n  };\\n\\n  const deleteTask = (id) => {\\n    setTasks(tasks.filter(task => task.id !== id));\\n  };\\n\\n  const editTask = (id, newText) => {\\n    setTasks(tasks.map(task => task.id === id ? { ...task, text: newText } : task));\\n  };\\n\\n  return (\\n    <div className=\\\"bg-gradient-to-br from-blue-100 to-purple-200 min-h-screen py-10\\\">\\n      <div className=\\\"container mx-auto p-6 bg-white shadow-lg rounded-lg max-w-2xl\\\">\\n        <Header />\\n        <TaskForm addTask={addTask} />\\n        <TaskList\\n          tasks={tasks}\\n          toggleComplete={toggleComplete}\\n          deleteTask={deleteTask}\\n          editTask={editTask}\\n        />\\n        <p className=\\\"text-gray-500 text-sm mt-4\\\">🗓️ Today is {format(new Date(), 'EEEE, MMMM do yyyy')}</p>\\n      </div>\\n    </div>\\n  );\\n}\\n\\nexport default App;\",\n      \"dependencies\": []\n    },\n    \"/components/Task.js\": {\n      \"code\": \"import React, { useState } from 'react';\\nimport { Trash, Edit, Check, X } from 'lucide-react';\\n\\nfunction Task({ task, toggleComplete, deleteTask, editTask }) {\\n  const [isEditing, setIsEditing] = useState(false);\\n  const [editText, setEditText] = useState(task.text);\\n\\n  const handleEdit = () => {\\n    editTask(task.id, editText);\\n    setIsEditing(false);\\n  };\\n\\n  return (\\n    <li className=\\\"flex justify-between items-center py-2 border-b border-gray-200 last:border-b-0\\\">\\n      {isEditing ? (\\n        <input\\n          type=\\\"text\\\"\\n          value={editText}\\n          onChange={(e) => setEditText(e.target.value)}\\n          className=\\\"flex-grow p-2 border rounded focus:outline-none focus:ring focus:border-blue-300\\\"\\n          onBlur={handleEdit}\\n          onKeyDown={(e) => {\\n            if (e.key === 'Enter') {\\n              handleEdit();\\n            }\\n          }}\\n        />\\n      ) : (\\n        <span\\n          className={`flex-grow cursor-pointer ${task.completed ? 'line-through text-gray-500' : 'text-gray-700'}`}\\n          onClick={() => toggleComplete(task.id)}\\n        >\\n          {task.text}\\n        </span>\\n      )}\\n\\n      <div>\\n        {isEditing ? (\\n          <button onClick={handleEdit} className=\\\"px-3 py-1 bg-green-500 text-white rounded hover:bg-green-700 focus:outline-none focus:ring focus:border-green-300\\\">\\n            <Check size={16} />\\n          </button>\\n        ) : (\\n          <button onClick={() => setIsEditing(true)} className=\\\"px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-700 focus:outline-none focus:ring focus:border-blue-300 mr-2\\\">\\n            <Edit size={16} />\\n          </button>\\n        )}\\n        <button onClick={() => deleteTask(task.id)} className=\\\"px-3 py-1 bg-red-500 text-white rounded hover:bg-red-700 focus:outline-none focus:ring focus:border-red-300\\\">\\n          <Trash size={16} />\\n        </button>\\n      </div>\\n    </li>\\n  );\\n}\\n\\nexport default Task;\",\n      \"dependencies\": []\n    },\n    \"/components/TaskList.js\": {\n      \"code\": \"import React from 'react';\\nimport Task from './Task';\\n\\nfunction TaskList({ tasks, toggleComplete, deleteTask, editTask }) {\\n  return (\\n    <ul>\\n      {tasks.map(task => (\\n        <Task\\n          key={task.id}\\n          task={task}\\n          toggleComplete={toggleComplete}\\n          deleteTask={deleteTask}\\n          editTask={editTask}\\n        />\\n      ))}\\n    </ul>\\n  );\\n}\\n\\nexport default TaskList;\",\n      \"dependencies\": [\n        \"./Task\"\n      ]\n    },\n    \"/components/TaskForm.js\": {\n      \"code\": \"import React, { useState } from 'react';\\nimport { Plus } from 'lucide-react';\\n\\nfunction TaskForm({ addTask }) {\\n  const [text, setText] = useState('');\\n\\n  const handleSubmit = (e) => {\\n    e.preventDefault();\\n    addTask(text);\\n    setText('');\\n  };\\n\\n  return (\\n    <form onSubmit={handleSubmit} className=\\\"flex items-center mb-4\\\">\\n      <input\\n        type=\\\"text\\\"\\n        placeholder=\\\"Add a task... 🚀\\\"\\n        value={text}\\n        onChange={(e) => setText(e.target.value)}\\n        className=\\\"flex-grow p-2 border rounded focus:outline-none focus:ring focus:border-blue-300\\\"\\n      />\\n      <button type=\\\"submit\\\" className=\\\"ml-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 focus:outline-none focus:ring focus:border-blue-300\\\">\\n        <Plus size={16} className=\\\"inline-block mr-1\\\" />Add\\n      </button>\\n    </form>\\n  );\\n}\\n\\nexport default TaskForm;\",\n      \"dependencies\": []\n    },\n    \"/components/Header.js\": {\n      \"code\": \"import React from 'react';\\n\\nfunction Header() {\\n  return (\\n    <header className=\\\"mb-6\\\">\\n      <h1 className=\\\"text-3xl font-bold text-gray-800 text-center\\\">My To-Do List ✅</h1>\\n      <p className=\\\"text-gray-600 text-center\\\">Stay organized and get things done! 🌟</p>\\n    </header>\\n  );\\n}\\n\\nexport default Header;\",\n      \"dependencies\": []\n    }\n  },\n  \"generatedFiles\": [\n    \"/App.js\",\n    \"/components/Task.js\",\n    \"/components/TaskList.js\",\n    \"/components/TaskForm.js\",\n    \"/components/Header.js\"\n  ]\n}\n```"},
      ],
    },
  ],
});

// const result = await chatSession.sendMessage("INSERT_INPUT_HERE");
// console.log(result.response.text());
//   }

//   run();
