import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import StarCardsFilter from "./components/StarCardsFilter";
import StarCardDetails from "./pages/StarCardDetails";
import { ICharacter } from "./interfaces";

function App() {
  const [results, setResults] = useState<Array<ICharacter>>([]);
  const [err, setError] = useState<any>(null);
  const [isLoaded, setIsLoaded] = useState<any>(false);

  useEffect(() => {
    fetch("https://swapi.dev/api/people")
      .then((response) => {
        return response.json();
      })
      .then((res) =>
        Promise.all(
          res.results.map(async (elem: ICharacter) => ({
            ...elem,
            favorites: false,
            homeworld: await fetch(elem.homeworld)
              .then((result) => result.json())
              .then((result) => result.name),
          }))
        )
      )
      .then((res) => setResults(res))
      .then((res) => {
        return res;
      })
      // .then(() => {
      //   throw new Error("test message!");
      // })
      .catch((error) => {
        setError(error.message);
      })
      .finally(() => setIsLoaded(true));
  }, []);

  if (err) {
    return <div>Error: {err}</div>;
  }

  if (!isLoaded) {
    return <div>Loading...</div>;
  }
  return (
    <div className="App">
      <Routes>
        <Route
          path="/"
          element={
            <StarCardsFilter setResults={setResults} characters={results} />
          }
        />
        <Route
          path="details/:name"
          element={<StarCardDetails characters={results} />}
        />
      </Routes>
    </div>
  );
}

export default App;
