
const baseUrl = 'http://localhost:3030';

export const getAll = async () => {
    const res = await fetch(`${baseUrl}/data/games?sortBy=_createdOn%20desc&distinct=category`);
    const result = await res.json();

    return result;
};