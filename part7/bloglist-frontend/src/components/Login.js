import { useState } from 'react'
import { useDispatch } from 'react-redux'
import Notification from './Notification'
import loginService from '../services/login'
import blogService from '../services/blogs'
import { logIn } from '../reducers/userReducer'
import { updateNotif } from '../reducers/notifReducer'

const Login = () => {
  const dispatch = useDispatch()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async (event) => {
    event.preventDefault()
    console.log('Attempting login', username, password)
    try {
      const newUser = await loginService.login({ username, password })
      console.log('got user')
      window.localStorage.setItem('bloglistUser', JSON.stringify(newUser))
      blogService.setToken(newUser.token)
      setUsername('')
      setPassword('')
      dispatch(logIn(newUser))
      dispatch(updateNotif({ msg: 'login successful', isError: false }))
    } catch (exception) {
      dispatch(
        updateNotif({ msg: 'wrong username or password', isError: true })
      )
    }
  }

  return (
    <div>
      <h1>Log into application</h1>
      <Notification />
      <form onSubmit={handleLogin}>
        <div>
          username
          <input
            type="text"
            id="Username"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
          <input
            type="password"
            id="Password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button id="login" type="submit">
          login
        </button>
      </form>
    </div>
  )
}

export default Login
