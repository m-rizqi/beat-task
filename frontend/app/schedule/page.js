'use client';

import Navbar from '../components/navbar';
import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';
import dayGridPlugin from '@fullcalendar/daygrid';
import { useEffect, useState } from 'react';

export default function Home() {
  const [schedule, setSchedule] = useState([]);

  useEffect(() => {
    loadSchedule();
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

  const loadSchedule = async () => {
    try {
      const res = await fetch('http://20.2.28.134:4000/api/schedules/', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (res.status === 401) throw new Error(res.body);
      const data = await res.json();
      for (let i = 0; i < data.schedule.length; i++) {
        data.schedule[i].title = data.schedule[i].name;
        data.schedule[i].start = data.schedule[i].startTime;
        data.schedule[i].end = data.schedule[i].endTime;
      }
      console.log(data.schedule);
      setSchedule(data.schedule);
    } catch (error) {
      console.error('Error while loading data');
    }
  };

  return (
    <div className="bg-white content-container">
      <Navbar></Navbar>
      <div className="flex flex-row mt-3">
        <img src="/assets/schedule1.png" className="img-schedule p-3 ml-8" />
        <div className="mt-3 text-purple text-lg font-semibold">Schedule</div>
      </div>
      <div className="line"></div>
      <div className="flex justify-center gap-14 mt-2">
        <button className="open-button w-20">All</button>
        <button className="close-button hover:font-bold hover:text-black">
          <a href="/schedule/task">Task</a>
        </button>
        <button className="close-button hover:font-bold hover:text-black">
          <a href="/schedule/activity">Activity</a>
        </button>
      </div>
      <main className="min-h-screen items-center justify-between p-24 text-black">
        <FullCalendar
          plugins={[timeGridPlugin, dayGridPlugin]}
          events={schedule}
          initialView="timeGridWeek"
          height={650}
          headerToolbar={{
            left: 'prev,next',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay', // user can switch between the two
          }}
        />
      </main>
    </div>
  );
}
