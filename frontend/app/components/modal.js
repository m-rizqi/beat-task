import React from 'react';

const Modal = ({ isVisible, onClose, children }) => {
    if (!isVisible) return null;

    const handleClose = (e) => {
        if (e.target.id === 'wrapper') onClose();
    };

    return (
        <div 
            id="wrapper"
            onClick={handleClose}
            className='fixed inset-0 bg-black bg-opacity-25 flex justify-center items-center z-50'
        >
            <div className='w-[750px] flex flex-col relative'>
                <div className='bg-white p-6 rounded-2xl'>
                    <button
                        className='text-gray-600 text-lg absolute top-3 right-5'
                        onClick={() => onClose()}
                    >
                        <img
                            src="/assets/x.png"
                            className="img-x mt-3 mr-1 "
                        ></img>
                    </button>
                    {children}
                </div>
            </div>
        </div>
    );
};

export default Modal;
