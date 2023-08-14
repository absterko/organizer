import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

type Todo = {
  title: string;
  text: string;
  completed: boolean;
  deadline: Date | null;
};

type TodoList = {
  name: string;
  todos: Todo[];
};

const App: React.FC = () => {
  const [todoLists, setTodoLists] = useState<TodoList[]>([]);
  const [newListName, setNewListName] = useState<string>("");
  const [newTodoTitle, setNewTodoTitle] = useState<string>("");
  const [newTodoText, setNewTodoText] = useState<string>("");
  const [newTodoDeadline, setNewTodoDeadline] = useState<Date | null>(null);
  const [filter, setFilter] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const addTodoList = () => {
    setTodoLists([...todoLists, { name: newListName, todos: [] }]);
    setNewListName("");
  };

  const addTodo = (listName: string) => {
    setTodoLists(
      todoLists.map((list) =>
        list.name === listName
          ? {
              ...list,
              todos: [
                ...list.todos,
                {
                  title: newTodoTitle,
                  text: newTodoText,
                  completed: false,
                  deadline: newTodoDeadline,
                },
              ],
            }
          : list
      )
    );
    setNewTodoTitle("");
    setNewTodoText("");
    setNewTodoDeadline(null);
  };

  const setTodoPassive = (listName: string, todoText: string) => {
    setTodoLists(
      todoLists.map((list) =>
        list.name === listName
          ? {
              ...list,
              todos: list.todos.map((todo) =>
                todo.text === todoText ? { ...todo, completed: false } : todo
              ),
            }
          : list
      )
    );
  };

  const setTodoActive = (listName: string, todoText: string) => {
    setTodoLists(
      todoLists.map((list) =>
        list.name === listName
          ? {
              ...list,
              todos: list.todos.map((todo) =>
                todo.text === todoText ? { ...todo, completed: true } : todo
              ),
            }
          : list
      )
    );
  };

  const deleteTodo = (listName: string, todoText: string) => {
    setTodoLists(
      todoLists.map((list) =>
        list.name === listName
          ? {
              ...list,
              todos: list.todos.filter((todo) => todo.text !== todoText),
            }
          : list
      )
    );
  };

  const toggleTodo = (listName: string, todoText: string) => {
    setTodoLists(
      todoLists.map((list) =>
        list.name === listName
          ? {
              ...list,
              todos: list.todos.map((todo) =>
                todo.text === todoText
                  ? { ...todo, completed: !todo.completed }
                  : todo
              ),
            }
          : list
      )
    );
  };

  return (
    <div>
      <h1>Todo list 📝</h1>
      <input
        autoFocus
        placeholder="e.g. School..."
        maxLength={20}
        value={newListName}
        onChange={(e) => setNewListName(e.target.value)}
      />

      <button onClick={addTodoList}>Add Todo List</button>
      {todoLists.map((list) => (
        <div className="todoList" key={list.name}>
          <h1>{list.name}</h1>
          <h2>Title 📃</h2>
          <input
            maxLength={20}
            placeholder="e.g. Math..."
            value={newTodoText}
            onChange={(e) => setNewTodoText(e.target.value)}
          />
          <h2>Text 📑</h2>
          <textarea
            maxLength={80}
            cols={25}
            rows={20}
            className="taskText"
            placeholder="Write an email..."
            value={newTodoTitle}
            onChange={(e) => setNewTodoTitle(e.target.value)}
          />
          <h2>When it should be done? 🤔</h2>
          <DatePicker
            selected={newTodoDeadline}
            onChange={(date) => setNewTodoDeadline(date as Date)}
            showTimeSelect
            timeFormat="HH:mm"
            timeIntervals={15}
            dateFormat="MM/dd/yyyy HH:mm"
            calendarStartDay={1}
            placeholderText="Select the date/time."
          />
          <button className="addTodo" onClick={() => addTodo(list.name)}>
            Add Todo
          </button>

          <h2>Filter 🧮</h2>
          <select value={filter} onChange={(e) => setFilter(e.target.value)}>
            <option value="all">All</option>
            <option value="completed">Completed</option>
            <option value="pending">Pending</option>
          </select>
          <h2>Search 🔎</h2>
          <input
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {list.todos
            .filter((todo) => {
              if (
                searchTerm &&
                !(
                  todo.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                  todo.text.toLowerCase().includes(searchTerm.toLowerCase())
                )
              ) {
                return false;
              }
              return true;
            })
            .map((todo) => {
              return (
                <div className="todoModal" key={todo.text}>
                  <h3> {todo.text}</h3> <br /> {todo.title}{" "}
                  {todo.deadline
                    ? todo.deadline.toLocaleString()
                    : "No deadline"}
                  <br />
                  {todo.completed ? <h1>✅🥳</h1> : <h1>❌🙄</h1>}
                  <button onClick={() => setTodoActive(list.name, todo.text)}>
                    Done 😎
                  </button>
                  <button onClick={() => setTodoPassive(list.name, todo.text)}>
                    Not done yet 😏
                  </button>
                  <button onClick={() => deleteTodo(list.name, todo.text)}>
                    Delete 🗑️
                  </button>
                </div>
              );
            })}

          {list.todos
            .filter((todo) => {
              if (filter === "all") return true;
              if (filter === "completed") return todo.completed;
              if (filter === "pending") return !todo.completed;
              return true;
            })
            .map((todo) => (
              <div className="todoModal" key={todo.text}>
                <h3> {todo.text}</h3> <br /> {todo.title} <br />
                {todo.deadline ? todo.deadline.toLocaleString() : "No deadline"}
                <br />
                {todo.completed ? <h1>✅🥳</h1> : <h1>❌🙄</h1>}
                <button onClick={() => setTodoActive(list.name, todo.text)}>
                  Done 😎
                </button>
                <button onClick={() => setTodoPassive(list.name, todo.text)}>
                  Not done yet 😏
                </button>
                <button onClick={() => deleteTodo(list.name, todo.text)}>
                  Delete 🗑️
                </button>
              </div>
            ))}
        </div>
      ))}
    </div>
  );
};

export default App;
