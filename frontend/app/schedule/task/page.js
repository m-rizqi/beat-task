'use client';

import Navbar from '../../components/navbar';
import Modal from '../../components/modal';
import ScheduleCard from '../../components/scheduleCard';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useState, useEffect } from 'react';

export default function Home() {
  const [showModal, setShowModal] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [taskName, setTaskName] = useState('');
  const [taskDescription, setDescription] = useState('');
  const [taskDifficulty, setDifficulty] = useState('');
  const [taskPriority, setPriority] = useState('');
  const [taskDeadline, setDeadline] = useState('');
  const [taskDetail, setTaskDetail] = useState({
    taskID: '',
    taskName: '',
    taskDescription: '',
    taskDifficulty: '',
    taskPriority: '',
    taskDeadline: '',
    taskStatus: '',
  });
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

  const getTask = async (id) => {
    try {
      const res = await fetch(`http://localhost:4000/api/tasks/${id}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      if (res.status === 401) throw new Error(res.body);
      const data = await res.json();
      let deadlineDate = new Date(data.taskDeadline);
      let deadlineYear = deadlineDate.toLocaleString('en-US', {
        timeZone: 'Asia/Jakarta',
        year: 'numeric',
      });
      let deadlineMonth = deadlineDate.toLocaleString('en-US', {
        timeZone: 'Asia/Jakarta',
        month: '2-digit',
      });
      let deadlineDay = deadlineDate.toLocaleString('en-US', {
        timeZone: 'Asia/Jakarta',
        day: '2-digit',
      });
      let deadlineHour = deadlineDate.toLocaleString('en-US', {
        timeZone: 'Asia/Jakarta',
        hour: '2-digit',
        hour12: false,
      });
      let deadlineMinute = deadlineDate.toLocaleString('en-US', {
        timeZone: 'Asia/Jakarta',
        minute: '2-digit',
      });
      // let deadline = deadlineDate.toISOString();
      let deadline =
        deadlineMinute < 10
          ? `${deadlineYear}-${deadlineMonth}-${deadlineDay}T${deadlineHour}:0${deadlineMinute}`
          : `${deadlineYear}-${deadlineMonth}-${deadlineDay}T${deadlineHour}:${deadlineMinute}`;
      console.log(deadlineMinute);
      console.log(deadline);
      console.log(data);
      setTaskDetail({ ...data, taskDeadline: deadline, taskID: id });
      setShowEdit(true);
    } catch (err) {
      console.error(err);
      toast.error('Error while loading task');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Lakukan sesuatu dengan data yang diinput
    // Lakukan pengiriman data ke server atau penanganan lainnya di sini
    if (
      !taskName ||
      !taskDescription ||
      !taskDifficulty ||
      !taskPriority ||
      !taskDeadline
    ) {
      toast.error('Please fill all the fields!');
      console.log('error');
      return;
    }
    try {
      const res = await fetch(`http://localhost:4000/api/tasks/`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          taskName,
          taskDescription,
          taskDifficulty,
          taskPriority,
          taskDeadline,
        }),
      });
      if (res.status === 401) throw new Error(res.body);
      toast.success('Task created successfully');
      setShowModal(false);
      resetForm();
      setSchedule();
      loadTask();
    } catch (err) {
      console.error(err);
      toast.error('Error while creating task');
    }
  };

  const updateTask = async (e) => {
    e.preventDefault();
    // Lakukan sesuatu dengan data yang diinput
    // Lakukan pengiriman data ke server atau penanganan lainnya di sini
    if (!taskDetail.taskName || !taskDetail.taskDescription) {
      toast.error('Please fill all the fields!');
      console.log('error');
      return;
    }
    try {
      const res = await fetch(
        `http://localhost:4000/api/tasks/${taskDetail.taskID}`,
        {
          method: 'PUT',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            taskName: taskDetail.taskName,
            taskDescription: taskDetail.taskDescription,
            taskDifficulty: taskDetail.taskDifficulty,
            taskPriority: taskDetail.taskPriority,
            taskDeadline: taskDetail.taskDeadline,
            taskStatus: taskDetail.taskStatus,
          }),
        }
      );
      if (res.status === 401) throw new Error(res.body);
      toast.success('Task updated successfully');
      setShowEdit(false);
      setSchedule();
      loadTask();
    } catch (err) {
      console.error(err);
      toast.error('Error while updating task');
    }
  };

  const onClose = () => {
    setShowModal(false);
    resetForm();
  };

  const onEditClose = () => {
    setShowEdit(false);
    setTaskDetail({});
  };

  const resetForm = () => {
    setTaskName('');
    setDescription('');
    setDifficulty('');
    setPriority('');
    setDeadline('');
  };

  const deleteTask = async (id) => {
    try {
      const res = await fetch(`http://localhost:4000/api/tasks/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      if (res.status === 401) throw new Error(res.body);
      toast.success('Task deleted successfully');
      setShowDelete(false);
      setShowEdit(false);
      setTaskDetail({});
      loadTask({
        taskID: '',
        taskName: '',
        taskDescription: '',
        taskDifficulty: '',
        taskPriority: '',
        taskDeadline: '',
        taskStatus: '',
      });
      setSchedule();
    } catch (err) {
      console.error(err);
      toast.error('Error while deleting activity');
    }
  };

  const setSchedule = async () => {
    try {
      const res = await fetch(`http://localhost:5000/schedule_tasks`, {
        method: 'POST',
        // mode: 'no-cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(todo.concat(progress)),
      });
      if (res.status === 401) throw new Error(res.body);
      const data = await res.json();
      await updateSchedule(data);
      toast.success('Schedule updated successfully');
    } catch (err) {
      console.error(err);
      toast.error('Error while loading task');
    }
  };

  const updateSchedule = async (task) => {
    try {
      const res = await fetch(`http://localhost:4000/api/schedules/`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(task),
      });
      if (res.status === 401) throw new Error(res.body);
    } catch (err) {
      console.error(err);
      toast.error('Error while updating schedule');
    }
  };

  return (
    <div className="bg-white content-container text-black">
      <Navbar></Navbar>
      <Modal isVisible={showModal} onClose={() => onClose()}>
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
                value={taskDescription}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter description"
                className="w-9/12 p-2 border rounded text-gray text-sm"
              />
            </div>
            <div className="form-group">
              <label>Difficulty</label>
              <select
                value={taskDifficulty}
                onChange={(e) => setDifficulty(e.target.value)}
                className="bg-lightblue px-6 py-2 rounded-md text-gray-500"
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
              <label>Priority</label>
              <select
                value={taskPriority}
                onChange={(e) => setPriority(e.target.value)}
                className="bg-lightblue px-6 py-2 rounded-md text-gray-500"
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
              <label>Deadline</label>
              <input
                type="datetime-local"
                value={taskDeadline}
                onChange={(e) => {
                  setDeadline(e.target.value);
                }}
                className="bg-lightblue px-6 py-2 rounded-md text-gray-500"
              />
            </div>
            <div className="flex flex-row text-sm justify-end">
              <button
                onClick={() => onClose()}
                className="bg-darkeryellow text-white font-semibold mr-2.5 px-4 py-2 rounded-lg"
              >
                Cancel
              </button>
              <button
                type="submit"
                onSubmit={handleSubmit}
                className="bg-darkgreen text-white font-semibold px-6 py-2 rounded-lg"
              >
                Add
              </button>
            </div>
          </form>
        </div>
      </Modal>

      <Modal isVisible={showEdit} onClose={() => onEditClose()}>
        <div className="flex flex-col">
          <div className="form gap-6 m-4">
            <div className="form-group">
              <input
                type="text"
                placeholder="Enter Task Name"
                value={taskDetail.taskName}
                className="text-2xl font-semibold"
                onChange={(e) =>
                  setTaskDetail({ ...taskDetail, taskName: e.target.value })
                }
              />
            </div>
            <div className="form-group">
              <label>Description</label>
              <textarea
                value={taskDetail.taskDescription}
                onChange={(e) =>
                  setTaskDetail({
                    ...taskDetail,
                    taskDescription: e.target.value,
                  })
                }
                placeholder="Enter description"
                className="w-9/12 p-2 border rounded text-gray text-sm"
              />
            </div>
            <div className="form-group">
              <label>Difficulty</label>
              <select
                value={taskDetail.taskDifficulty}
                onChange={(e) =>
                  setTaskDetail({
                    ...taskDetail,
                    taskDifficulty: e.target.value,
                  })
                }
                className="bg-lightblue px-6 py-2 rounded-md text-gray-500"
              >
                <option value="Very Easy">Very Easy</option>
                <option value="Easy">Easy</option>
                <option value="Medium">Medium</option>
                <option value="Hard">Hard</option>
                <option value="Very Hard">Very Hard</option>
              </select>
            </div>
            <div className="form-group">
              <label>Priority</label>
              <select
                value={taskDetail.taskPriority}
                onChange={(e) =>
                  setTaskDetail({ ...taskDetail, taskPriority: e.target.value })
                }
                className="bg-lightblue px-6 py-2 rounded-md text-gray-500"
              >
                <option value="Low">Low</option>
                <option value="Normal">Normal</option>
                <option value="High">High</option>
                <option value="Urgent">Urgent</option>
              </select>
            </div>
            <div className="form-group">
              <label>Deadline</label>
              <input
                type="datetime-local"
                value={taskDetail.taskDeadline}
                onChange={(e) =>
                  setTaskDetail({ ...taskDetail, taskDeadline: e.target.value })
                }
                className="bg-lightblue px-6 py-2 rounded-md text-gray-500"
              />
            </div>
            <div className="form-group">
              <label>Status</label>
              <select
                value={taskDetail.taskStatus}
                onChange={(e) =>
                  setTaskDetail({ ...taskDetail, taskStatus: e.target.value })
                }
                className="bg-lightblue px-6 py-2 rounded-md text-gray-500"
              >
                <option value="todo">To Do</option>
                <option value="progress">In Progress</option>
                <option value="done">Done</option>
              </select>
            </div>
            <div className="flex flex-row text-sm justify-end">
              <button
                onClick={() => setShowDelete(true)}
                className="bg-red-700 text-white font-semibold mr-2.5 px-4 py-2 rounded-lg"
              >
                Delete
              </button>
              <button
                onClick={() => onEditClose()}
                className="bg-darkeryellow text-white font-semibold mr-2.5 px-4 py-2 rounded-lg"
              >
                Cancel
              </button>
              <button
                type="submit"
                onClick={updateTask}
                className="bg-darkgreen text-white font-semibold px-6 py-2 rounded-lg"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </Modal>

      {!showDelete ? null : (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-[100]">
          <div className="bg-white p-6 rounded-lg">
            <p className="text-lg font-semibold mb-4">
              Are you sure you want to delete?
            </p>
            <div className="flex justify-end">
              <button
                onClick={() => {
                  deleteTask(taskDetail.taskID);
                }}
                className="bg-red-700 text-white font-semibold mr-2.5 px-4 py-2 rounded-lg"
              >
                Delete
              </button>
              <button
                onClick={() => {
                  setShowDelete(false);
                }}
                className="bg-darkeryellow text-white font-semibold mr-2.5 px-4 py-2 rounded-lg"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

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
          <div className="bg-yellow px-36 py-1 font-bold mb-3">To Do</div>
          {todo.length > 0 ? (
            todo.map((task) => (
              <div key={`div_${task._id}`} onClick={() => getTask(task._id)}>
                <ScheduleCard
                  key={task._id}
                  name={task.taskName}
                  desc={task.taskDescription}
                />
              </div>
            ))
          ) : (
            <p>No to do list</p>
          )}

          <button
            className="text-lg font-medium text-lightgray p-3 mt-3 hover:font-bold hover:text-zinc-600"
            onClick={() => setShowModal(true)}
          >
            + Add Task
          </button>
        </div>
        <div>
          <div className="bg-yellow px-36 py-1 font-bold mb-3">In Progress</div>
          {progress.length > 0 ? (
            progress.map((task) => (
              <div key={`div_${task._id}`} onClick={() => getTask(task._id)}>
                <ScheduleCard
                  key={task._id}
                  name={task.taskName}
                  desc={task.taskDescription}
                />
              </div>
            ))
          ) : (
            <p>No task in progress</p>
          )}
        </div>
        <div>
          <div className="bg-yellow px-36 py-1 font-bold mb-3">Done</div>
          {done.length > 0 ? (
            done.map((task) => (
              <div key={`div_${task._id}`} onClick={() => getTask(task._id)}>
                <ScheduleCard
                  key={task._id}
                  name={task.taskName}
                  desc={task.taskDescription}
                />
              </div>
            ))
          ) : (
            <p className="text-black">No task has been done</p>
          )}
        </div>
      </div>
      <main className="flex min-h-screen flex-col items-center justify-between p-24"></main>
      <ToastContainer />
    </div>
  );
}
