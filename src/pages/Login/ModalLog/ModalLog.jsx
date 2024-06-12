import React, { useState } from "react";
import styles from "./ModalLog.module.css";
import classNames from "classnames";

export default function ModalLog(props) {
  const { openLog, close, onLogin } = props;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    fetch("https://reqres.in/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.token) {
          onLogin();
          close();
        }
      })
      .catch((error) => {
        console.error("Error during login:", error);
      });
  };

  return (
    <div
      className={classNames(styles["modalLog-container"], {
        [styles.open]: openLog,
      })}
    >
      <p className={styles.modalLogContent}>Вход</p>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Пароль"
      />
      <button onClick={handleLogin}>Войти</button>
      <button onClick={() => close()}>Закрыть</button>
    </div>
  );
}
