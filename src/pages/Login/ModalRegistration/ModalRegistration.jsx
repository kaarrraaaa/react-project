import React, { useState } from "react";
import styles from "./ModalRegistration.module.css";
import classNames from "classnames";

export default function ModalRegistration({ close, openRegistration }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [photo, setPhoto] = useState("");
  const [error, setError] = useState("");

  const handleRegister = () => {
    if (!password) {
      setError("Введите пароль.");
      return;
    }

    if (password.length < 6) {
      setError("Пароль должен содержать не менее 6 символов.");
      return;
    }

    const registerData = {
      name,
      email,
      password,
      photo,
    };

    fetch("https://reqres.in/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(registerData),
    })
      .then(async (response) => {
        if (!response.ok) {
          const errorData = await response.json();
          if (errorData.error === "Missing password") {
            setError("Пароль не был введен.");
          } else if (
            errorData.error === "Note: Only defined users succeed registration"
          ) {
            setError("Некорректный email или пароль.");
          } else {
            setError("Произошла ошибка при регистрации.");
          }
          throw new Error(errorData.error);
        }
        return response.json();
      })
      .then((data) => {
        handleSuccessfulRegistration(data);
        close();
        clearForm();
      })
      .catch((error) => {
        console.error("Error during registration:", error);
      });
  };

  const clearForm = () => {
    setName("");
    setEmail("");
    setPassword("");
    setPhoto("");
    setError("");
  };

  const handleSuccessfulRegistration = (response) => {
    const logData = JSON.parse(localStorage.getItem("logData")) || [];
    const newUserData = [response.token, response.id, email];
    logData.push(newUserData);
    localStorage.setItem("logData", JSON.stringify(logData));
    console.log(
      "Registration successful. Token:",
      response.token,
      "ID:",
      response.id
    );
  };

  return (
    <div
      className={classNames(styles["modalRegistration-container"], {
        [styles.open]: openRegistration,
      })}
    >
      <p className={styles.modalRegistrationContent}>Регистрация</p>
      {error && <p className={styles.error}>{error}</p>}
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Имя"
      />

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

      <input
        type="text"
        value={photo}
        onChange={(e) => setPhoto(e.target.value)}
        placeholder="Ссылка на фото"
      />
      <button className={styles.modalRegistrationBtn} onClick={handleRegister}>
        Зарегистрироваться
      </button>
      <button
        className={styles.closeModalRegistration}
        onClick={() => {
          close();
          clearForm();
        }}
      >
        Закрыть
      </button>
    </div>
  );
}
