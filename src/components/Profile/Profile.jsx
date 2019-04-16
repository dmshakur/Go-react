import React from 'react'
import styles from './Profile.module.css'

const Profile = props => {
  return (
    <div className={styles.profile}>
      <div></div> {/* Profile Picture*/}
      <h2>{props.user}</h2>   {/* Name of user*/}
      <div>Wins: 0 Losses: 0</div> {/* Win and loss record, leaderboard position*/}
    </div>
  )
}

export default Profile
