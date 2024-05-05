"use client";

import {FiEye, FiEyeOff} from "react-icons/fi";
import {useState} from "react";
import Link from "next/link";
import Head from "next/head";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import {useLogin} from "@/hooks/useCookies";

// async function handleLogin(body) {
//   try {
//     const res = await fetch(
//       `${process.env.NEXT_PUBLIC_RB_REST_API_URL}/api/auth/`,
//       {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(body),
//       }
//     );
//     if (res.status === 403) return false;
//     const data = await res.json();
//     console.log(data);
//     // eslint-disable-next-line react-hooks/rules-of-hooks
//     useLogin({...data, username: body.username});
//   } catch (err) {
//     console.error(err);
//   }
// }

export default function UserLogin() {
  const [userInfo, setUserInfo] = useState({
    username: "",
    password: "",
  });
  const {username, password} = userInfo;
  const [isPasswordHidden, setIsPasswordHidden] = useState(true);
  const handleChange = ({target}) => {
    const {name, value} = target;
    setUserInfo({...userInfo, [name]: value});
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(
        `http://localhost:3000/api/auth/signin`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userInfo),
        }
      );
      if (res.status === 401) throw new Error('Invalid username or password');
      const data = await res.json();
      console.log(data);
      document.cookie = `token=${data.token}; path=/`;
      window.location.href = '/';
    } catch (err) {
      console.error(err);
      toast.error('Invalid username or password');
    }
  };
  return (
    <div className="flex items-center justify-center min-h-screen bg-reg-bg bg-cover">
      <Head>
        <title>Rental Bahari | Login</title>
      </Head>

      <main className="flex items-center justify-center flex-1 text-center">
        <div className="flex flex-col md:flex-row bg-white rounded-2xl shadow-2xl w-11/12">
          {/* logo section */}
          <div className="flex p-5 bg-purple text-white rounded-tl-2xl rounded-tr-2xl md:rounded-bl-2xl md:rounded-tr-none flex-col items-center justify-center md:w-1/2">
            <img
              src="/assets/logo.png"
              className="img-logo1 mb-6"
              alt="Logo"
            />
            <div className="py-2">
              <h2 className="text-3xl font-bold mb-7">Beat Task!</h2>
            </div>
            <p className="px-11 text-sm leading-6 text-white">
            Beat Task is an intuitive task scheduler application designed to 
            help you efficiently manage your time and conquer your daily tasks with ease.
            Stay organized, focused, and ahead of your schedule with Beat Task!
            </p>
          </div>

          {/* login */}
          <div className="px-24 md:w-1/2">
            <div className="py-2">
              <h2 className="text-3xl text-purple font-bold mt-11 mb-3">Welcome back!</h2>
            </div>
            <p className="text-gray-400 mb-10">login into your account</p>
            <form
              onSubmit={handleSubmit}
              className="flex flex-col lg:px-5 xl:px-16"
            >
              <div className="flex flex-col gap-8">
                <div className="flex flex-col gap-2">
                  <label className="font-semibold text-left">Username</label>
                  <div>
                    <input
                      type="username"
                      onChange={handleChange}
                      value={username}
                      name="username"
                      label="Username"
                      className="border-2 border-main-black/20 focus:border-dark-green-1 focus:outline-none rounded-2xl px-6 py-3 w-full bg-gray-100"
                      placeholder="Enter username"
                      required
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <label className="font-semibold text-left">Password</label>
                  <div className="relative">
                    <input
                      onChange={handleChange}
                      value={password}
                      name="password"
                      label="Password"
                      type={isPasswordHidden ? "password" : "show"}
                      placeholder="Enter password"
                      className="border-2 border-main-black/20 focus:border-dark-green-1 focus:outline-none rounded-2xl px-6 py-3 w-full bg-gray-100"
                      required
                    />
                    <div className="inset-y-0 pr-5 absolute right-0 flex items-center">
                      {isPasswordHidden ? (
                        <FiEyeOff
                          size={20}
                          onClick={() => setIsPasswordHidden(!isPasswordHidden)}
                        />
                      ) : (
                        <FiEye
                          size={20}
                          onClick={() => setIsPasswordHidden(!isPasswordHidden)}
                        />
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <button
                  type="submit"
                  className="bg-purple w-1/2 py-2 rounded-3xl text-white font-semibold mt-12"
                >
                  Login
                </button>
              </div>
              <div className="flex items-center justify-center text-xs mb-16 mt-3">
                <span>Don&apos;t have an account?&nbsp;</span>
                <Link href="/register" className="underline">
                  Sign up
                </Link>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}
