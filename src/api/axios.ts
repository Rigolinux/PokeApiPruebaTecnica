import axios from "axios";


//poke api

export const client = axios.create({
    baseURL: "https://pokeapi.co/api/v2",
    headers: {
        "Content-Type": "application/json",
    },
});
