import { useEffect, useState } from "react";
import "./Header.module.css";

export default function Header(props) {
  const { openRegister, openLog, isLogged, filter, setFilter, handleLogout } =
    props;

  const [placeholder, setPlaceholder] = useState("Поиск...");

  useEffect(() => {
    if (filter.nameFilter === "starts") {
      setPlaceholder("Введите букву");
    } else {
      setPlaceholder("Поиск...");
    }
  }, [filter.nameFilter]);

  const handleSearch = (event) => {
    setFilter((prevFilter) => ({
      ...prevFilter,
      searching: event.target.value,
      startsWith: event.target.value,
    }));
  };

  const handleNameFilter = (event) => {
    setFilter((prevFilter) => ({
      ...prevFilter,
      nameFilter: event.target.value,
    }));
  };

  const handleIdFilter = (event) => {
    setFilter((prevFilter) => ({
      ...prevFilter,
      idFilter: event.target.value,
    }));
  };

  return (
    <header>
      <section className="registration">
        <ul className="log-btns">
          {isLogged ? (
            <li>
              <button className="btn-log" onClick={() => handleLogout()}>
                Выход
              </button>
            </li>
          ) : (
            <>
              <li>
                <button className="btn-log" onClick={() => openLog()}>
                  Войти
                </button>
              </li>
              <li>
                <button
                  className="btn-registration"
                  onClick={() => openRegister()}
                >
                  Зарегистрироваться
                </button>
              </li>
            </>
          )}
        </ul>
      </section>

      {isLogged && (
        <section className="search">
          <input
            placeholder={placeholder}
            value={filter.searching}
            onChange={handleSearch}
          />
          <select value={filter.nameFilter} onChange={handleNameFilter}>
            <option value="all">Все имена</option>
            <option value="starts">Начинаются с</option>
          </select>
          <select value={filter.idFilter} onChange={handleIdFilter}>
            <option value="all">Все ID</option>
            <option value="even">Четные ID</option>
            <option value="odd">Нечетные ID</option>
          </select>
        </section>
      )}
    </header>
  );
}
