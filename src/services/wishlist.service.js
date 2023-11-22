function Wishlist(){
    const baseUrl = '/api/users/wishlist';
    const headers = {
        'Content-Type': 'application/json',
    }

    async function getWishlist(page, limit = 5) {
        let url = `${baseUrl}?page=${page}&limit=${limit}`;
        return await fetch(url).then((res) => res.json());
    }

    async function getGame(id){
        return await fetch(`${baseUrl}/${id}`).then((res) => res.json());
    }

    async function addToWishList(game_id, user_id){
        return await fetch(`${baseUrl}`, {
            method: 'POST',
            headers,
            body: JSON.stringify(game_id).stringify(user_id),
        }).then((res) => res.json());
    }

    async function removefromWishList(id){
        return await fetch(`${baseUrl}/${id}`, {
            method: 'DELETE'
        }).then((res) => res.json());
    }

    return {
        getWishlist,
        getGame,
        addToWishList,
        removefromWishList,
    }
}

export default Wishlist();