import * as React from "react";
import Image from "next/image";

const Card = ({
  pokemonName,
  image,
}: {
  pokemonName: string;
  image: string;
}) => {
  return (
    <div className="flex flex-col bg-teal-100 h-64 w-64 p-4 rounded-lg justify-center">
      <div className="flex justify-center">
        <Image
          alt={`Image of ${pokemonName}`}
          src={image}
          width={200}
          height={200}
        />
      </div>
      <div className="text-3xl font-bold flex justify-center">
        <h3>{pokemonName}</h3>
      </div>
    </div>
  );
};

export default Card;
