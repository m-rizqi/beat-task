import React from 'react';

const ScheduleCard = ({ name, desc }) => {
  return (
    <div className="flex bg-white">
      <div className="flex flex-col schedule-bar p-3 mt-3 w-96 h-32">
        <div className="flex items-center text-base">
          <p className="font-semibold mr-2">{name}</p>
        </div>
        <p className="mt-1 text-base overflow-hidden">{desc}</p>
      </div>
    </div>
  );
};

export default ScheduleCard;
