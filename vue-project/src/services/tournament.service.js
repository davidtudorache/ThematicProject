const createTournament = (data) => {
    return fetch("http://localhost:3000/tournament", {
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

const getAllTournaments = () => {
    return fetch("http://localhost:3000/tournament")
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

const getOneTournament = (tournament_id) => {
    return fetch("http://localhost:3000/tournament/" + tournament_id)
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

const updateTournament = (tournament_id, data) => {
    return fetch("http://localhost:3000/tournament/" + tournament_id, {
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

const deleteTournament = (tournament_id) => {
    return fetch("http://localhost:3000/tournament/" + tournament_id, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        }
    })
    .then((response) => {
        if(response.status === 200){
            //return response.json();
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

export const tournamentService = {
    createTournament,
    getAllTournaments,
    getOneTournament,
    updateTournament,
    deleteTournament
}