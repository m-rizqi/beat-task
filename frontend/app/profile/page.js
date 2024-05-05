"use client"

import {useState, useEffect} from "react";
import Navbar from "../components/navbar";
//import {useGetUser} from "@/hooks/useCookies";

const Profile = () => {
    const [profile, setProfile] = useState(null);
    
    // const getProfileData = async () => {
    //     // eslint-disable-next-line react-hooks/rules-of-hooks
    //     let name = await useGetUser();
    //     name = await name?name.value:"fajar";
    //     console.log(name)

    //     try {
    //     const res = await fetch(`https://rentalbahari.vercel.app/api/assurance/user/${name}`);
    //     const data = await res.json();
    //     console.log(data)
    //     setProfile(data);    
    //     } catch (err) {
    //     console.error(err);
    //     }
    // };

    // useEffect(() => {
    //     getProfileData();
    // }, []);


    return (
        <div className="min-h-screen bg-white">
            <Navbar />
            <div className="">
                <div className="flex py-5 justify-center bg-white">
                    <div className="flex flex-col border-2 border-solid max-w-[45rem] w-6/12 p-8 rounded-xl shadow-lg bg-lightblue mt-8 mb-8 relative">
                        <div className="flex flex-col items-center">
                            <h1 className="text-3xl font-bold text-purple mb-6">User Profile</h1>
                            <a href="">
                                <img
                                    src="/assets/profile.png"
                                    className="img-profile p-1 mb-6"
                                />
                            </a>
                        </div>
                        <div className="flex flex-col gap-4 ml-6">
                            <div className="">
                                <h1 className="pb-3 text-lg text-gray font-medium">Name</h1>
                            </div>
                            <div className="">
                                <h1 className="pb-3 text-lg text-gray font-medium">Username</h1>
                            </div>
                            <div className="">
                                <h1 className="pb-3 text-lg text-gray font-medium">Email</h1>
                            </div>
                            <div className="">
                                <h1 className="pb-3 text-lg text-gray font-medium mb-10">Phone Number</h1>
                            </div>
                            <button 
                            className="bg-darkgreen text-white px-4 py-2 rounded-lg absolute bottom-0 right-0 m-6">Edit Profile
                            </button>
                        </div>
                        
                    </div>
                </div>
            </div>
        </div>

    );
}

export default Profile;