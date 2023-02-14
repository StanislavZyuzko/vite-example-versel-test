// state interfaces

interface ListCard {
  name: string;
  gender: string;
  homeworld: string;
  mass: null | number;
  favorites: boolean;
}

interface ICardslistState {
  card: ListCard;
  modal: boolean;
}

// action interfaces

interface SetCardPayload {
  name: string;
  value: string | number;
}

interface SetCardAction {
  type: "SET_CARD";
  payload: SetCardPayload;
}

interface IsModalAction {
  type: "IS_MODAL";
}

type ListAction = SetCardAction | IsModalAction;

export const LIST_INITIAL = {
  card: {
    name: "",
    gender: "",
    homeworld: "",
    mass: null,
    favorites: false,
  },
  modal: false,
};

export const listReducer = (state: any, action: any) => {
  switch (action.type) {
    case "SET_CARD":
      return {
        ...state,
        card: {
          ...state.card,
          [action.payload.name]: action.payload.value,
        },
      };
    case "IS_MODAL":
      return {
        ...state,
        card: {
          name: "",
          gender: "",
          homeworld: "",
          mass: null,
          favorites: false,
        },
        modal: !state.modal,
      };

    default:
      return state;
  }
};
