import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import { v4 as uuidv4 } from "uuid";
import { useForm } from "react-hook-form";
import "react-datepicker/dist/react-datepicker.css";
import "./Todo.scss";

type TodoItem = {
  id: any;
  title: string;
  text: string;
  completed: boolean;
  deadline: Date | null;
};

type TodoList = {
  id: string;
  name: string;
  todos: TodoItem[];
};

const Todo: React.FC = () => {
  const { register, handleSubmit } = useForm();
  const [todoLists, setTodoLists] = useState<TodoList[]>([]);
  const [newListName, setNewListName] = useState("");
  const [newTodoTitle, setNewTodoTitle] = useState<string>("");
  const [newTodoText, setNewTodoText] = useState<string>("");
  const [newTodoDeadline, setNewTodoDeadline] = useState<Date | null>(null);
  const [filter, setFilter] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState<string>("");

  const addTodoList = () => {
    const newList = { name: newListName, todos: [] };

    fetch("https://64da2d5be947d30a260ae829.mockapi.io/api/v1/test", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newList),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to add todo list");
        }
        return response.json();
      })
      .then((data) => {
        setTodoLists((prevLists) => [...prevLists, { ...data, todos: [] }]);
        setNewListName(data.newListName);
      });
  };

  const addTodo = (listName: string) => {
    if (!newTodoTitle.trim() || !newTodoText.trim()) {
      return;
    }

    const newTodo: TodoItem = {
      id: uuidv4(),
      title: newTodoTitle,
      text: newTodoText,
      completed: false,
      deadline: newTodoDeadline,
    };

    const list = todoLists.find((list) => list.name === listName);

    if (!list) {
      throw new Error(`List ${listName} not found`);
    }

    const updatedList = {
      ...list,
      todos: [...list.todos, newTodo],
    };

    fetch(
      `https://64da2d5be947d30a260ae829.mockapi.io/api/v1/test/${list.id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedList),
      }
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to add todo");
        }
        return response.json();
      })
      .then((data) => {
        setTodoLists((prevLists) =>
          prevLists.map((list) => (list.id === data.id ? { ...data } : list))
        );
        setNewTodoTitle("");
        setNewTodoText("");
        setNewTodoDeadline(null);
      });
  };

  useEffect(() => {
    fetch("https://64da2d5be947d30a260ae829.mockapi.io/api/v1/test")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch todoList");
        }
        return response.json();
      })
      .then((data) => {
        const updatedTodoLists = data.map((list: TodoList) => ({
          ...list,
          todos: list.todos ? list.todos : [],
        }));
        setTodoLists(updatedTodoLists);
      })
      .catch((error) => {
        throw new Error("Update todo item failed:");
      });
  }, []);

  const setTodoPassive = (listName: string, todoText: string) => {
    const updatedTodoLists = todoLists.map((list) =>
      list.name === listName
        ? {
            ...list,
            todos: list.todos?.map((todo) =>
              todo.text === todoText
                ? { ...todo, completed: !todo.completed }
                : todo
            ),
          }
        : list
    );

    setTodoLists(updatedTodoLists);

    const list = updatedTodoLists.find((list) => list.name === listName);

    if (list) {
      fetch(
        `https://64da2d5be947d30a260ae829.mockapi.io/api/v1/test/${list.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(list),
        }
      ).then((response) => {
        if (!response.ok) {
          throw new Error("Failed to update todo");
        }
      });
    }
  };

  const setTodoActive = (listName: string, todoText: string) => {
    const updatedTodoLists = todoLists.map((list) =>
      list.name === listName
        ? {
            ...list,
            todos: list.todos?.map((todo) =>
              todo.text === todoText
                ? { ...todo, completed: !todo.completed }
                : todo
            ),
          }
        : list
    );

    setTodoLists(updatedTodoLists);

    const list = updatedTodoLists.find((list) => list.name === listName);

    if (list) {
      fetch(
        `https://64da2d5be947d30a260ae829.mockapi.io/api/v1/test/${list.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(list),
        }
      ).then((response) => {
        if (!response.ok) {
          throw new Error("Failed to update todo");
        }
      });
    }
  };

  const deleteTodo = (listName: string, todoId: string) => {
    const updatedTodoLists = todoLists.map((list) =>
      list.name === listName
        ? {
            ...list,
            todos: list?.todos?.filter((todo) => todo.id !== todoId) || [],
          }
        : list
    );

    setTodoLists(updatedTodoLists);

    const list = updatedTodoLists.find((list) => list.name === listName);

    if (list) {
      fetch(
        `https://64da2d5be947d30a260ae829.mockapi.io/api/v1/test/${list.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(list),
        }
      ).then((response) => {
        if (!response.ok) {
          throw new Error("Failed to delete todo");
        }
      });
    }
  };

  return (
    <div>
      <h1>todo list 📝</h1>
      <input
        autoFocus
        placeholder="e.g. School..."
        maxLength={20}
        {...register("newListName")}
      />
      <button onClick={handleSubmit(addTodoList)}>Add Todo List</button>

      {todoLists.map((list) => (
        <div className="todoList" key={list.name}>
          <h1>{list.name}</h1>

          <h2>title 📃</h2>
          <input
            maxLength={20}
            placeholder="e.g. Math..."
            value={newTodoText}
            onChange={(e) => setNewTodoText(e.target.value)}
          />
          <h2>text 📑</h2>
          <textarea
            maxLength={30}
            cols={25}
            rows={20}
            className="taskText"
            placeholder="Write an email..."
            value={newTodoTitle}
            onChange={(e) => setNewTodoTitle(e.target.value)}
          />
          <h2>when it should be done? 🤔</h2>
          <DatePicker
            selected={newTodoDeadline}
            onChange={(date) => setNewTodoDeadline(date as Date)}
            showTimeSelect
            timeFormat="HH:mm"
            timeIntervals={15}
            dateFormat="dd/MM/yyyy HH:mm"
            calendarStartDay={1}
            placeholderText="Select the date/time."
          />
          <button className="addTodo" onClick={() => addTodo(list.name)}>
            Add Todo
          </button>

          <h2>filter 🧮</h2>
          <select value={filter} onChange={(e) => setFilter(e.target.value)}>
            <option value="all">All</option>
            <option value="completed">Completed</option>
            <option value="pending">Pending</option>
          </select>

          <h2>search 🔎</h2>
          <input
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          {Array.isArray(list.todos) &&
            list.todos.length > 0 &&
            list.todos
              .filter((todo) => {
                if (
                  searchTerm &&
                  !(
                    todo.title
                      .toLowerCase()
                      .includes(searchTerm.toLowerCase()) ||
                    todo.text.toLowerCase().includes(searchTerm.toLowerCase())
                  )
                ) {
                  return false;
                }
                if (filter === "all") return true;
                if (filter === "completed") return todo.completed;
                if (filter === "pending") return !todo.completed;
                return true;
              })
              .map((todo) => (
                <div className="todoModal" key={todo.text}>
                  <h3>📃 {todo.text}</h3> <br /> <p>📑 {todo.title}</p> <br />
                  <p>
                    ⌚: {""}
                    {todo.deadline
                      ? new Date(todo.deadline).toLocaleString()
                      : "No deadline"}
                  </p>
                  <br />
                  {todo.completed ? <h1>✅🥳</h1> : <h1>❌🙄</h1>}
                  <button onClick={() => setTodoActive(list.name, todo.text)}>
                    Done 😎
                  </button>
                  <button onClick={() => setTodoPassive(list.name, todo.text)}>
                    Not done yet 😏
                  </button>
                  <button onClick={() => deleteTodo(list.name, todo.id)}>
                    Delete 🗑️
                  </button>
                </div>
              ))}
        </div>
      ))}
    </div>
  );
};

export default Todo;
