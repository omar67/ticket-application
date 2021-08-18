import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import Login from "./Login";
import Register from "./Register";

export default function AccessControl(props) {
  const [tab, setTab] = useState(props.tab);

  const [user, setUser] = useState({ name: "", username: "", password: "" });
  //   const [password, setPassword] = useState();

  useEffect(() => {
    setTab(props.tab);
  }, [props.tab]);
  // const [token, setToken] = useState()
  // const [ticket, setTicket] = useState()

  return (
    <div>
      {tab === "login" ? (
        <Login user={user} onUserChange={(user) => setUser(user)} />
      ) : (
        <Register user={user} onUserChange={(user) => setUser(user)} />
      )}
    </div>
  );
}
