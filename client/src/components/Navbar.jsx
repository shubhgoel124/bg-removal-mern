import React, { useContext, useEffect } from 'react'
import { assets } from '../assets/assets'
import { useClerk, UserButton, useUser } from "@clerk/clerk-react";
import { Link, useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';

const Navbar = () => {

    const { openSignIn } = useClerk()
    const { isSignedIn, user } = useUser()
    const { credit, loadCreditsData } = useContext(AppContext)
    const navigate = useNavigate()

    useEffect(() => {
        if (isSignedIn) {
            loadCreditsData()
        }
    }, [isSignedIn])

    return (
        <div className='mx-4 py-4 lg:mx-16'>
            <div className='glass-card fade-up flex items-center justify-between rounded-2xl px-4 py-3 shadow-sm sm:px-6'>
                <Link to={'/'}><img className='w-32 sm:w-40' src={assets.logo} alt="" /></Link>
            {isSignedIn
                ? <div className='flex items-center gap-2 sm:gap-3'>
                    <button onClick={() => navigate('/buy')} className='flex items-center gap-2 rounded-full border border-[#0f766e]/30 bg-[#ccfbf1] px-4 py-1.5 text-xs font-medium text-[#134e4a] transition hover:-translate-y-0.5 sm:px-6 sm:py-2 sm:text-sm'>
                        <img className='w-5' src={assets.credit_icon} alt='' />
                        <p>Credits: {credit}</p>
                    </button>
                    <p className='hidden text-sm text-slate-700 sm:block'>Hi, {user.fullName}</p>
                    <UserButton />
                </div>
                : <button onClick={() => openSignIn({})} className='flex items-center gap-3 rounded-full bg-[#0f172a] px-4 py-2 text-sm font-medium text-white transition hover:bg-[#1e293b] sm:px-7 sm:py-2.5'>
                    Get Started <img className='w-3 sm:w-4' src={assets.arrow_icon} alt="" />
                </button>
            }
            </div>
        </div>
    )
}

export default Navbar