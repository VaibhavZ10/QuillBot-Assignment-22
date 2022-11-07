import React from "react";
import CreateTodo from "../../components/Todos/CreateTodo";
import getTodos from "../../utils/todos/getTodos";
import deleteTodo from "../../utils/todos/deleteTodo";
import completeTodo from "../../utils/todos/completeTodo";
import Image from "next/image";
import Logo from "../../public/assets/Logo.png";
import search from "../../public/assets/search.png";
import styles from "../../styles/todo.module.scss";
import "typeface-roboto";
import Ellipse from "../../public/assets/Ellipse 1.png";
import check from "../../public/assets/check.png";
import Vector from "../../public/assets/Vector.png";
import star from "../../public/assets/Vector-1.png";
import deleteIn from "../../public/assets/delete-1.png";
import del from "../../public/assets/delete.png";
import dupIn from "../../public/assets/duplicate.png";
import dup from "../../public/assets/dupGreen.png";

export default function Todos() {
  const [todos, setTodos] = React.useState([]);
  const [atHover, setatHover] = React.useState([]);
  const [showOptions, setshowOptions] = React.useState("");

  const handleDuplicateTask = async (title, createdAt) => {
    const response = await fetch("/api/todos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        createdAt,
      }),
    });
    const todo = await response.json();
    getTodos().then((todos) => setTodos(todos));
  };

  React.useEffect(() => {
    getTodos().then((todos) => setTodos(todos));
  }, []);

  const handleDelete = async (id) => {
    await deleteTodo(id);
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const handleComplete = async (id) => {
    const todo = todos.find((todo) => todo.id === id);
    const response = await completeTodo(id, todo.completed);
    const updatedTodo = await response.json();
    setTodos(todos.map((todo) => (todo.id === id ? updatedTodo : todo)));
  };

  const isOverdue = (createdAt) => {
    const newDate = new Date(createdAt);
    const newTime = newDate.getTime();
    console.log(newTime - Date.now());
    if (newTime < Date.now()) {
      console.log(true);
      return true;
    }
    return false;
  };

  return (
    <div className={styles.contentContainer}>
      <div className={styles.todoWrapper}>
        <div className={styles.titleContainer}>
          <Image className={styles.logo} src={Logo} alt="logo" />
          <h1>Todo List</h1>
        </div>
        {/* Search bar */}
        <div className={styles.activityContainer}>
          <div>
            <input
              id="todo-search-bar"
              className={styles.searchBar}
              type="text"
              placeholder="Search by"
            />
          </div>

          {/* Sorting dropdown */}
          <div>
            <select id="todo-sort-dropdown" className={styles.sort}>
              <option
                className={styles.headSelect}
                disabled
                selected
                hidden
                value=""
              >
                Sort By
              </option>
              <option disabled={true} value="">
                --Please choose an option--
              </option>
              <option value="title">Title(⬆)</option>
              <option value="-title">Title(⬇)</option>
              <option value="date">Due Date(⬆)</option>
              <option value="-date">Due Date(⬇)</option>
              <option value="-createdAt">Created Date (⬇)</option>
            </select>
          </div>

          <h5 className={styles.activity}>
            <a href="#">Activity Log</a>
          </h5>
        </div>
        <div>
          {todos.map((todo) => (
            <div
              key={todo.id}
              style={{
                textDecoration: todo.completed ? "line-through" : "none",
              }}
            >
              <div
                className={
                  isOverdue(todo.createdAt)
                    ? ` ${styles.btnWrapper} ${styles.overdueHighlight}`
                    : ` ${styles.btnWrapper}`
                }
              >
                <div className={styles.todobtnContainer}>
                  <button
                    className={styles.btnColor}
                    onMouseEnter={() => setatHover(`check` + `${todo.id}`)}
                    onMouseLeave={() => setatHover("")}
                    onClick={() => handleComplete(todo.id)}
                  >
                    <Image
                      src={
                        atHover === `check` + `${todo.id}` || todo.completed
                          ? check
                          : Ellipse
                      }
                      alt="Ellipse"
                    />
                  </button>
                  <p
                    onClick={() =>
                      showOptions === todo.id
                        ? setshowOptions("")
                        : setshowOptions(todo.id)
                    }
                  >
                    {todo.title}
                  </p>
                </div>
                {showOptions === todo.id && (
                  <div className={styles.btnContainer}>
                    <button
                      id="todo-duplicate-button__${todo_id}"
                      className={styles.btnColor}
                      onMouseEnter={() => setatHover(`dup` + `${todo.id}`)}
                      onMouseLeave={() => setatHover("")}
                      onClick={() =>
                        handleDuplicateTask(todo.title, todo.createdAt)
                      }
                    >
                      <Image
                        src={atHover === `dup` + `${todo.id}` ? dup : dupIn}
                        alt="dupIn"
                      />
                    </button>
                    <button
                      className={styles.btnColor}
                      onMouseEnter={() => setatHover(`star` + `${todo.id}`)}
                      onMouseLeave={() => setatHover("")}
                    >
                      <Image
                        src={atHover === `star` + `${todo.id}` ? star : Vector}
                        alt="Vector"
                      />
                    </button>
                    <button
                      className={styles.btnColor}
                      onMouseEnter={() => setatHover(`del` + `${todo.id}`)}
                      onMouseLeave={() => setatHover("")}
                      onClick={() => handleDelete(todo.id)}
                    >
                      <Image
                        src={atHover === `del` + `${todo.id}` ? del : deleteIn}
                        alt="Delete"
                      />
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        <CreateTodo />
      </div>
    </div>
  );
}
