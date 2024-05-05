import React from 'react';

const Modal = ({ isVisible, onClose, children }) => {
    if (!isVisible) return null;

    const handleClose = (e) => {
        if (e.target.id === 'wrapper') onClose();
    };

    return (
        <div className='fixed inset-0 bg-black bg-opacity-25 
        flex justify-center items-center'>
            <div className='w-[600px] flex flex-col relative'>
                <div className='bg-white p-2 rounded-2xl'>
                    <button
                        className='text-gray-600 text-lg absolute top-3 right-5 -m-2'
                        onClick={() => onClose()}
                    >
                        X
                    </button>
                    {children}
                </div>
            </div>
        </div>
    );
};

export default Modal;
