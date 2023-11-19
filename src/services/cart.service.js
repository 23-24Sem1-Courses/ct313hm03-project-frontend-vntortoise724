function CartService(){
    const baseUrl = '/api/cart';
    const headers = {
        'Content-Type': 'application/json',
    }

    async function getCart(page, limit = 5) {
        let url = `${baseUrl}?page=${page}&limit=${limit}`;
        return await fetch(url).then((res) => res.json());
    }

    async function getGame(id){
        return await fetch(`${baseUrl}/${id}`).then((res) => res.json());
    }

    async function addToCart(game){
        return await fetch(`${baseUrl}`, {
            method: 'POST',
            headers,
            body: JSON.stringify(game),
        }).then((res) => res.json());
    }

    async function removefromCart(id){
        return await fetch(`${baseUrl}/${id}`, {
            method: 'DELETE'
        }).then((res) => res.json());
    }

    async function removeAllfromCart(){
        return await fetch(baseUrl, {
            method: 'DELETE',
        }).then((res) => res.json());
    }

    return {
        getCart,
        getGame,
        addToCart,
        removefromCart,
        removeAllfromCart,
    }
}

export default CartService();