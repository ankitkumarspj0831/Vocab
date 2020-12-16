import { makeStyles } from "@material-ui/core/styles";
import React, { useState } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Button from "@material-ui/core/Button";
import AddBoxIcon from "@material-ui/icons/AddBox";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export default function Navigation() {
  const classes = useStyles();
  const [searchTerm, setSearchTerm] = useState("");
  const [words, setWords] = useState([]);
  function callBackend() {
    fetch("http://localhost:8080")
      .then((result) => {
        return result.json();
      })
      .then((result) => {
        setWords(result.words);
      })
      .catch((err) => {
        console.log("Fetching Failed.");
      });
  }
  callBackend();

  return (
    <div className={classes.root}>
      <AppBar position="static" style={{ background: "#4f0d52" }}>
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            <Button href="/" style={{ color: "white" }}>
              Vocab
            </Button>
          </Typography>
          <Button href="/add" style={{ color: "white" }}>
            <AddBoxIcon />
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}
