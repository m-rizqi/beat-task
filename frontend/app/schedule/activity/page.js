'use client';

import Navbar from '../../components/navbar';
import Modal from '../../components/modal';
import ScheduleCard from '../../components/scheduleCard';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
//import HomeCard from "../components/homeCard";
import { useState, useEffect } from 'react';

export default function Home() {
  const [showModal, setShowModal] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [activityName, setActivityName] = useState('');
  const [activityStart, setActivityStart] = useState('');
  const [activityEnd, setActivityEnd] = useState('');
  const [repeatVar, setRepeatVar] = useState('');
  const [repeatInterval, setRepeatInterval] = useState(0);
  const [activities, setActivities] = useState([]);
  const [activityDetail, setActivityDetail] = useState({
    activityId: '',
    activityName: '',
    activityStart: '',
    activityEnd: '',
    repeatVar: '',
    repeatInterval: '',
  });

  useEffect(() => {
    loadActivities();
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

  const loadActivities = async () => {
    try {
      const res = await fetch(`http://localhost:4000/api/activities/`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      if (res.status === 401) throw new Error(res.body);
      const data = await res.json();
      setActivities(data.activity);
    } catch (err) {
      console.error(err);
      toast.error('Error while loading activities');
    }
  };

  const getActivity = async (id) => {
    try {
      const res = await fetch(`http://localhost:4000/api/activities/${id}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      if (res.status === 401) throw new Error(res.body);
      const data = await res.json();
      let activityStartDate = new Date(data.activityStart);
      let activityStartYear = activityStartDate.toLocaleString('en-US', {
        timeZone: 'Asia/Jakarta',
        year: 'numeric',
      });
      let activityStartMonth = activityStartDate.toLocaleString('en-US', {
        timeZone: 'Asia/Jakarta',
        month: '2-digit',
      });
      let activityStartDay = activityStartDate.toLocaleString('en-US', {
        timeZone: 'Asia/Jakarta',
        day: '2-digit',
      });
      let activityStartHour = activityStartDate.toLocaleString('en-US', {
        timeZone: 'Asia/Jakarta',
        hour: '2-digit',
        hour12: false,
      });
      let activityStartMinute = activityStartDate.toLocaleString('en-US', {
        timeZone: 'Asia/Jakarta',
        minute: '2-digit',
      });
      let activityEndDate = new Date(data.activityEnd);
      let activityEndYear = activityEndDate.toLocaleString('en-US', {
        timeZone: 'Asia/Jakarta',
        year: 'numeric',
      });
      let activityEndMonth = activityEndDate.toLocaleString('en-US', {
        timeZone: 'Asia/Jakarta',
        month: '2-digit',
      });
      let activityEndDay = activityEndDate.toLocaleString('en-US', {
        timeZone: 'Asia/Jakarta',
        day: '2-digit',
      });
      let activityEndHour = activityEndDate.toLocaleString('en-US', {
        timeZone: 'Asia/Jakarta',
        hour: '2-digit',
        hour12: false,
      });
      let activityEndMinute = activityEndDate.toLocaleString('en-US', {
        timeZone: 'Asia/Jakarta',
        minute: '2-digit',
      });
      let activityStartText =
        activityStartMinute < 10
          ? `${activityStartYear}-${activityStartMonth}-${activityStartDay}T${activityStartHour}:0${activityStartMinute}`
          : `${activityStartYear}-${activityStartMonth}-${activityStartDay}T${activityStartHour}:${activityStartMinute}`;
      let activityEndText =
        activityEndMinute < 10
          ? `${activityEndYear}-${activityEndMonth}-${activityEndDay}T${activityEndHour}:0${activityEndMinute}`
          : `${activityEndYear}-${activityEndMonth}-${activityEndDay}T${activityEndHour}:${activityEndMinute}`;
      console.log(data);
      setActivityDetail({
        ...data,
        activityStart: activityStartText,
        activityEnd: activityEndText,
        activityId: id,
      });
      setShowEdit(true);
    } catch (err) {
      console.error(err);
      toast.error('Error while loading activity');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Lakukan sesuatu dengan data yang diinput
    console.log('Data Activities:', {
      activityName,
      activityStart,
      activityEnd,
      repeatVar,
      repeatInterval,
    });
    // Lakukan pengiriman data ke server atau penanganan lainnya di sini
    if (
      !activityName ||
      !activityStart ||
      !activityEnd ||
      !repeatVar ||
      repeatInterval < 1
    ) {
      toast.error('Please fill all the fields!');
      console.log('error');
      return;
    }

    const newActivity = {
      activityName: activityName,
      activityStart: activityStart,
      activityEnd: activityEnd,
      repeatVar: repeatVar,
      repeatInterval: repeatInterval,
    };
    // Lakukan pengiriman data ke server atau penanganan lainnya di sini
    try {
      const res = await fetch(`http://localhost:4000/api/activities`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newActivity),
      });
      if (res.status === 401) throw new Error(res.body);
      toast.success('Activity created successfully');
      setShowModal(false);
      resetForm();
      loadActivities();
    } catch (err) {
      console.error(err);
      toast.error('Error while creating activity');
    }
  };

  const updateActivity = async (e) => {
    e.preventDefault();
    console.log(activityDetail);
    // Lakukan sesuatu dengan data yang diinput
    // Lakukan pengiriman data ke server atau penanganan lainnya di sini
    if (!activityDetail.activityName || activityDetail.repeatInterval < 1) {
      toast.error('Please fill all the fields!');
      console.log('error');
      return;
    }

    const updateActivity = {
      activityName: activityDetail.activityName,
      activityStart: activityDetail.activityStart,
      activityEnd: activityDetail.activityEnd,
      repeatVar: activityDetail.repeatVar,
      repeatInterval: activityDetail.repeatInterval,
    };
    // Lakukan pengiriman data ke server atau penanganan lainnya di sini
    try {
      const res = await fetch(
        `http://localhost:4000/api/activities/${activityDetail.activityId}`,
        {
          method: 'PUT',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(updateActivity),
        }
      );
      if (res.status === 401) throw new Error(res.body);
      toast.success('Activity updated successfully');
      setShowEdit(false);
      resetForm();
      loadActivities();
    } catch (err) {
      console.error(err);
      toast.error('Error while updating activity');
    }
  };

  const formatDate = (date) => {
    const options = {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    };
    return new Date(date).toLocaleDateString(undefined, options);
  };

  const onClose = () => {
    setShowModal(false);
    resetForm();
  };

  const onEditClose = () => {
    setShowEdit(false);
    setActivityDetail({});
  };

  const resetForm = () => {
    setActivityName('');
    setActivityStart('');
    setActivityEnd('');
    setRepeatVar('');
    setRepeatInterval('');
  };

  const deleteActivity = async (id) => {
    try {
      const res = await fetch(`http://localhost:4000/api/activities/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      if (res.status === 401) throw new Error(res.body);
      toast.success('Activity deleted successfully');
      setShowDelete(false);
      setShowEdit(false);
      setActivityDetail({
        activityId: '',
        activityName: '',
        activityStart: '',
        activityEnd: '',
        repeatVar: '',
        repeatInterval: '',
      });

      loadActivities();
    } catch (err) {
      console.error(err);
      toast.error('Error while deleting activity');
    }
  };

  return (
    <div className="bg-white content-container text-black">
      <Navbar></Navbar>
      <Modal isVisible={showModal} onClose={() => setShowModal(false)}>
        <div className="flex flex-col">
          <form onSubmit={handleSubmit} className="form gap-6 m-4">
            <div className="form-group">
              <input
                type="text"
                placeholder="Enter Activity Name"
                value={activityName}
                className="text-2xl font-semibold"
                onChange={(e) => setActivityName(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Activity Start</label>
              <input
                type="datetime-local"
                value={activityStart}
                onChange={(e) => setActivityStart(e.target.value)}
                className="bg-lightblue px-5 py-2 rounded-md"
              />
            </div>
            <div className="form-group">
              <label>Activity End</label>
              <input
                type="datetime-local"
                value={activityEnd}
                onChange={(e) => setActivityEnd(e.target.value)}
                className="bg-lightblue px-5 py-2 rounded-md"
              />
            </div>
            <div className="form-group">
              <label>Repeat Every</label>
              <select
                value={repeatVar}
                onChange={(e) => setRepeatVar(e.target.value)}
                className="bg-lightblue px-5 py-2 rounded-md"
              >
                <option value="" disabled>
                  Select
                </option>
                <option value="daily">Hari</option>
                <option value="weekly">Minggu</option>
                <option value="monthly">Bulan</option>
                <option value="semesterly">Semester</option>
              </select>
            </div>
            <div className="form-group">
              <label>Repeat Interval</label>
              <input
                type="number"
                value={repeatInterval}
                onChange={(e) => setRepeatInterval(e.target.value)}
                placeholder="Enter Repeat Interval"
                className="p-2 border rounded text-gray text-sm"
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
                placeholder="Enter Activity Name"
                value={activityDetail.activityName}
                className="text-2xl font-semibold"
                onChange={(e) =>
                  setActivityDetail({
                    ...activityDetail,
                    activityName: e.target.value,
                  })
                }
              />
            </div>
            <div className="form-group">
              <label>Activity Start</label>
              <input
                type="datetime-local"
                value={activityDetail.activityStart}
                onChange={(e) =>
                  setActivityDetail({
                    ...activityDetail,
                    activityStart: e.target.value,
                  })
                }
                className="bg-lightblue px-5 py-2 rounded-md"
              />
            </div>
            <div className="form-group">
              <label>Activity End</label>
              <input
                type="datetime-local"
                value={activityDetail.activityEnd}
                onChange={(e) =>
                  setActivityDetail({
                    ...activityDetail,
                    activityEnd: e.target.value,
                  })
                }
                className="bg-lightblue px-5 py-2 rounded-md"
              />
            </div>
            <div className="form-group">
              <label>Repeat Every</label>
              <select
                value={activityDetail.repeatVar}
                onChange={(e) =>
                  setActivityDetail({
                    ...activityDetail,
                    repeatVar: e.target.value,
                  })
                }
                className="bg-lightblue px-5 py-2 rounded-md"
              >
                <option value="daily">Hari</option>
                <option value="weekly">Minggu</option>
                <option value="monthly">Bulan</option>
                <option value="semesterly">Semester</option>
              </select>
            </div>
            <div className="form-group">
              <label>Repeat Interval</label>
              <input
                type="number"
                value={activityDetail.repeatInterval}
                onChange={(e) =>
                  setActivityDetail({
                    ...activityDetail,
                    repeatInterval: e.target.value,
                  })
                }
                placeholder="Enter Repeat Interval"
                className="p-2 border rounded text-gray text-sm"
              />
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
                onClick={updateActivity}
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
                onClick={() => deleteActivity(activityDetail.activityId)}
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

      <div className="flex flex-row mt-3">
        <img src="/assets/schedule1.png" className="img-schedule p-3 ml-8" />
        <div className="mt-3 text-purple text-lg font-semibold">Schedule</div>
      </div>
      <div className="line"></div>
      <div className="flex justify-center gap-14 mt-2">
        <button className="close-button hover:font-bold hover:text-black">
          <a href="/schedule">All</a>
        </button>
        <button className="close-button hover:font-bold hover:text-black">
          <a href="/schedule/task">Task</a>
        </button>
        <button className="open-button">Activity</button>
      </div>
      <div className="flex flex-row justify-center gap-10 mt-7">
        <div>
          {activities.length > 0 ? (
            activities.map((activity, index) => {
              const desc = `Start: ${formatDate(
                activity.activityStart
              )}, End: ${formatDate(activity.activityEnd)}, Repeat: ${
                activity.repeatVar
              }, Interval: ${activity.repeatInterval}`;

              return (
                <div
                  key={`div_${activity._id}`}
                  onClick={() => getActivity(activity._id)}
                >
                  <ScheduleCard
                    key={index}
                    name={activity.activityName}
                    desc={desc}
                  />
                </div>
              );
            })
          ) : (
            <p className="text-black">No activity has been added</p>
          )}
          <button
            className="text-lg font-medium text-lightgray p-3 mt-3 hover:font-bold hover:text-zinc-600"
            onClick={() => setShowModal(true)}
          >
            + Add Activity
          </button>
        </div>
      </div>
      <main className="flex min-h-screen flex-col items-center justify-between p-24"></main>
      <ToastContainer />
    </div>
  );
}
