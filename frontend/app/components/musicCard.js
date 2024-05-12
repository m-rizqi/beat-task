import React from 'react';

const MusicCard = ({ children }) => {

    return (
        <div className="flex bg-white">
            <div className='flex music-bar p-4 mt-3'>
                <div className="flex flex-row">
                    <button>
                        <img src="/assets/play1.png" className="img-logo2 ml-4 mt-1"></img>
                    </button>
                    <div className="flex flex-col ml-7 gap-2">
                        <p className="font-semibold text-lg">
                            Judul Laguuuuuuu {children}
                        </p>
                        <p className=''>Penyanyi nya siapa {children}</p>
                    </div>
                    <div className="music-time text-lg">
                        durasi {children}
                    </div>
                </div>     
            </div>
        </div>
        
    );
};

export default MusicCard;