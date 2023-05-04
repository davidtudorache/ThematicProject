const createMatch = (data) => {
    return fetch("http://localhost:3333/match", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "X-Authorization": localStorage.getItem("session_token")
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

const updateMatch = (match_id, data) => {
    return fetch("http://localhost:3333/match/" + match_id, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            "X-Authorization": localStorage.getItem("session_token")
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

const getAllMatches = (tournament_id) => {
    return fetch("http://localhost:3333/tournament/" + tournament_id + "/comments")
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

const getOneMatch = (match_id) => {
    return fetch("http://localhost:3333/match/" + match_id)
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

export const articleService = {
    createMatch,
    updateMatch,
    getAllMatches,
    getOneMatch
}