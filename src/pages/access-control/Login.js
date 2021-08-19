import React from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { useState } from "react";
import { Link as RouterLink, useHistory } from "react-router-dom";
import { Link } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function Login(props) {
  const classes = useStyles();
  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory();

  function submitHandler(e) {
    e.preventDefault();
    setIsLoading(true);
    fetch("https://my-ticket-api-dev.herokuapp.com/login", {
      method: "POST",
      body: JSON.stringify({
        username: props.user.username,
        password: props.user.password,
      }),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((json) => {
        setIsLoading(false);
        if (json.token) {
          window.localStorage.setItem("token", json.token);
          console.log("Token saved");
          const ticketID = window.localStorage.getItem("ticket");
          if (ticketID) history.push(`/ticket/${ticketID}`);
          else history.push(`/`);
        } else window.alert(json.error);
      });
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      {isLoading ? (
        <h1>Loading</h1>
      ) : (
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Login
          </Typography>
          <form
            className={classes.form}
            noValidate
            method="post"
            onSubmit={submitHandler}
          >
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="username"
              label="username"
              name="username"
              autoComplete="username"
              value={props.user.username}
              onChange={(e) =>
                props.onUserChange({ ...props.user, username: e.target.value })
              }
              autoFocus
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={props.user.password}
              onChange={(e) =>
                props.onUserChange({ ...props.user, password: e.target.value })
              }
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Login
            </Button>
            <Grid container>
              <Grid item>
                <Link component={RouterLink} to="/register">
                  Don't have an account?
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
      )}
    </Container>
  );
}
