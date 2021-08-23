import { Button, TextField } from "@material-ui/core";
import { useContext, useEffect, useState } from "react";
import { db } from "./config/firebaseconfig";

import firebase from "firebase";
import TodoListItem from "./Todo";
import { UserContext } from "./stateProvider";

function TodoHome() {
  const [todos, settodos] = useState([]);
  const [todoInput, settodoInput] = useState("");
  const user = useContext(UserContext);

  useEffect(() => {
    getTodo();
  }, [todoInput]);

  function getTodo() {
    db.collection("todos").onSnapshot(function (querySnapshot) {
      settodos(
        querySnapshot.docs.map((doc) => ({
          id: doc.id,
          todo: doc.data().todo,
          inprogress: doc.data().inprogress,
        }))
      );
    });
  }

  const addTodo = (e) => {
    e.preventDefault();

    db.collection("todos").add({
      inprogress: true,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      todo: todoInput,
    });

    settodoInput("");
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {user ? (
          <div className="App">
            <h1> Todo app </h1>
            <form>
              <TextField
                id="standard-basic"
                label="Write a To-do"
                value={todoInput}
                onChange={(e) => settodoInput(e.target.value)}
                style={{ maxWidth: "300px", width: "90vw" }}
              />
              <Button
                disabled={todoInput.length < 1}
                type="submit"
                variant="contained"
                onClick={addTodo}
              >
                ADD
              </Button>
            </form>
            {todos.map((todo) => (
              <TodoListItem
                todo={todo.todo}
                inprogress={todo.inprogress}
                id={todo.id}
                key={todo.id}
              />
            ))}
          </div>
        ) : (
          "Please login/signup to access this feature"
        )}
      </div>
    </>
  );
}

export default TodoHome;
