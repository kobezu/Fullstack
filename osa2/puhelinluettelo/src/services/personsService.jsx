import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'

const getAll = () => {
  return (
    axios
      .get(baseUrl)
      .then(response => {return response.data}))
}

const create = (personObject) => {
  return (
    axios
      .post(baseUrl, personObject)
      .then(response => {return response.data})
  )
}

const changeNumber = (person, newNumber) => {
  const changedPerson = {...person, number: newNumber}
  return (axios
    .put(`${baseUrl}/${person.id}`, changedPerson)
    .then(response => {return response.data}))
}

const remove = (id) => {
  return (axios
    .delete(`${baseUrl}/${id}`)
    .then(() => {
      console.log(`deleted person with id "${id}"`)
      return getAll()
    })
  )
}

export default {getAll, create, changeNumber, remove}