'use client';

import Navbar from '../../components/navbar';
import Modal from '../../components/modal';
import ScheduleCard from '../../components/scheduleCard';
//import HomeCard from "../components/homeCard";
import { useState, useEffect } from 'react';

export default function Home() {
  const [showModal, setShowModal] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [activityName, setActivityName] = useState('');
  const [activityStart, setActivityStart] = useState('');
  const [activityEnd, setActivityEnd] = useState('');
  const [repeatVar, setRepeatVar] = useState('Select');
  const [repeatInterval, setRepeatInterval] = useState(0);
  const [activities, setActivities] = useState([]);
  const [activityDetail, setActivityDetail] = useState({
    activityId: '',
    activityName : '',
    activityStart : '',
    activityEnd : '',
    repeatVar : '',
    repeatInterval : '',
  })

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
      console.log(data.activity);
    } catch (err) {
      console.error(err);
      // toast.error("Error while loading activities");
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
      let activityEndDate = new Date(data.activityEnd);
      let activityStartText = activityStartDate.toISOString().split('T')[0];
      let activityEndText = activityEndDate.toISOString().split('T')[0];
      console.log(data);
      setActivityDetail({ ...data, activityStart: activityStartText, activityEnd: activityEndText, activityId: id });
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
      repeatVar === 'Select' ||
      repeatInterval <= 0
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
      const res = await fetch(`http://localhost:4000//api/activities`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newActivity),
      });
      if (res.status === 401) throw new Error(res.body);
      const data = await res.json();
      console.log(data);
    } catch (err) {
      console.error(err);
      toast.error('Error while creating activity');
    }
  };

  const updateActivity = async (e) => {
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
      repeatVar === 'Select' ||
      repeatInterval <= 0
    ) {
      toast.error('Please fill all the fields!');
      console.log('error');
      return;
    }

    const updateActivity = {
      activityName: activityName,
      activityStart: activityStart,
      activityEnd: activityEnd,
      repeatVar: repeatVar,
      repeatInterval: repeatInterval,
    };
    // Lakukan pengiriman data ke server atau penanganan lainnya di sini
    try {
      const res = await fetch(`http://localhost:4000//api/activities/${activityDetail.activityId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updateActivity),
      });
      if (res.status === 401) throw new Error(res.body);
      setShowEdit(false);
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
                type="date"
                value={activityStart}
                onChange={(e) => setActivityStart(e.target.value)}
                className="bg-lightblue px-5 py-2 rounded-md"
              />
            </div>
            <div className="form-group">
              <label>Activity End</label>
              <input
                type="date"
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
                type="submit"
                className="bg-darkeryellow text-white font-semibold mr-2.5 px-4 py-2 rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={() => onClose()}
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
          <form onSubmit={handleSubmit} className="form gap-6 m-4">
            <div className="form-group">
              <input
                type="text"
                placeholder="Enter Activity Name"
                value={activityDetail.activityName}
                className="text-2xl font-semibold"
                onChange={(e) => setActivityDetail({...activityDetail, activityName: e.target.value})}
              />
            </div>
            <div className="form-group">
              <label>Activity Start</label>
              <input
                type="date"
                value={activityDetail.activityStart}
                onChange={(e) => setActivityDetail({...activityDetail, activityStart: e.target.value})}
                className="bg-lightblue px-5 py-2 rounded-md"
              />
            </div>
            <div className="form-group">
              <label>Activity End</label>
              <input
                type="date"
                value={activityDetail.activityEnd}
                onChange={(e) => setActivityDetail({...activityDetail, activityEnd: e.target.value})}
                className="bg-lightblue px-5 py-2 rounded-md"
              />
            </div>
            <div className="form-group">
              <label>Repeat Every</label>
              <select
                value={activityDetail.repeatVar}
                onChange={(e) => setActivityDetail({...activityDetail, repeatVar: e.target.value})}
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
                value={activityDetail.repeatInterval}
                onChange={(e) => setActivityDetail({...activityDetail, repeatInterval: e.target.value})}
                placeholder="Enter Repeat Interval"
                className="p-2 border rounded text-gray text-sm"
              />
            </div>
            <div className="flex flex-row text-sm justify-end">
              <button
                type="submit"
                className="bg-darkeryellow text-white font-semibold mr-2.5 px-4 py-2 rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={() => updateActivity()}
                className="bg-darkgreen text-white font-semibold px-6 py-2 rounded-lg"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      </Modal>
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
          {activities.length > 0 ? (activities.map((activity, index) => {
            const desc = `Start: ${formatDate(
              activity.activityStart
            )}, End: ${formatDate(activity.activityEnd)}, Repeat: ${
              activity.repeatVar
            }, Interval: ${activity.repeatInterval}`;

            return (
              <div key={`div_${activity._id}`} onClick={() => getActivity(activity._id)}>
                <ScheduleCard
                key={index}
                name={activity.activityName}
                desc={desc}
              />
              </div>
            );
          })) : (<p className="text-black">No activity has been added</p>)}
          <button
            className="text-lg font-medium text-lightgray p-3 mt-3 hover:font-bold hover:text-zinc-600"
            onClick={() => setShowModal(true)}
          >
            + Add Activity
          </button>
        </div>
      </div>
      <main className="flex min-h-screen flex-col items-center justify-between p-24"></main>
    </div>
  );
}
