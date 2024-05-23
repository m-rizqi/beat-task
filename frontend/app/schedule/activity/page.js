"use client";

import Navbar from "../../components/navbar";
import Modal from "../../components/modal";
import ScheduleCard from "../../components/scheduleCard";
//import HomeCard from "../components/homeCard";
import { useState } from "react";

export default function Home() {
  const [showModal, setShowModal] = useState(false);
  const [activityName, setActivityName] = useState('');
  const [description, setDescription] = useState('');
  const [organization, setOrganization] = useState('Select');
  const [difficulty, setDifficulty] = useState('Select');
  const [priority, setPriority] = useState('Select');
  const [deadline, setDeadline] = useState('');
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Lakukan sesuatu dengan data yang diinput
    console.log('Data Task:', {
      activityName,
      description,
      difficulty,
      priority,
      deadline
    });

    const newActivity = {
      _id: '663796baf93bcab75d8916ea',
      activity: {
        "activityName": "Morning Run",
        "activityStart": "2024-05-12T06:00:00Z",
        "activityEnd": "2024-05-12T07:00:00Z",
        "repeatVar": "weekly",
        "repeatInterval": 1
      }
    }
    // Lakukan pengiriman data ke server atau penanganan lainnya di sini
    try {
      const res = await fetch(`http://localhost:4000//api/activities`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newActivity),
      });
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
    <div className="bg-white content-container">
      <Navbar></Navbar>
      <Modal isVisible={showModal} onClose={() => setShowModal(false)}>
        <div className="flex flex-col">
            <form onSubmit={handleSubmit} className="form gap-6 m-4">
              <div className="form-group">
                <input
                  type="text"
                  placeholder="Enter Task Name"
                  value={taskName}
                  className="text-2xl font-semibold"
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
                <label>Organization</label>
                <select value={organization} 
                onChange={(e) => setOrganization(e.target.value)}
                className="bg-lightblue px-5 py-2 rounded-md">
                  <option value="">Select</option>
                  {Array.from({ length: 10 }, (_, i) => (
                    <option key={i + 1} value={i + 1}>{i + 1}</option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label>Difficulty</label>
                <select value={difficulty} 
                onChange={(e) => setDifficulty(e.target.value)}
                className="bg-lightblue px-5 py-2 rounded-md">
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
                className="bg-lightblue px-5 py-2 rounded-md">
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
                  className="bg-lightblue px-5 py-2 rounded-md"
                />
              </div>
              <div className="flex flex-row text-sm justify-end">
                <button type="submit"
              className="bg-darkeryellow text-white font-semibold mr-2.5 px-4 py-2 rounded-lg">Cancel</button>
              <button onClick={() => onClose()}
              className="bg-darkgreen text-white font-semibold px-6 py-2 rounded-lg">Add</button>
              </div>
              
            </form>
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
        <button className="close-button hover:font-bold hover:text-black">
            <a href="/schedule">
                All
            </a>
        </button>
        <button className="close-button hover:font-bold hover:text-black">
            <a href="/schedule/task">
                Task
            </a>
        </button>
        <button className="open-button">Activity</button>
      </div>
      <div className="flex flex-row justify-center gap-10 mt-7">
        <div>
          <div className="flex flex-row px-6 py-2.5 bg-yellow mb-3">
            <p className="font-bold">To Do</p>
            <p className="text-schedbar text-sm">1 of 1</p>
          </div>
          <ScheduleCard>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</ScheduleCard>
          <button className="text-lg font-medium text-lightgray p-3 mt-3 hover:font-bold hover:text-zinc-600" onClick={() => setShowModal(true)}>+ Add Activity</button>
        </div>
        <div>
          <div className="flex flex-row px-6 py-2.5 bg-yellow mb-3">
            <p className="font-bold">In Progress</p>
            <p className="text-schedbar text-sm">1 of 1</p>
          </div>
          <ScheduleCard> Lorem ipsum dolor sit amet, consectetur adipiscing elit.</ScheduleCard>
        </div>
        <div>
          <div className="flex flex-row px-6 py-2.5 bg-yellow mb-3">
            <p className="font-bold">Done</p>
            <p className="text-schedbar text-sm">1 of 1</p>
          </div>
          <ScheduleCard> Lorem ipsum dolor sit amet, consectetur adipiscing elit.</ScheduleCard>
        </div>
      </div>
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
      
      </main>
    </div>
    
  );
}