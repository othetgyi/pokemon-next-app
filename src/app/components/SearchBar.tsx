import React from 'react';

const SearchBar = () => {
//     const handleSubmit = () => {
//         const [input, setInput]
//     }

    return (
       // <form method={"GET"} onSubmit={handleSubmit}>
        <div className="relative">
            <input className="border-2 border-sky-700 m-2 rounded placeholder:text-center pl-4" type="text" placeholder="Search for Pokemon" />
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 p-1">
    <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
    >
      <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="2" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" stroke="currentColor" strokeWidth="2" />
    </svg>
  </span>
        </div>
      //  </form>
    )
}

export default SearchBar;