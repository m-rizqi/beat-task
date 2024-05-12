"use client";

import Navbar from "../components/navbar";
import MusicCard from "../components/musicCard";

export default function Home() {
  return (
    <div className="bg-white">
      <Navbar></Navbar>
      <main className="h-screen">
        <div className="flex flex-row mt-3">
          <img
            src="/assets/music1.png"
            className="img-schedule p-2.5 ml-8"
          />
          <div className="mt-3 ml-2 text-purple text-lg font-semibold">
            Music
          </div>
        </div>
        <div className="line"></div>
        <div className="flex flex-col mt-4 gap-1">
          <MusicCard></MusicCard>
          <MusicCard></MusicCard>
          <MusicCard></MusicCard>
        </div>
      
      
      </main>
      <div className="w-full bg-purple p-4 test">
        <div className="flex flex-row">
          <div className="bg-lightblue p-1.5 ml-3">
            <img src="/assets/music.png" className="img-logo2"></img>
          </div>
          <div className="flex flex-col ml-7 gap-2">
            <p className="font-semibold text-lg text-white">
              Judul Laguuuuuuu 
            </p>
            <p className='text-white'>Penyanyi nya siapa </p>
          </div>
          <div className="flex flex-row gap-6 music-button">
            <button>
              <img src="/assets/prev.png" className="img-musicbtn"></img>
            </button>
            <button>
            <img src="/assets/play2.png" className="img-musicbtn"></img>
            </button>
            <button>
            <img src="/assets/next.png" className="img-musicbtn"></img>
            </button>
          </div>
        </div>     
      </div>
    </div>
    
  );
}
