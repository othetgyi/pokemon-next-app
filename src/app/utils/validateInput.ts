import pokemonNames from './pokedex_base_names.json';

const validateInput = (input: string) => {
    const specialChars = /[~`!@#$%^&*()_+\=\[\]{};:"\\|,<>\/?]/;
    if (!input) {
        return {
            isValid: false,
            message: "Please enter a Pokemon"
        }
    }

    if (specialChars.test(input)) {
        return {
            isValid: false,
            message: "Those special characters are invalid"
        }
    }

    if (input.length < 3) {
        return {
            isValid: false,
            message: "Minimum name length: 3 letters"
        }
    }

if (!pokemonNames.names.includes(input.toLowerCase())) {
    return {isValid: false, message: "No Pokemon matched your search"}
    }
return {isValid: true, message: ""};
}

export default validateInput;