import { useState } from "react";
import { Link } from "react-router-dom";
import { ICharacter } from "../interfaces";

interface CardProps {
  name: string;
  gender: string;
  world: string;
  isFavorite: boolean | undefined;
  setResults: React.Dispatch<React.SetStateAction<Array<ICharacter>>>;
  setRemove: React.Dispatch<React.SetStateAction<Array<string>>>;
}

function StarCard(props: CardProps) {
  const { name, gender, world, setRemove, isFavorite, setResults } = props;
  const [selected, setSelected] = useState<boolean>(false);

  const hrefName = name.split(" ").join("-").toLowerCase();

  const selectHandleClick = () => {
    setSelected(!selected);
  };

  const favoritesHandleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();

    setResults((prevState: Array<ICharacter>) =>
      prevState.map((elem: ICharacter) => {
        if (elem.name === name) {
          return { ...elem, favorites: !elem.favorites };
        }
        return elem;
      })
    );
  };

  const removeHandleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setRemove((prevState) => [
      ...prevState,
      (event.target as Element).id.toLowerCase(),
    ]);
  };

  return (
    <div
      className={selected ? "character_info selected" : "character_info"}
      onClick={selectHandleClick}
    >
      <h1 className="name">{name}</h1>
      <span className="gender">{gender}</span>
      <span className="world">{world}</span>
      <button
        id={name}
        type="button"
        className="remove-button"
        onClick={removeHandleClick}
      >
        x
      </button>
      <Link to={`details/${hrefName}`}>Details </Link>
      <button
        className={isFavorite ? "favorites-button" : " "}
        type="button"
        onClick={favoritesHandleClick}
      >
        в избранное
      </button>

      {isFavorite && (
        <img
          className="star-icon"
          src="https://pngicon.ru/file/uploads/1_2789-128x128.png"
          alt="Svg Star Icon"
        />
      )}
    </div>
  );
}

export default StarCard;
