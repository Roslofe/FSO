import { useState } from 'react'
import { useDispatch } from 'react-redux'
import Notification from './Notification'
import loginService from '../services/login'
import blogService from '../services/blogs'
import { logIn } from '../reducers/userReducer'
import { updateNotif } from '../reducers/notifReducer'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import FloatingLabel from 'react-bootstrap/FloatingLabel'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
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
      dispatch(updateNotif({ msg: 'Login successful', isError: false }))
      navigate('/')
    } catch (exception) {
      dispatch(
        updateNotif({ msg: 'Wrong username or password', isError: true })
      )
    }
  }

  return (
    <div className="container">
      <h1>Log into application</h1>
      <Notification />
      <Form onSubmit={handleLogin}>
        <FloatingLabel label="Username" className="mb-3">
          <Form.Control
            type="text"
            id="Username"
            value={username}
            name="Username"
            placeholder="Insert username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </FloatingLabel>
        <FloatingLabel label="Password" className="mb-3">
          <Form.Control
            type="password"
            id="Password"
            value={password}
            name="Password"
            placeholder="Insert password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </FloatingLabel>
        <Button id="login" type="submit">
          Login
        </Button>
      </Form>
    </div>
  )
}

export default Login
