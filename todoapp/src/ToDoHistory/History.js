import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './History.css'; // Apply your previously themed styles here

const API_BASE = "http://localhost:4000"; // Your API base URL

function History() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const response = await axios.get(API_BASE + "/todos", {
        headers: {
          Authorization: localStorage.getItem('token'),
        },
      });

      setTodos(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  // Group todos by date
  const groupedTodos = todos.reduce((groups, todo) => {
    const date = new Date(todo.createdAt).toLocaleDateString();
    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(todo);
    return groups;
  }, {});

  // Count of incomplete todos
  const incompleteCount = todos.filter(todo => !todo.complete).length;
  const totalCount = todos.length;
  const completedCount = totalCount-incompleteCount;
  const completionCount = (completedCount / totalCount) * 100;
const dashLength = (completionCount / 100) * (Math.PI * 100); // Length of the dash
const gapLength = Math.PI * 100 - dashLength; // Length of the gap

  return (
    <div className="history-container">
        
      <div className="incomplete-count">
        Incomplete Todos: {incompleteCount}
      </div>
     
      {Object.keys(groupedTodos).map(date => (
        <div className="date-container" key={date}>
          <h2>{date}</h2>

          <div className="completion-circle">
        <svg width="120" height="120">
        <circle
          cx="60"
          cy="60"
          r="50"
          fill="none"
          stroke="var(--secondary)"
          strokeWidth="8"
          strokeDasharray={`${dashLength} ${gapLength}`}
          transform="rotate(-90 60 60)" // Rotate the circle to start from the top
        />
        </svg>
        <div className="completion-label">
          {completionCount.toFixed(1)}% Completed
        </div>
      </div>



          <div className="todos_history">
            {groupedTodos[date].map(todo => (
              <div
                className={`todo_history ${todo.complete ? '' : 'incomplete'}`}
                key={todo._id}
              >
                 <div className="priority-circle_history"></div>
                <div className="text_history">{todo.text}</div>
               
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default History;
