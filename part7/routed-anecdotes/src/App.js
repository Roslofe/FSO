import { useState, useEffect } from 'react'
import { Routes, Route, Link, useMatch, useNavigate } from 'react-router-dom'
import { useField } from './hooks'

const Menu = () => {
  const padding = {
    paddingRight: 5
  }
  return (
    <div>
      <Link style={padding} to='/'>anecdotes</Link>
      <Link style={padding} to='/create'>create new</Link>
      <Link style={padding} to='/about'>about</Link>
    </div>
  )
}

const Notification = ({ notif }) => {
  if (notif === '') {
    return null
  } else {
    return(
      <p>{notif}</p>
    )
  }
}

const AnecdoteList = ({ anecdotes, notif }) => (
  <div>
    <Notification notif={notif} />
    <h2>Anecdotes</h2>
    <ul>
      {anecdotes.map(anecdote => 
        <li key={anecdote.id} >
          <Link to={`/anecdotes/${anecdote.id}`}>{anecdote.content}</Link>
        </li>
      )}
    </ul>
  </div>
)

const About = () => (
  <div>
    <h2>About anecdote app</h2>
    <p>According to Wikipedia:</p>

    <em>An anecdote is a brief, revealing account of an individual person or an incident.
      Occasionally humorous, anecdotes differ from jokes because their primary purpose is not simply to provoke laughter but to reveal a truth more general than the brief tale itself,
      such as to characterize a person by delineating a specific quirk or trait, to communicate an abstract idea about a person, place, or thing through the concrete details of a short narrative.
      An anecdote is "a story with a point."</em>

    <p>Software engineering is full of excellent anecdotes, at this app you can find the best and add more.</p>
  </div>
)

const Footer = () => (
  <div>
    Anecdote app for <a href='https://fullstackopen.com/'>Full Stack Open</a>.

    See <a href='https://github.com/fullstack-hy2020/routed-anecdotes/blob/master/src/App.js'>https://github.com/fullstack-hy2020/routed-anecdotes/blob/master/src/App.js</a> for the source code.
  </div>
)

const CreateNew = (props) => {
  const content = useField('text')
  const author = useField('text')
  const info = useField('text')
  const navigate = useNavigate()


  const handleSubmit = (e) => {
    e.preventDefault()
    props.addNew({
      content: content.formValues.value,
      author: author.formValues.value,
      info: info.formValues.value,
      votes: 0
    })
    props.setNotification(`a new anecdote ${content.formValues.value} added!`)
    navigate('/')
  }

  const handleReset = (event) => {
    event.preventDefault()
    content.reset()
    author.reset()
    info.reset()
  }

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input {...content.formValues} />
        </div>
        <div>
          author
          <input  {...author.formValues} />
        </div>
        <div>
          url for more info
          <input {...info.formValues} />
        </div>
        <button type='submit'>create</button>
        <button onClick={handleReset}>reset</button>
      </form>
    </div>
  )

}

const Anecdote = ({ anecdote, vote }) => {
  return (
    <div>
      <h2>{anecdote.content} by {anecdote.author}</h2>
      <>
        <span>has {anecdote.votes} votes</span>
        <button onClick={() => vote(anecdote.id)}>vote</button>
      </>
      <p>for more information, see <a href={anecdote.info}>{anecdote.info}</a></p>
    </div>
  )
}

const App = () => {
  const [anecdotes, setAnecdotes] = useState([
    {
      content: 'If it hurts, do it more often',
      author: 'Jez Humble',
      info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
      votes: 0,
      id: 1
    },
    {
      content: 'Premature optimization is the root of all evil',
      author: 'Donald Knuth',
      info: 'http://wiki.c2.com/?PrematureOptimization',
      votes: 0,
      id: 2
    }
  ])

  const [notification, setNotification] = useState('')

  useEffect(() => {
    if (notification !== '') {
      setTimeout(() => {
        setNotification('')
      }, 5000)
    }
  }, [notification])
  
  const addNew = (anecdote) => {
    anecdote.id = Math.round(Math.random() * 10000)
    setAnecdotes(anecdotes.concat(anecdote))
  }

  const anecdoteById = (id) =>
    anecdotes.find(a => a.id === id)
  
  const match = useMatch('/anecdotes/:id')
  const anecdote = match ? anecdoteById(Number(match.params.id)) : null

  const vote = (id) => {
    const anecdote = anecdoteById(id)

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    }

    setAnecdotes(anecdotes.map(a => a.id === id ? voted : a))
  }

  return (
    <div>
      <header>
        <h1>Software anecdotes</h1>
      </header>
      <Menu />
      <Routes>
        <Route path='/' element={<AnecdoteList anecdotes={anecdotes} notif={notification}/>} />
        <Route path='/create' element={<CreateNew addNew={addNew} setNotification={setNotification}/>} />
        <Route path='/about' element={<About />} />
        <Route path='/anecdotes/:id' element={<Anecdote anecdote={anecdote} vote={vote}/>} />
      </Routes>
      <footer>
        <Footer />  
      </footer>
    </div>
  )
}

export default App
