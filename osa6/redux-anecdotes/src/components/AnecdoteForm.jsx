import { useDispatch } from "react-redux"
import { addAnecdote } from "../reducers/anecdoteReducer"
import { setNotification } from '../reducers/notificationReducer'

const NewAnecdote = () => {
  const dispatch = useDispatch()

  const createAnecdote = async  (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''

    dispatch(addAnecdote(content))
    dispatch(setNotification(`you created '${content}'`, 5))
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={createAnecdote}>
        <div><input name="anecdote"/></div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default NewAnecdote