'use client';

import { useState, useEffect } from 'react';
import Navbar from '../components/navbar';
//import {useGetUser} from "@/hooks/useCookies";

const Profile = () => {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    loadProfile();
  }, []);

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

  const getCookie = (name) => {
    if (typeof window !== 'undefined') {
      const cookieValue = document.cookie.match(
        '(^|[^;]+)\\s*' + name + '\\s*=\\s*([^;]+)'
      );
      return cookieValue ? cookieValue.pop() : '';
    }
  };

  const token = getCookie('token');

  const loadProfile = async () => {
    try {
      const res = await fetch(`http://localhost:4000/api/users/`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      if (res.status === 401) throw new Error(res.body);
      const data = await res.json();
      setProfile(data);
    } catch (err) {
      console.error(err);
      toast.error('Error while loading task');
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <div className="">
        <div className="flex py-5 justify-center bg-white">
          <div className="flex flex-col border-2 border-solid max-w-[45rem] w-6/12 p-8 rounded-xl shadow-lg bg-lightblue mt-8 mb-8 relative">
            <div className="flex flex-col items-center">
              <h1 className="text-3xl font-bold text-purple mb-6">
                User Profile
              </h1>
              <a href="">
                <img src="/assets/user.png" className="img-profile p-1 mb-6" />
              </a>
            </div>
            <div className="flex flex-col gap-4 ml-6">
              <div className="">
                <p className="text-gray">Name</p>
                <h1 className="pb-3 text-lg text-black font-medium uppercase">
                  {profile.name}
                </h1>
              </div>
              <div className="">
                <p className="text-gray">Username</p>
                <h1 className="pb-3 text-lg text-black font-medium">
                  {profile.username}
                </h1>
              </div>
              <div className="">
                <p className="text-gray">Email</p>
                <h1 className="pb-3 text-lg text-black font-medium">
                  {profile.email}
                </h1>
              </div>
              <button className="bg-darkgreen text-white px-4 py-2 rounded-lg absolute bottom-0 right-0 m-6">
                Edit Profile
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
