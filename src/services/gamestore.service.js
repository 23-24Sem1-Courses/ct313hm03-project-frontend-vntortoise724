function GameStoreService(){
    const baseUrl = '/api/games';
    const headers = {
        'Content-Type': 'application/json',
    }

    async function getGameList(page, limit = 5) {
        let url = `${baseUrl}?page=${page}&limit=${limit}`;
        return await fetch(url).then((res) => res.json());
    }

    async function createGame(contact) {
        return await fetch(`${baseUrl}`, {
            method: 'POST',
            headers,
            body: JSON.stringify(contact),
        }).then((res) => res.json());
    }

    async function getGame(id){
        return await fetch(`${baseUrl}/${id}`).then((res) => res.json());
    }

    return {
        getGameList,
        getGame,
        createGame,
    }
}

export default GameStoreService();