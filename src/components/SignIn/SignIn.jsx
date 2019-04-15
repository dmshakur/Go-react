import React from 'react'

const SignIn = props => {
  return (
    <div>
      <h1>Sign In with Google</h1>
        <button onClick={props.handleLogin}>Sign In</button>
    </div>
  )
}

export default SignIn
