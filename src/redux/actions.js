export const FETCH_USERS_SUCCESS = "FETCH_USERS_SUCCESS";
export const UPDATE_USER = "UPDATE_USER";

export const fetchUsersSuccess = (cards) => ({
  type: FETCH_USERS_SUCCESS,
  payload: cards,
});

export const updateUser = (userId, updatedUserData) => ({
  type: UPDATE_USER,
  payload: { id: userId, ...updatedUserData },
});
