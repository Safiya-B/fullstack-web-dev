import axios from "axios"

const url = "http://localhost:3001/persons"

const create = newObj => {

    const req = axios.post(url, newObj)
    return req.then(res => res.data)

}

const deleteP = id => {
    const req = axios.delete(`${url}/${id}`)
    return req.then(res => res.data)
}

const update = (id, modifiedObj) => {
    const req = axios.put(`${url}/${id}`, modifiedObj)
    return req.then(res => res.data)
}


const personServ = {
    create,
    deleteP,
    update
}

export default personServ