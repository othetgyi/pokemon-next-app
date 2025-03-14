import * as React from "react";
import Image from "next/image";

interface CardProps {
  pokemonName: string;
  image: string;
}

const Card: React.FC<CardProps> = ({ pokemonName, image }) => {
  return (
    <div className="flex flex-col bg-teal-100 h-48 w-48 p-6 rounded-lg justify-center">
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
