import { useState, useImperativeHandle, forwardRef } from 'react'
import Button from 'react-bootstrap/Button'

const Togglable = forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  useImperativeHandle(ref, () => {
    return {
      toggleVisibility,
    }
  })

  return (
    <div>
      <div style={hideWhenVisible}>
        <Button onClick={toggleVisibility}>{props.showLabel}</Button>
      </div>
      <div style={showWhenVisible}>
        {props.children}
        <Button variant="outline-primary" onClick={toggleVisibility}>
          {props.hideLabel}
        </Button>
      </div>
    </div>
  )
})

Togglable.displayName = 'Togglable'

export default Togglable
