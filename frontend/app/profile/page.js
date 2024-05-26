'use client';

import { useState, useEffect } from 'react';
import Navbar from '../components/navbar';

const Profile = () => {
  const [profile, setProfile] = useState('');
  const [isEdit, setIsEdit] = useState({
    name: '',
    username: '',
    email: '',
    status: false,
  });

  useEffect(() => {
    loadProfile();
  }, []);

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
      setIsEdit({ ...data, status: false });
    } catch (err) {
      console.error(err);
      toast.error('Error while loading task');
    }
  };

  const updateProfile = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`http://localhost:4000/api/users/`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: isEdit.name,
          username: isEdit.username,
          email: isEdit.email,
        }),
      });
      if (res.status === 401) throw new Error(res.body);
      const data = await res.json();
      setProfile(data);
      setIsEdit({ ...data, status: false });
    } catch (err) {
      console.error(err);
      toast.error('Error while updating profile');
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <div className="">
        <div className="flex py-5 justify-center bg-white">
          {!isEdit.status ? (
            <div className="flex flex-col border-2 border-solid max-w-[45rem] w-6/12 p-8 rounded-xl shadow-lg bg-lightblue mt-8 mb-8 relative">
              <div className="flex flex-col items-center">
                <h1 className="text-3xl font-bold text-purple mb-6">
                  User Profile
                </h1>
                <a href="">
                  <img
                    src="/assets/user.png"
                    className="img-profile p-1 mb-6"
                  />
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
                <button
                  onClick={() => setIsEdit({ ...isEdit, status: true })}
                  className="bg-darkgreen text-white px-4 py-2 rounded-lg absolute bottom-0 right-0 m-6"
                >
                  Edit Profile
                </button>
              </div>
            </div>
          ) : (
            <form className="flex flex-col border-2 border-solid max-w-[45rem] w-6/12 p-8 rounded-xl shadow-lg bg-lightblue mt-8 mb-8 relative">
              <div className="flex flex-col items-center">
                <h1 className="text-3xl font-bold text-purple mb-6">
                  User Profile
                </h1>
                <a href="">
                  <img
                    src="/assets/user.png"
                    className="img-profile p-1 mb-6"
                  />
                </a>
              </div>
              <div className="flex flex-col gap-4 ml-6">
                <div className="">
                  <p className="text-gray">Name</p>
                  <input
                    type="text"
                    value={isEdit.name}
                    onChange={(e) =>
                      setIsEdit({ ...isEdit, name: e.target.value })
                    }
                    className="px-1 rounded-lg text-lg text-black font-medium uppercase"
                  />
                </div>
                <div className="">
                  <p className="text-gray">Username</p>
                  <input
                    type="text"
                    value={isEdit.username}
                    onChange={(e) =>
                      setIsEdit({ ...isEdit, username: e.target.value })
                    }
                    className="px-1 rounded-lg text-lg text-black font-medium"
                  />
                </div>
                <div className="">
                  <p className="text-gray">Email</p>
                  <input
                    type="text"
                    value={isEdit.email}
                    onChange={(e) =>
                      setIsEdit({ ...isEdit, email: e.target.value })
                    }
                    className="px-1 rounded-lg text-lg text-black font-medium"
                  />
                </div>
                <button
                  onClick={() => setIsEdit({ ...isEdit, status: false })}
                  className="bg-darkeryellow text-white px-4 py-2 rounded-lg absolute bottom-0 right-0 m-6"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  onClick={updateProfile}
                  className="bg-darkgreen text-white px-4 py-2 rounded-lg absolute bottom-0 right-24 m-6"
                >
                  Save
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
