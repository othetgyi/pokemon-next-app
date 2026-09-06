import * as React from "react";

const Button: React.FC<{
  text: string;
  type?: "button" | "reset" | "submit";
  ariaLabel?: string;
  onClick?: () => void;
}> = ({
        text,
        type = "button",
        onClick,
        ariaLabel = text
      }) => {
  return (
      <button
          className="w-auto px-4 py-2 rounded-lg flex items-center justify-center bg-yellow-300 font-semibold text-gray-900 shadow-sm hover:bg-yellow-400 active:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-1 transition-colors"
          type={type}
          aria-label={ariaLabel}
          onClick={onClick}>
        {text}
      </button>
  );
};

export default Button;
