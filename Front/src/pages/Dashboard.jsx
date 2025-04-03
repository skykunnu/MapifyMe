import instance from "../axiosConfig";
import { createPortal } from 'react-dom';
import { useEffect, useState } from "react";
import MapContent from "./MapContent.jsx";
import { ImCross } from "react-icons/im";



function Dashboard() {
  const [profile, setProfile] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedProfile, setSelectedProfile]=useState(null);

  async function allProfile() {
    try{

        const response = await instance.get("/fetch");
        console.log(response.data.profiles);
        setProfile(response.data.profiles);
    }catch(error){
        console.error("Erorr fetching profiles:",error);
    }
  }

  useEffect(() => {
    allProfile();
}, []);

function handleOpenModal(user){
    setSelectedProfile(user);
    setShowModal(true)
}

async function handleDelete(Userid){
 await instance.delete(`/deleteProfile/${Userid}`)
 allProfile()
}

return (
    <div className="flex items-center justify-center gap-10 flex-wrap mt-4">
        {showModal &&
          createPortal(
            <MapContent profile={selectedProfile} onclose={() => setShowModal(false)} />,
            document.body
          )}
      {profile.length > 0 &&
        profile.map((user) => (
          <div key={user._id} className="h-[15rem] w-[20%] border rounded-md text-center relative">
            <ImCross className='absolute right-[-10px] top-[-10px] bg-red-700 text-white p-1 text-xl rounded-full' onClick={()=>handleDelete(user._id)}/>
            <h2 className="my-3">{user.name}</h2>
            <img
              src={user.photo}
              alt=""
              className="h-[5rem] w-[5rem] rounded-full mx-auto"
            />
            <p className="mt-4">{user.description}</p>
            <button
              onClick={() => handleOpenModal(user)}
              className="bg-blue-400 rounded px-4 py-2 mt-4"
            >
              Summary
            </button>
          </div>
        ))}
    </div>
  );
}

export default Dashboard;
