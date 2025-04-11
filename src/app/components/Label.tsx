import * as React from "react";

const Label: React.FC<{ type: string }> = ({ type }) => {
  const colourMap = [
    { type: "bug", colour: "bg-lime-400" },
    { type: "normal", colour: "bg-grey-400" },
    { type: "fire", colour: "bg-red-600" },
    { type: "water", colour: "bg-blue-400" },
    { type: "electric", colour: "bg-yellow-400" },
    { type: "grass", colour: "bg-green-500" },
    { type: "ice", colour: "bg-sky-300" },
    { type: "fighting", colour: "bg-stone-500" },
    { type: "poison", colour: "bg-emerald-500" },
    { type: "ground", colour: "bg-amber-900" },
    { type: "flying", colour: "bg-cyan-300" },
    { type: "psychic", colour: "bg-fuchsia-500" },
    { type: "rock", colour: "bg-slate-600" },
    { type: "ghost", colour: "bg-gray-300" },
    { type: "dragon", colour: "bg-fuchsia-900" },
    { type: "dark", colour: "bg-black" },
    { type: "steel", colour: "bg-zinc-500" },
    { type: "fairy", colour: "bg-pink-300" },
  ];
  const matchedItem = colourMap.find((item) => item.type === type);
  return matchedItem ? (
    <div
      className={`flex justify-center w-16 p-1 font-semibold text-white rounded-sm ${matchedItem.colour}`}
    >
      <h4>{type}</h4>
    </div>
  ) : null;
};

export default Label;
