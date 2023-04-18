import userService from '../services/users'
import { useEffect, useState } from 'react'

const Users = () => {
  const findUserData = async () => {
    const data = await userService.getAll()
    return data
  }

  const [users, setUsers] = useState([])

  useEffect(() => {
    findUserData().then((allUsers) => setUsers(allUsers))
  }, [])

  if (users.length === 0) {
    return null
  }

  return (
    <div>
      <h1>Users</h1>
      <table>
        <thead>
          <tr>
            <th></th>
            <th>blogs created</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u.id}>
              <td>{u.name}</td>
              <td>{u.blogs.length}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Users
