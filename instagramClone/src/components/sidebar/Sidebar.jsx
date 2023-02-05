import React from 'react'
import useUser from '../../hooks/useUser'
import {User} from '../index.js'

const Sidebar = () => {
  const {user:{
    fullName,username,userId
  }} = useUser()
  console.log('user',user)
  return (
		<div className="p-4">
			<User username={username} fullName={fullName} />
			{/* <Suggestions
				userId={userId}
				following={following}
				loggedInUserDocId={docId}
			/> */}
		</div>
	);
}

export default Sidebar