import { UPDATE_USER, FETCH_USERS_SUCCESS } from "./actions";

const initialState = {
  cards: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_USERS_SUCCESS:
      return {
        ...state,
        cards: action.payload,
      };
    case UPDATE_USER:
      return {
        ...state,
        cards: state.cards.map((card) =>
          card.id === action.payload.id ? { ...card, ...action.payload } : card
        ),
      };
    default:
      return state;
  }
};

export default reducer;
