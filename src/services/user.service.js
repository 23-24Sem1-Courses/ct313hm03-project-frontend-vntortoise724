function UserService(){
    const baseUrl = '/api/users';
    const headers = {
        'Content-Type': 'appication/json',
    };

    async function createUser(user){
        return await fetch (`${baseUrl}`,{
            method: 'POST',
            headers,
            body: JSON.stringify(user),
        }).then((res) => res.json());
    }

    async function getManyUser(page, limit = 5){
        let url = `${baseUrl}?page=${page}&limit=${limit}`;
        return await fetch(url).then((res) => res.json());
    }

    async function getUser (id){
        return await fetch(`${baseUrl}/${id}`).then((res) => res.json());
    }

    async function updateUser(id, user){
        return await fetch(`${baseUrl}/${id}`, {
            method: 'PUT',
            headers,
            body: JSON.stringify(user),
        }).then((res) => res.json());
    }

    return {
        createUser,
        getUser,
        getManyUser,
        updateUser,
    };
}

export default UserService();