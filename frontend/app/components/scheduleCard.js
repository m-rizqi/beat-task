import React from 'react';

const ScheduleCard = ({ children }) => {

    return (
        <div className="flex py-5 justify-center bg-white">
            <div className="flex flex-row border-2 border-solid border-gray-300 w-3/12 p-5 rounded-2xl shadow-xl bg-lightblue mt-8 mb-8 relative">
                {children}      
            </div>
        </div>
        
    );
};

export default ScheduleCard;