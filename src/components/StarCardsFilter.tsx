import StarCardsList from "./StarCardsList";
import { ICharacter } from "../interfaces";
import useFilter from "../hooks/useFilter";

interface CharactersProps {
  characters: Array<ICharacter>;
  setResults: React.Dispatch<React.SetStateAction<Array<ICharacter>>>;
}

function StarCardsFilter(props: CharactersProps) {
  const { characters, setResults } = props;
  const { value, filteredArr, totalMass, setRemove, onChange } =
    useFilter(characters);

  return (
    <>
      <h1>List of Characters</h1>
      <form>
        <input
          value={value}
          type="text"
          placeholder="Search for a character"
          onChange={onChange}
        />
      </form>
      <div className="mass-info">
        <h3>
          {filteredArr.length} characters — total mass {totalMass} kg
        </h3>
      </div>
      <div className="wrapper">
        <div className="characters_board">
          <StarCardsList
            setResults={setResults}
            setRemove={setRemove}
            characters={filteredArr}
          />
        </div>
      </div>
    </>
  );
}

export default StarCardsFilter;
