import React from "react";
import {useState} from 'react';
import {Link} from 'react-router-dom'
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

export default function FormDialog() {

  const [open, setOpen] = React.useState(true);
  const [quizid, setquizid] = useState(null)

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (e) => {
    setquizid(e.target.value);
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Enter Quiz ID</DialogTitle>
        <DialogContent>
          <DialogContentText></DialogContentText>
          <TextField onChange={handleChange}
            autoFocus
            margin="dense"
            id="name"
            type="number"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Link to={"/insertques/" + quizid}>
              <Button color="primary">
                  Confirm
              </Button>
          </Link>
        </DialogActions>
      </Dialog>
    </div>
  );
}
