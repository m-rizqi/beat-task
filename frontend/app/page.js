"use client";

import Navbar from "./components/navbar";
import ScheduleCard from "./components/scheduleCard";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar></Navbar>
      <div className="flex flex-col bg-white content-container">
            <div className='flex flex-col todo-bar p-4 mx-20 mt-8'>
                 <div className="flex flex-row mt-4 ml-10">

                  <div className="flex flex-col ">
                    <p className="mb-1 text-xl">Welcome back,</p>
                    <p className="font-bold text-3xl mb-4">Aditya Pramudya!</p>
                    <p className="text-xl">Schedule mu belum selesai, ayo cek schedule mu sekarang!</p>
                    <button className="button p-1.5 mt-5 mb-5 text-white hover:bg-white hover:text-black">
                      <a href="/schedule">
                        check schedule
                      </a>
                    </button>
                  </div>

                  <div>
                    <img src="/assets/study.png" className="img-study"></img>
                  </div>

                 </div>
            </div>
            <div className="text-xl font-bold ml-64 mt-8">
              To Do
            </div>
            <div className="todo-bar mt-4 p-4">
              TEST
            </div>
            <div className="todo-bar mt-4 p-4">
              TEST
            </div>
            <div className="text-xl font-bold ml-64 mt-8">
              Deadline
            </div>
            <div className="todo-bar mt-4 p-4">
              <ol> 
                <li>1. Tugas 1</li> 
                <li>2. Tugas 2</li> 
                <li>3. Tugas 3</li>
              </ol>
            </div>
      </div>

    </div>
    
  );
}
