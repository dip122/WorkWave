import React from 'react'
import { useNavigate } from 'react-router-dom'

const UserCard = ({profiles}) => {

  const navigate = useNavigate();
  return (
    <div className="reviews-container w-full mb-2 border-b border-gray-400 border-t border-gray-400 py-10 flex flex-col gap-y-8">
        {(profiles && profiles.length > 0) ? (
          profiles.map((profile, index) => (
            <div className="review lg:w-3/4 sm:4/5 mx-auto py-6 px-8 border rounded-lg shadow-sm bg-white cursor-pointer" key={index} onClick={()=>navigate(`/profile/${profile?._id}`)}>
              <div className="flex mb-2 gap-y-4 flex-col">

                <div className = "flex flex-row gap-x-5">
                    <img className = "h-12 w-12 rounded-full" src = {profile?.profile_pic?.url} alt="images"/>
                    <div className="name-class text-2xl font-semibold text-gray-800">{profile?.name}</div>
                </div>
                <div className = "text-xl font-semibold text-gray-800">Email : {profile?.email}</div>
                <div className = "text-xl font-semibold text-gray-800">Contact : {profile?.contact}</div>
              </div>
            </div>
          ))
        ) : (
          <div className="w-3/4 mx-auto text-center text-gray-500">No reviews yet.</div>
        )}
      </div>
  )
}

export default UserCard