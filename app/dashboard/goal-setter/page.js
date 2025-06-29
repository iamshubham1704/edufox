'use client'
import React, { useState, useEffect } from 'react';
import './goalsetter.css';

export default function ParentVoiceAssistant() {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [priority, setPriority] = useState('medium');

  // Load saved tasks on mount
  useEffect(() => {
    const saved = localStorage.getItem('tasks');
    if (saved) setTasks(JSON.parse(saved));
  }, []);

  // Save tasks on change
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (input.trim() === '') return;
    const newTask = {
      text: input,
      due: dueDate,
      priority,
      done: false
    };
    setTasks([...tasks, newTask]);
    setInput('');
    setDueDate('');
    setPriority('medium');
  };

  const toggleDone = index => {
    const updated = [...tasks];
    updated[index].done = !updated[index].done;
    setTasks(updated);
  };

  const deleteTask = index => {
    const updated = tasks.filter((_, i) => i !== index);
    setTasks(updated);
  };

  const completed = tasks.filter(t => t.done).length;
  const total = tasks.length;
  const percentage = total ? (completed / total) * 100 : 0;

  return (
    <div className="goal-container">
      <h1>🎯 Goal Setter</h1>
      <p className="subtext">AI-powered goal tracker with progress</p>

      <div className="input-row">
        <input
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Enter your goal"
        />
        <input
          type="date"
          value={dueDate}
          onChange={e => setDueDate(e.target.value)}
        />
        <select value={priority} onChange={e => setPriority(e.target.value)}>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
        <button onClick={addTask}>Add</button>
      </div>

      <ul className="task-list">
        {tasks.map((task, index) => (
          <li key={index} className={task.done ? 'done' : ''}>
            <span
              className={`task ${task.priority}`}
              onClick={() => toggleDone(index)}
            >
              {task.text}
              {task.due && <em> - due {task.due}</em>}
            </span>
            <button className="delete-btn" onClick={() => deleteTask(index)}>
              X
            </button>
          </li>
        ))}
      </ul>

      <div className="summary">
        🧾 Total: {total} | ✅ Completed: {completed} | ⏳ Remaining:{' '}
        {total - completed}
      </div>

      <div className="progress-container">
        <div className="progress-bar" style={{ width: `${percentage}%` }}></div>
      </div>
    </div>
  );
}
