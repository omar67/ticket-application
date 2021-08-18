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

import { Link, useHistory } from "react-router-dom";

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

export default function Register(props) {
  const classes = useStyles();

  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory();
  let { name, username, password } = props.user;

  function submitHandler(e) {
    e.preventDefault();
    setIsLoading(true);
    fetch("https://my-ticket-api-dev.herokuapp.com/register", {
      method: "POST",
      body: JSON.stringify({ name, username, password }),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((json) => {
        setIsLoading(false);
        if (json.message) {
          history.push("/login");
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
            Register
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
              id="name"
              label="name"
              name="name"
              autoComplete="name"
              value={name}
              onChange={(e) =>
                props.onUserChange({ ...props.user, name: e.target.value })
              }
              autoFocus
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="username"
              label="username"
              name="username"
              autoComplete="username"
              value={username}
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
              value={password}
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
              Register
            </Button>
            <Grid container>
              <Grid item>
                <Link to="/login" variant="body2">
                  Already have an account?
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
      )}
    </Container>
  );
}
