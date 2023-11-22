function GameUserService(){
    const baseUrl = '/api/games/users'

    async function getUser(id){
        return await fetch(`${baseUrl}/${id}`).then((res) => res.json());
    }

    return {
        getUser,
    }
}

export default GameUserService();