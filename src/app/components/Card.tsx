import * as React from "react";
import Image from "next/image";
import Label from "./Label";

interface CardProps {
  pokemonName: string;
  image: string;
  types: {
    type: {
      name: string;
    };
    slot: number;
  }[];
}

const Card: React.FC<CardProps> = ({ pokemonName, image, types }) => {
  return (
    <div className="flex flex-col bg-teal-100 h-64 w-50 p-6 rounded-lg justify-center">
      <div className="flex justify-center">
        <Image
          alt={`Image of ${pokemonName}`}
          src={image}
          width={150}
          height={150}
          className="size-32"
        />
      </div>
        <div className="flex flex-wrap justify-center gap-1">
      {types ? types.map((typeObj) => {
        return (
          <div className="p-1" key={typeObj.slot}>
            <Label type={typeObj.type.name} />
          </div>
        );
      }) : null}
        </div>

      <div className="text-3xl font-bold flex justify-center">
        <h3>{pokemonName}</h3>
      </div>
    </div>
  );
};

export default Card;
