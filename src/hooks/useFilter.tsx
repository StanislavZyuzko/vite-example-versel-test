import { useState } from "react";
import { ICharacter } from "../interfaces";

const useFilter = (characters: Array<any>, initial = "") => {
  const [value, setValue] = useState<string>(initial);
  const [remove, setRemove] = useState<Array<string>>([""]);

  const searchName = value.toLowerCase();
  const filteredArr = characters.filter((character: ICharacter) => {
    if (character.name) {
      const name = character.name.toLowerCase();

      return name.includes(searchName) && !remove.includes(name);
    }
  });

  const totalMass = filteredArr.reduce(
    (sum: number, current: any) => sum + +current.mass,
    0
  );

  return {
    value,
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => {
      setValue(event.target.value);
    },
    filteredArr,
    totalMass,
    setRemove,
  };
};

export default useFilter;
