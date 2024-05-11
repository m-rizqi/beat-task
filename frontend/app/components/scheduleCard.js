import React from 'react';

const ScheduleCard = ({ children }) => {

    return (
        <div className="flex bg-white">
            <div className='flex schedule-bar p-4 mt-3'>
                {children}      
            </div>
        </div>
        
    );
};

export default ScheduleCard;