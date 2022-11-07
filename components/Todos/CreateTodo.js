import React from "react";
import { useState } from "react";
import Image from "next/image";
import plus from "../../public/assets/plus.png";
import tick from "../../public/assets/tick.png";
import cross from "../../public/assets/cross.png";
import line from "../../public/assets/line.png";
import styles from "../../styles/createTodo.module.scss";

const CreateTodo = () => {
  const [title, setTitle] = useState("");
  const [dateTime, setDateTime] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("/api/todos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        createdAt: dateTime,
      }),
    });
    const todo = await response.json();
    setTitle("");
  };

  const [isShown, setisShown] = useState(false);

  return (
    <div>
      {" "}
      {isShown ? (
        <div className={styles.itemContainer}>
          {/* <h1>Add Todo</h1> */}

          <div className={styles.createFrame}>
            {" "}
            {/* //create */}
            <div className={styles.taskContainer}>
              {" "}
              {/* frame1 */}
              <Image src={line} />{" "}
              <form onSubmit={handleSubmit}>
                <input
                  className={styles.inputText}
                  type="text"
                  value={title}
                  placeholder="Enter task to add"
                  onChange={(e) => setTitle(e.target.value)}
                />{" "}
              </form>
            </div>
            <div className={styles.datebtnContainer}>
              <input
                className={styles.dateContainer}
                value={dateTime}
                type={"datetime-local"}
                onChange={(e) => setDateTime(e.target.value)}
              ></input>
              <div className={styles.buttonContainer}>
                <button
                  className={styles.addButton}
                  onClick={() => setisShown(false)}
                >
                  <Image src={cross} alt="cross" />
                </button>
                <button className={styles.addButton} onClick={handleSubmit}>
                  <Image src={tick} />
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <button className={styles.addButton} onClick={() => setisShown(true)}>
          <div className={styles.createTask}>
            <Image src={plus} />
            <span>Create New Item</span>
          </div>
        </button>
      )}
    </div>
  );
};

export default CreateTodo;
