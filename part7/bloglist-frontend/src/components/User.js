import ListGroup from 'react-bootstrap/ListGroup'

const User = ({ user }) => {
  if (!user) {
    return null
  }

  return (
    <div>
      <h1>{user.name}</h1>
      <h3>Added blogs</h3>
      <ListGroup as="ul">
        {user.blogs.map((b) => (
          <ListGroup.Item action as="li" key={b.id}>
            {b.title}
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  )
}

export default User
