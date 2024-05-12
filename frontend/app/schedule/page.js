"use client";

import Navbar from "../components/navbar";
import Modal from "../components/modal";
import ScheduleCard from "../components/scheduleCard";
import { useState } from "react";

export default function Home() {
  const [showModal, setShowModal] = useState(false);
  const [taskName, setTaskName] = useState('');
  const [description, setDescription] = useState('');
  const [difficulty, setDifficulty] = useState(1);
  const [priority, setPriority] = useState(1);
  const [deadline, setDeadline] = useState('');
  const handleSubmit = (e) => {
    e.preventDefault();
    // Lakukan sesuatu dengan data yang diinput
    console.log('Data Task:', {
      taskName,
      description,
      difficulty,
      priority,
      deadline
    });
    // Lakukan pengiriman data ke server atau penanganan lainnya di sini
  };

  return (
    <div className="bg-white">
      <Navbar></Navbar>
      {/* <button className="bg-purple text-white p-2" onClick={() => setShowModal(true)}>
        Modal
      </button> */}
      <Modal isVisible={showModal} onClose={() => setShowModal(false)}>
        <div className="flex flex-col">
            <form onSubmit={handleSubmit} className="form gap-4 m-4">
              <div className="form-group">
                <input
                  type="text"
                  placeholder="Enter Task Name"
                  value={taskName}
                  className="text-xl font-semibold"
                  onChange={(e) => setTaskName(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>Description</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Enter description"
                  className="w-9/12 p-2 border rounded text-gray text-sm"
                />
              </div>
              <div className="form-group">
                <label>Difficulty</label>
                <select value={difficulty} 
                onChange={(e) => setDifficulty(e.target.value)}
                className="bg-lightblue px-5 py-1 rounded-md">
                  <option value="">Select</option>
                  {Array.from({ length: 10 }, (_, i) => (
                    <option key={i + 1} value={i + 1}>{i + 1}</option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label>Priority</label>
                <select value={priority} 
                onChange={(e) => setPriority(e.target.value)}
                className="bg-lightblue px-5 py-1 rounded-md">
                  <option value="">Select</option>
                  {Array.from({ length: 10 }, (_, i) => (
                    <option key={i + 1} value={i + 1}>{i + 1}</option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label>Deadline</label>
                <input
                  type="date"
                  value={deadline}
                  onChange={(e) => setDeadline(e.target.value)}
                  className="bg-lightblue px-5 py-1 rounded-md"
                />
              </div>
              <div className="flex flex-row text-sm justify-end">
                <button type="submit"
              className="bg-darkeryellow text-white mr-1.5 px-3 py-1 rounded-lg">Cancel</button>
              <button onClick={() => onClose()}
              className="bg-darkgreen text-white px-4 py-1 rounded-lg">Add</button>
              </div>
              
            </form>
          {/* <div>
            nama tugas
          </div>
          <div className="flex flex-row">
            s
          </div> */}
        </div>
      </Modal>
      <div className="flex flex-row mt-3">
        <img
          src="/assets/schedule1.png"
          className="img-schedule p-3 ml-8"
        />
        <div className="mt-3 text-purple text-lg font-semibold">
          Schedule
        </div>
      </div>
      <div className="line"></div>
      <div className="flex justify-center gap-14 mt-2" > 
        <button className="open-button w-20">All</button>
        <button className="close-button hover:font-bold hover:text-black">
            <a href="/schedule/task">
                Task
            </a>
        </button>
        <button className="close-button hover:font-bold hover:text-black">
          <a href="/schedule/activity">
            Activity
          </a>
        </button>
      </div>
      <div className="flex flex-row justify-center gap-10 mt-5">
        <div>
          <div className="bg-yellow px-36 py-1 font-bold mb-3">To Do</div>
          <ScheduleCard> Lorem ipsum dolor sit amet, consectetur adipiscing elit.</ScheduleCard>
        </div>
        <div>
          <div className="bg-yellow px-36 py-1 font-bold mb-3">In Progress</div>
          <ScheduleCard> Lorem ipsum dolor sit amet, consectetur adipiscing elit.</ScheduleCard>
        </div>
        <div>
          <div className="bg-yellow px-36 py-1 font-bold mb-3">Done</div>
          <ScheduleCard> Lorem ipsum dolor sit amet, consectetur adipiscing elit.</ScheduleCard>
        </div>
      </div>
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
      
      </main>
    </div>
    
  );
}