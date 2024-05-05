import React from 'react';

const HomeCard = ({ children }) => {

    // const handleClose = (e) => {
    //     if (e.target.id === 'wrapper') onClose();
    // };

    return (
        <div className="flex py-5 justify-center bg-white">
            <div className="flex flex-row border-2 border-solid w-8/12 p-5 rounded-2xl shadow-xl bg-lightpurple mt-8 mb-8 relative">
                <img
                    src="/assets/book.png"
                    className="img-logo2"
                />   
                {children}      
            </div>
        </div>
        
    );
};

export default HomeCard;