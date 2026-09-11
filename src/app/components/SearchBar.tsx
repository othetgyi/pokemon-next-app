import React from 'react';
import Button from "@/app/components/Button";

type SearchBarProps = {
  handleSubmit: (_event: React.FormEvent<HTMLFormElement>) => void | Promise<void>;
  onChange: (_event: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
  isValid: boolean;
  error: string;
  isSearching: boolean;
};

const SearchBar = ({
                     handleSubmit,
                     onChange,
                     value,
                     isValid,
                     error,
                     isSearching
                   }: SearchBarProps) => {
  return (
      <form onSubmit={handleSubmit}
            className={"bg-white rounded-lg shadow p-4 border border-gray-200"}>
        <label htmlFor="search" className={"font-bold text-lg px-2"}>Search by name</label>
        <div className={"flex items-center gap-2 mt-2"}>
          <div className="relative flex-1">
            <input
                id="search"
                className={`w-full border-2 ${isValid ? "border-gray-300" : "border-red-600"} rounded-full py-1.5 pl-4 pr-9 text-sm placeholder:text-gray-400 focus:outline-none focus:border-yellow-400 transition-colors`}
                type="text"
                name="search"
                placeholder="Search for Pokemon"
                value={value}
                onChange={onChange}
            />
            <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="2"/>
                        <line x1="21" y1="21" x2="16.65" y2="16.65" stroke="currentColor"
                              strokeWidth="2"/>
                    </svg>
                </span>
          </div>
          <Button disabled={isSearching} type="submit" text={"Find Pokemon"} ariaLabel="Submit"/>
        </div>
        {!isValid && error && (
            <div
                className={"mt-3 flex items-center gap-2 bg-red-50 border border-red-200 text-red-700 text-sm rounded-md px-3 py-2"}
                role="alert">
              <svg className="h-4 w-4 flex-shrink-0" fill="none" viewBox="0 0 24 24"
                   stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/>
              </svg>
              <span>{error}</span>
            </div>
        )}
      </form>
  )
}

export default SearchBar;
