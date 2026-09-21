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

const Card: React.FC<CardProps> = ({pokemonName, image, types}) => {
  return (
      <div
          className="flex flex-col bg-white h-64 w-56 p-6 rounded-2xl justify-center items-center shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-gray-100">
        <div className="flex justify-center bg-gray-50 rounded-full p-3">
          <Image
              alt={`Image of ${pokemonName}`}
              src={image}
              width={150}
              height={150}
              className="size-28"
          />
        </div>
        <div className="flex flex-wrap justify-center gap-1.5 mt-3">
          {types ? types.map((typeObj) => {
            return (
                <div className="p-1" key={typeObj.slot}>
                  <Label type={typeObj.type.name}/>
                </div>
            );
          }) : null}
        </div>

        <div className="text-3xl font-bold flex justify-center">
          <h3 className={"text-xl font-semibold text-gray-800 mt-3 capitalize tracking-tight"}>{pokemonName}</h3>
        </div>
      </div>
  );
};

export default Card;
