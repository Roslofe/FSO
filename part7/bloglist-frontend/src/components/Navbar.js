import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import blogService from '../services/blogs'
import { logOut } from '../reducers/userReducer'
import { updateNotif } from '../reducers/notifReducer'
import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'

const Nav = () => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)

  const handleLogout = (event) => {
    event.preventDefault()
    window.localStorage.clear()
    blogService.setToken(null)
    dispatch(logOut(user))
    dispatch(updateNotif({ msg: 'Logged out', isError: false }))
  }

  const padding = {
    padding: 10,
  }

  return (
    <div>
      <Navbar sticky="top" variant="dark" bg="dark">
        <Container className="justify-content-space-between">
          <div>
            <Link style={padding} to="/">
              Blogs
            </Link>
            <Link style={padding} to="/users">
              Users
            </Link>
          </div>
          <div>
            <Navbar.Text style={padding}>{user.name} logged in</Navbar.Text>
            <Button onClick={handleLogout}>Logout</Button>
          </div>
        </Container>
      </Navbar>
    </div>
  )
}

export default Nav
