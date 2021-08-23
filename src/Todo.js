import { Button, ListItem, ListItemText } from "@material-ui/core";
import React, { useContext } from "react";
import DeleteIcon from "@material-ui/icons/Delete";
import { db } from "./config/firebaseconfig";
import { UserContext } from "./stateProvider";

export default function TodoListItem({ todo, inprogress, id }) {
  const user = useContext(UserContext);

  function toggleInProgress() {
    db.collection(user).doc(id).update({
      inprogress: !inprogress,
    });
  }

  function deleteTodo() {
    db.collection(user).doc(id).delete();
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
