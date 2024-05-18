'use client';

import Navbar from '../../components/navbar';
import Modal from '../../components/modal';
import ScheduleCard from '../../components/scheduleCard';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
//import HomeCard from "../components/homeCard";
import { useState, useEffect } from 'react';

export default function Home() {
  const [showModal, setShowModal] = useState(false);
  const [taskName, setTaskName] = useState('');
  const [description, setDescription] = useState('');
  const [difficulty, setDifficulty] = useState('Select');
  const [priority, setPriority] = useState('Select');
  const [deadline, setDeadline] = useState('');
  const [todo, setTodo] = useState([]);
  const [progress, setProgress] = useState([]);
  const [done, setDone] = useState([]);

  useEffect(() => {
    loadTask();
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

  const loadTask = async () => {
    try {
      const res = await fetch(`http://localhost:4000/api/tasks/`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      if (res.status === 401) throw new Error(res.body);
      const data = await res.json();
      setTodo(data.tasks.filter((task) => task.taskStatus === 'todo'));
      setProgress(data.tasks.filter((task) => task.taskStatus === 'progress'));
      setDone(data.tasks.filter((task) => task.taskStatus === 'done'));
    } catch (err) {
      console.error(err);
      toast.error('Error while loading task');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!taskName || !description || !difficulty || !priority || !deadline) {
      toast.error('Please fill all the fields!');
      console.log('error');
      return;
    }
    try {
      console.log('a');
      const res = await fetch(`http://localhost:4000/api/tasks/`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          taskName,
          description,
          difficulty,
          priority,
          deadline,
        }),
      });
      if (res.status === 401) throw new Error(res.body);
      const data = await res.json();
    } catch (err) {
      console.error(err);
      toast.error('Error while creating task');
    }
  };

  const onClose = () => setShowModal(false);

  return (
    <div className="bg-white content-container">
      <Navbar></Navbar>
      <Modal isVisible={showModal} onClose={() => setShowModal(false)}>
        <div className="flex flex-col">
          <form onSubmit={handleSubmit} className="form gap-4 m-4">
            <div className="form-group">
              <input
                type="text"
                placeholder="Enter Task Name"
                value={taskName}
                className="text-xl font-semibold text-black"
                onChange={(e) => setTaskName(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label className="text-black">Description</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter description"
                className="w-9/12 p-2 border rounded text-gray text-sm"
              />
            </div>
            <div className="form-group">
              <label className="text-black">Difficulty</label>
              <select
                value={difficulty}
                onChange={(e) => setDifficulty(e.target.value)}
                className="bg-lightblue px-5 py-1 rounded-md text-gray-500"
              >
                <option value="" disabled>
                  Select
                </option>
                <option value="Very Easy">Very Easy</option>
                <option value="Easy">Easy</option>
                <option value="Medium">Medium</option>
                <option value="Hard">Hard</option>
                <option value="Very Hard">Very Hard</option>
              </select>
            </div>
            <div className="form-group">
              <label className="text-black">Priority</label>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                className="bg-lightblue px-5 py-1 rounded-md text-gray-500"
              >
                <option value="" disabled>
                  Select
                </option>
                <option value="Low">Low</option>
                <option value="Normal">Normal</option>
                <option value="High">High</option>
                <option value="Urgent">Urgent</option>
              </select>
            </div>
            <div className="form-group">
              <label className="text-black">Deadline</label>
              <input
                type="date"
                value={deadline}
                onChange={(e) => setDeadline(e.target.value)}
                className="bg-lightblue px-5 py-1 rounded-md text-gray-500"
              />
            </div>
            <div className="flex flex-row text-sm justify-end">
              <button
                onClick={() => onClose()}
                className="bg-darkeryellow text-white mr-1.5 px-3 py-1 rounded-lg"
              >
                Cancel
              </button>
              <button
                type="submit"
                onSubmit={handleSubmit}
                className="bg-darkgreen text-white px-4 py-1 rounded-lg"
              >
                Add
              </button>
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
      <div className="flex flex-row mt-2">
        <img src="/assets/schedule.png" className="img-logo2 p-3 ml-3" />
        <div className="mt-3 text-purple text-lg font-semibold">Schedule</div>
      </div>
      <div className="line"></div>
      <div className="flex justify-center gap-20 mt-2">
        <button className="close-button hover:font-bold hover:text-black">
          <a href="/schedule">All</a>
        </button>
        <button className="open-button w-20">Task</button>
        <button className="close-button hover:font-bold hover:text-black">
          <a href="/schedule/activity">Activity</a>
        </button>
      </div>
      <div className="flex flex-row justify-center gap-10 mt-7">
        <div>
          <div className="bg-yellow px-36 py-1 font-bold mb-3 text-black">
            To Do
          </div>
          {todo.length > 0 ? (
            todo.map((task) => (
              <ScheduleCard key={task._id}>{task.taskName}</ScheduleCard>
            ))
          ) : (
            <p className="text-black">No to do list</p>
          )}

          <button
            className="text-lg font-medium text-lightgray p-3 mt-3 hover:font-bold hover:text-zinc-600"
            onClick={() => setShowModal(true)}
          >
            + Add Task
          </button>
        </div>
        <div>
          <div className="bg-yellow px-36 py-1 font-bold mb-3 text-black">
            In Progress
          </div>
          {progress.length > 0 ? (
            progress.map((task) => (
              <ScheduleCard key={task._id}>{task.taskName}</ScheduleCard>
            ))
          ) : (
            <p className="text-black">No task in progress</p>
          )}
        </div>
        <div>
          <div className="bg-yellow px-36 py-1 font-bold mb-3 text-black">
            Done
          </div>
          {done.length > 0 ? (
            done.map((task) => (
              <ScheduleCard key={task._id}>{task.taskName}</ScheduleCard>
            ))
          ) : (
            <p className="text-black">No task has been done</p>
          )}
        </div>
      </div>
      <main className="flex min-h-screen flex-col items-center justify-between p-24"></main>
    </div>
  );
}
