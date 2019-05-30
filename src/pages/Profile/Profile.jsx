import React from 'react'

const Profile = props => {
  return (
      <div>
        <div class="container">
          <div>{ props.displayName }</div>
          <div>{ firebase.database().ref('users/', + firebaseUser.photoURL) }</div>
          <div>{  }</div>
        </div>
      </div>
  )
}

export default Profile
