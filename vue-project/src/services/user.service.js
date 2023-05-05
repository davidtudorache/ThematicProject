const createUser = (data) => {
    return fetch("http://localhost:3333/users", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
    })
    .then((response) => {
        if(response.status === 201){
            return response.json();
        }else{
            throw "Something went wrong"
        }
    })
    .then((resJson) => {
        return resJson
    })
    .catch((error) => {
        console.log("Err", error)
        return Promise.reject(error)
    })
}

const getOneUser = (user_id) => {
    return fetch("http://localhost:3333/users/" + user_id)
    .then((response) => {
        if(response.status === 200){
            return response.json();
        }else{
            throw "Something went wrong"
        }
    })
    .then((resJson) => {
        return resJson
    })
    .catch((error) => {
        console.log("Err", error)
        return Promise.reject(error)
    })
}

const getAllUsers = () => {
    return fetch("http://localhost:3333/users", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        }
    })
    .then((response) => {
        if(response.status === 200){
            return response.json();
        }else{
            throw "Something went wrong"
        }
    })
    .then((resJson) => {
        return resJson
    })
    .catch((error) => {
        console.log("Err", error)
        return Promise.reject(error)
    })
}

const updateUser = (user_id, data) => {
    return fetch("http://localhost:3333/user/" + user_id, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
    })
    .then((response) => {
        if(response.status === 200){
            return response.json();
        }else{
            throw "Something went wrong"
        }
    })
    .then((resJson) => {
        return resJson
    })
    .catch((error) => {
        console.log("Err", error)
        return Promise.reject(error)
    })
}

const login = (data) => {
    return fetch("http://localhost:3333/login", {
        method: "post",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
    .then((response) => {
        if(response.status === 200){
            return response.json();
        }else if(response.status === 400){
            throw "Bad data was sent to the server";
        }else{
            alert(response.status)
            throw "Something went wrong";
        }
    })
    .then((resJson) => {
        return resJson
    })
    .catch((error) => {
        alert(error);
    })
}

const logout = () => {
    return fetch("http://localhost:3333/logout", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        }
    })
    .then((response) => {
        if(response.status === 200){
            return
        }else if(response.status === 401){
            throw "Not logged in"
        }else{
            throw "Something went wrong"
        }
    })
    .catch((error) => {
        alert(error)
    })
}

export const userService = {
    createUser,
    getOneUser,
    getAllUsers,
    updateUser,
    login,
    logout
}