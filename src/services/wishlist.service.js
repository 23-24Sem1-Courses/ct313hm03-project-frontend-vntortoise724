function Wishlist(){
    const baseUrl = '/api/wishlist';
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

    async function addToWishList(game){
        return await fetch(`${baseUrl}`, {
            method: 'POST',
            headers,
            body: JSON.stringify(game),
        })
    }

    return {
        getWishlist,
        getGame,
    }
}

export default Wishlist();