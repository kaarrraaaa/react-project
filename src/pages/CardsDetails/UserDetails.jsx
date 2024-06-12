import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import style from "./UserDetails.module.css";
import { useDispatch } from "react-redux";
import { updateUser } from "../../redux/actions";

function UserDetails() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [updatedUser, setUpdatedUser] = useState({
    first_name: "",
    email: "",
    avatar: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`https://reqres.in/api/users/${id}`);
        setUser(response.data.data);
        setUpdatedUser(response.data.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching user:", error);
        setLoading(false);
      }
    };

    fetchUser();
  }, [id]);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleInputChange = (e) => {
    setUpdatedUser({ ...updatedUser, [e.target.name]: e.target.value });
  };

  const handleSaveChanges = async () => {
    try {
      const response = await axios.patch(
        `https://reqres.in/api/users/${user.id}`,
        updatedUser
      );
      dispatch(updateUser(user.id, response.data));
      setIsEditing(false);
      navigate("/");
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  const handleBackButton = () => {
    if (isEditing) {
      setIsEditing(false);
    } else {
      navigate("/");
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <div>Пользователь не найден</div>;
  }

  return (
    <div className={style["container"]}>
      <h1 className={style["title"]}>Детали пользователя</h1>
      <div className={style["userInformation"]}>
        <label>
          <p className={style["userName"]}>Имя:</p>
          <input
            type="text"
            name="first_name"
            value={updatedUser.first_name}
            onChange={handleInputChange}
            readOnly={!isEditing}
          />
        </label>
        <label>
          <p className={style["userEmail"]}>Email:</p>
          <input
            type="email"
            name="email"
            value={updatedUser.email}
            onChange={handleInputChange}
            readOnly={!isEditing}
          />
        </label>
        <label className={style["avatarContainer"]}>
          <p className={style["userAvatar"]}>Фотография:</p>
          <input
            type="text"
            name="avatar"
            value={updatedUser.avatar}
            onChange={handleInputChange}
            readOnly={!isEditing}
          />
        </label>
        {updatedUser.avatar && (
          <img
            src={updatedUser.avatar}
            alt="Avatar"
            className={style["avatarImage"]}
          />
        )}
      </div>
      <div className={style["buttonContainer"]}>
        {isEditing && (
          <button onClick={handleSaveChanges} className={style["saveButton"]}>
            Сохранить
          </button>
        )}
        <button onClick={handleBackButton} className={style["backButton"]}>
          Назад
        </button>
        {!isEditing && (
          <button onClick={handleEditClick} className={style["editButton"]}>
            Редактировать
          </button>
        )}
      </div>
    </div>
  );
}

export default UserDetails;
