import Grid from "./components/Grid";

const pokemonData = [
  { id: 1, name: "Bulbasaur", image: "/bulbasaur.png" },
  { id: 2, name: "Ivysaur", image: "/ivysaur.png" },
  { id: 3, name: "Charmander", image: "/charmander.png" },
  { id: 4, name: "Squirtle", image: "/squirtle.png" },
];

export default function Home() {
  return (
    <div>
      <Grid pokemonDataArray={pokemonData} />
    </div>
  );
}
