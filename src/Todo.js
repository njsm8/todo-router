import { Button, ListItem, ListItemText } from "@material-ui/core";
import React from "react";
import DeleteIcon from "@material-ui/icons/Delete";
import { db } from "./config/firebaseconfig";

export default function TodoListItem({ todo, inprogress, id }) {
  function toggleInProgress() {
    db.collection("todos").doc(id).update({
      inprogress: !inprogress,
    });
  }

  function deleteTodo() {
    db.collection("todos").doc(id).delete();
  }

  return (
    <div style={{ display: "flex" }}>
      <ListItem>
        <ListItemText
          primary={todo}
          secondary={inprogress ? "In Progress" : "Completed"}
        />
      </ListItem>

      <Button onClick={toggleInProgress}>
        {inprogress ? "Done" : "Undone"}
      </Button>
      <DeleteIcon onClick={deleteTodo} style={{ padding: "20px" }}>
        X
      </DeleteIcon>
    </div>
  );
}
