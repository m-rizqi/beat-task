'use client';

import Navbar from '../components/navbar';
import FullCalendar from '@fullcalendar/react';
import { Calendar } from '@fullcalendar/core';
import timeGridPlugin from '@fullcalendar/timegrid';
import dayGridPlugin from '@fullcalendar/daygrid';
import { useState } from 'react';

export default function Home() {
  const [tasks, setTasks] = useState([
    {
      title: 'SP: Responsi Presentasi',
      start: '2024-06-06T20:30:00',
      end: '2024-06-06T22:30:00',
    },
  ]);

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
          events={tasks}
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
