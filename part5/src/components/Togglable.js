/* eslint-disable react/jsx-closing-tag-location */
import React, { useState, useImperativeHandle, forwardRef } from 'react'
import PropTypes from 'prop-types'

const Togglable = forwardRef(({ children, titleButton }, ref) => {
  const [toggled, setToggled] = useState(false)
  const toggleChild = () => setToggled(!toggled)

  useImperativeHandle(ref, () => {
    return {
      toggleChild
    }
  })

  return (
    <div>
      {toggled
        ? <>
          {children}
          <button onClick={toggleChild}>
            Cancel
          </button>
        </>
        : <button onClick={toggleChild}>
          {titleButton}
        </button>}
    </div>
  )
})

Togglable.propTypes = {
  children: PropTypes.element.isRequired,
  titleButton: PropTypes.string.isRequired
}

export default Togglable
