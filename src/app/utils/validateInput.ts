import pokemonNames from './pokedex_base_names.json';

const validateInput = (input: string) => {
    console.log("***pokemonNames***", pokemonNames)
    const specialChars = /[~`!@#$%^&*()_+\=\[\]{};:"\\|,<>\/?]/;
    if (!input) {
        return {
            isValid: false,
            message: "Please enter a Pokemon"
        }
    }

    if (specialChars.test(<string>input)) {
        return {
            isValid: false,
            message: "Pokemon cannot contain those special characters"
        }
    }

    if ((input as string).length < 3) {
        return {
            isValid: false,
            message: "Names must be at least three letters long"
        }
    }

if (!pokemonNames.names.includes(input.toLowerCase())) {
    return {isValid: false, message: "No Pokemon matched your search"}
    }
return {isValid: true, message: ""};
}

export default validateInput;