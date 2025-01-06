import { voteAnecdote } from '../reducers/anecdoteReducer'
import { useSelector, useDispatch } from "react-redux"
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
  const anecdotes = useSelector(({ anecdotes, filter }) => {
    return anecdotes.filter(anecdote => 
      anecdote.content.toLowerCase().includes(filter)
    )
  })

  const dispatch = useDispatch()

  const vote = (id) => {
    const anecdote = anecdotes.find(anecdote => anecdote.id === id)
    console.log('vote', id)
    dispatch(voteAnecdote(id))
    dispatch(setNotification(`you voted '${anecdote.content}'`, 5))
  }

  return (
    <div>
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default AnecdoteList