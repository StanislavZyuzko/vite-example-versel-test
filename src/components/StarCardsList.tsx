import { useReducer } from "react";
import { ICharacter } from "../interfaces";
import StarCard from "./StarCard";
import { listReducer, LIST_INITIAL } from "../reducers/listReducer";

interface ListInputProps {
  state: any;
  fildName: string;
  handleInputChange: any;
  placeholder: string;
  errorMessage: string;
}

function ListInput({
  state,
  fildName,
  handleInputChange,
  placeholder,
  errorMessage,
}: ListInputProps) {
  let validPattern;
  if (fildName !== "mass") {
    validPattern =
      state.card[fildName].length > 0 && state.card[fildName].length < 3;
  } else {
    validPattern =
      !Number.isFinite(Number(state.card[fildName])) &&
      state.card[fildName].length > 0;
  }

  return (
    <>
      <input
        className={validPattern ? "modal-input error" : "modal-input"}
        onChange={handleInputChange}
        name={fildName}
        type="text"
        placeholder={placeholder}
      />
      {validPattern && <span className="errorMessage">{errorMessage}</span>}
    </>
  );
}

interface CharactersProps {
  characters: Array<ICharacter>;
  setRemove: React.Dispatch<React.SetStateAction<Array<string>>>;
  setResults: React.Dispatch<React.SetStateAction<Array<ICharacter>>>;
}

function StarCardsList(props: CharactersProps) {
  const { characters, setRemove, setResults } = props;
  const [state, dispatch] = useReducer(listReducer, LIST_INITIAL);

  const isLocked =
    state.card.name.length < 3 ||
    state.card.gender.length < 3 ||
    state.card.homeworld.length < 3 ||
    (state.card.mass && !Number.isFinite(Number(state.card.mass))) ||
    (Number.isFinite(Number(state.card.mass)) && Number(state.card.mass) <= 0);

  const modalHandleClick = () => {
    dispatch({ type: "IS_MODAL" });
  };

  const modalFormHandleClick = (event: any) => {
    event.stopPropagation();
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();
    setResults((prev) => [...prev, state.card]);
    dispatch({ type: "IS_MODAL" });
  };

  const handleInputChange = (event: any) => {
    event.preventDefault();

    const { name, value } = event.target;

    dispatch({
      type: "SET_CARD",
      payload: { name, value },
    });
  };

  const cards = characters.map((character: ICharacter) => (
    <StarCard
      setResults={setResults}
      isFavorite={character.favorites}
      setRemove={setRemove}
      key={character.name}
      name={character.name}
      gender={character.gender}
      world={character.homeworld}
    />
  ));

  return (
    <>
      {cards}
      {state.modal && (
        <div className="modal-hidden" onClick={modalHandleClick}>
          <div className="modal-container" onClick={modalFormHandleClick}>
            <form className="modal-form" onSubmit={handleSubmit}>
              <label className="modal-label">
                {isLocked &&
                  (state.card.name.length > 0 ||
                    state.card.gender.length > 0 ||
                    state.card.homeworld.length > 0 ||
                    (!Number.isFinite(Number(state.card.mass)) &&
                      state.card.mass.length > 0)) && (
                    <span className="errorMessage">
                      fill all fields correctly
                    </span>
                  )}
                <ListInput
                  state={state}
                  handleInputChange={handleInputChange}
                  fildName="name"
                  placeholder="Name must be original"
                  errorMessage="minimum 3 symbols required"
                />
                <ListInput
                  state={state}
                  handleInputChange={handleInputChange}
                  fildName="gender"
                  placeholder="gender"
                  errorMessage="minimum 3 symbols required"
                />
                <ListInput
                  state={state}
                  handleInputChange={handleInputChange}
                  fildName="homeworld"
                  placeholder="homeworld"
                  errorMessage="minimum 3 symbols required"
                />
                <ListInput
                  state={state}
                  handleInputChange={handleInputChange}
                  fildName="mass"
                  placeholder="mass (number only)"
                  errorMessage="number only required"
                />
                <button
                  type="button"
                  className="remove-button"
                  onClick={modalHandleClick}
                >
                  x
                </button>
              </label>
              <input
                className="modal-input"
                disabled={isLocked}
                type="submit"
                value="add character!"
              />
            </form>
          </div>
        </div>
      )}
      {!state.modal && (
        <div>
          <button
            className="modal-button"
            type="button"
            onClick={modalHandleClick}
          >
            add character
          </button>
        </div>
      )}
    </>
  );
}

export default StarCardsList;
