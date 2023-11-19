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

    async function getUser (user_id){
        return await fetch(`${baseUrl}/${user_id}`).then((res) => res.json());
    }

    async function updateUser(user_id, user){
        return await fetch(`${baseUrl}/${user_id}`, {
            method: 'PUT',
            headers,
            body: JSON.stringify(user),
        }).then((res) => res.json());
    }

    return {
        createUser,
        getUser,
        updateUser,
    };
}

export default UserService();