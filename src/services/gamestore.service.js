function GameStoreService(){
    const baseUrl = '/api/games';

    async function getGameList(page, limit = 5) {
        let url = `${baseUrl}?page=${page}&limit=${limit}`;
        return await fetch(url).then((res) => res.json());
    }

    async function getGame(id){
        return await fetch(`${baseUrl}/${id}`).then((res) => res.json());
    }

    return {
        getGameList,
        getGame,
    }
}

export default GameStoreService();