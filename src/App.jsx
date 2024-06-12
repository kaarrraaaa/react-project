import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useNavigate,
} from "react-router-dom";
import CardsList from "./pages/CardsList/CardsList";
import UserDetails from "./pages/CardsDetails/UserDetails";
import LoginPage from "./pages/Login/LoginPage";
import { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsersSuccess, updateUser } from "./redux/actions";

function App() {
  const navigate = useNavigate();
  const [isLogged, setIsLogged] = useState(
    localStorage.getItem("isLogged") === "true"
  );

  const dispatch = useDispatch();
  const cards = useSelector((state) => state.cards);

  useEffect(() => {
    localStorage.setItem("isLogged", isLogged.toString());
  }, [isLogged]);

  useEffect(() => {
    const fetchCardData = async () => {
      try {
        const cardsPage1 = await axios.get(
          "https://reqres.in/api/users?page=1"
        );
        const cardsPage2 = await axios.get(
          "https://reqres.in/api/users?page=2"
        );
        const cards = [...cardsPage1.data.data, ...cardsPage2.data.data];
        console.log("Fetched cards:", cards);
        dispatch(fetchUsersSuccess(cards));
      } catch (err) {
        console.error("Error fetching card data:", err);
      }
    };

    if (!cards.length) {
      fetchCardData();
    }
  }, [dispatch, cards]);

  const handleLogin = () => {
    setIsLogged(true);
  };

  const handleLogout = () => {
    setIsLogged(false);
    localStorage.setItem("isLogged", "false");
    navigate("/login");
  };

  const updateUserData = (updatedUser) => {
    dispatch(updateUser(updatedUser.id, updatedUser));
  };

  return (
    <Routes>
      <Route path="/login" element={<LoginPage setIsLogged={handleLogin} />} />
      <Route
        path="/"
        element={
          isLogged ? (
            <CardsList onLogout={handleLogout} />
          ) : (
            <Navigate to="/login" />
          )
        }
      />
      <Route
        path="/users/:id"
        element={<UserDetails onUserUpdate={updateUserData} />}
      />
      <Route path="*" replace element={<Navigate to="/" />} />
    </Routes>
  );
}

export default App;
