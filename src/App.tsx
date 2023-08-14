import React from "react";
import Navigation from "./components/Navigation";
import { Route, Routes } from "react-router-dom";
import Todo from "./components/Todo";
import Home from "./views/Home";
import About from "./views/About";

const App: React.FC = () => {
  return (
    <div>
      <header>
        <Navigation />
      </header>
      <main className="content">
        <Routes>
          <Route path="/home" Component={Home} />
          <Route path="/organizer" Component={Todo} />
          <Route path="/about" Component={About} />
        </Routes>
      </main>
    </div>
  );
};

export default App;
