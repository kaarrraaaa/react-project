import ModalLog from "./ModalLog/ModalLog";
import ModalRegistration from "./ModalRegistration/ModalRegistration";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function LoginPage({ setIsLogged }) {
  const [isRegistered, setIsRegistered] = useState(false);
  const [openLog, setOpenLog] = useState(false);
  const [openRegistration, setOpenRegistration] = useState(false);
  const navigate = useNavigate();

  const handleLogin = () => {
    setIsLogged(true);
    navigate("/");
  };

  const handleRegister = () => {
    setIsRegistered(true);
  };

  const handleCloseModal = () => {
    setOpenLog(false);
    setOpenRegistration(false);
  };

  return (
    <div className="App">
      <ModalLog
        openLog={openLog}
        close={handleCloseModal}
        onLogin={handleLogin}
      />

      <ModalRegistration
        openRegistration={openRegistration}
        close={handleCloseModal}
        onRegister={handleRegister}
      />

      <button onClick={() => setOpenLog(true)}>Войти</button>
      <button onClick={() => setOpenRegistration(true)}>
        Зарегистрироваться
      </button>

      {isRegistered && <p>Вы успешно зарегистрированы.</p>}
      <h3>Вы не вошли в аккаунт</h3>
    </div>
  );
}

export default LoginPage;
