import * as React from "react";

const Card = ({ pokemonName }: { pokemonName: string }) => {
  return (
    <div className="flex justify-center flex-col bg-cyan-500/30 border border-red-500">
      <div className="h-1/10 p-6 text-3xl font-bold bg-green-500">
        <h3>{pokemonName}</h3>
      </div>
      <div className="h-9/10 bg-yellow-500">Content</div>
    </div>
  );
};

export default Card;
