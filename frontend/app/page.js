"use client";

import Navbar from "./components/navbar";
import ScheduleCard from "./components/scheduleCard";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar></Navbar>
      {/* <HomeCard></HomeCard> */}
      <ScheduleCard>
        <div>
          task/activities info
        </div>
      </ScheduleCard>
    </div>
    
  );
}
