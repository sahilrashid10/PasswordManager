import React from 'react'
const Navbar = () => {
    return (
        <nav className='container px-20 py-4 bg-emerald-950 text-white flex justify-between items-center h-14 min-w-full'>
            <div className="logo font-bold text-white text-2xl">
                <span className='text-green-500'> &lt;</span>
                SR
                <span className='text-green-500'>7/&gt;</span>
            </div>

                <a className='logo flex justify-between items-center gap-2 bg-emerald-900 rounded-xl p-1 hover:bg-emerald-800 cursor-pointer ring-white ring-1' href="https://github.com/sahilrashid10">
                    <img className='invert w-6 ' src="./public/icons/github.svg" alt="" />
                    <div>Github</div>
                </a>
        </nav>

    )
}

export default Navbar;