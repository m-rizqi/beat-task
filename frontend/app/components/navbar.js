"use client";

export default function Navbar() {
    return (
        <nav className="bg-purple">
            <div className="px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center">
                        <img
                            src="/assets/logo.png"
                            className="img-logo2 p-1"
                            alt="Logo"
                        />
                        <div className="text-white font-semibold ml-2 text-xl">
                            Beat Task!
                        </div>
                    </div>
                    <div>
                        <div className="ml-4 flex items-center space-x-4">
                            <a href="/" className="text-white hover:bg-white hover:text-black rounded-lg p-2">
                                Home
                            </a>
                            <a href="/schedule" className="text-white hover:bg-white hover:text-black rounded-lg p-2">
                                Schedule
                            </a>
                            <a href="" className="text-white hover:bg-white hover:text-black rounded-lg p-2">
                                Music
                            </a>
                            <a href="" className="text-white hover:bg-white hover:text-black rounded-lg p-2">
                                Settings
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    )

}