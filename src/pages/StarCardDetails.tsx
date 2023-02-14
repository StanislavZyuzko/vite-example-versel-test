import { useParams, Link } from "react-router-dom";
import { ICharacter } from "../interfaces";

interface CharactersProps {
  characters: Array<ICharacter>;
}

function StarCardDetails({ characters }: CharactersProps) {
  const { name } = useParams();

  const [characterInfo] = characters.filter(
    (item) => item.name.replaceAll(" ", "-").toLowerCase() === name
  );

  if (!characterInfo) {
    return <div>please wait...</div>;
  }

  return (
    <div className="more-character-info">
      <h3>name: {characterInfo.name}</h3>
      <h3>gender: {characterInfo.gender}</h3>
      <h3>eye_color: {characterInfo.eye_color}</h3>
      <h3>homeworld: {characterInfo?.homeworld}</h3>
      <h3>mass: {characterInfo.mass}</h3>
      <h3>height: {characterInfo.height}</h3>
      <h3>birth_year: {characterInfo.birth_year}</h3>

      <Link className="menu-link" to="/">
        На главную{" "}
      </Link>
    </div>
  );
}

export default StarCardDetails;
