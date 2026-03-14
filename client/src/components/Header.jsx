import React, { useContext } from 'react'
import { assets } from '../assets/assets'
import { AppContext } from '../context/AppContext'

const Header = () => {

    const { removeBG } = useContext(AppContext)

    return (
        <div className='fade-up mx-4 mt-8 grid items-center gap-12 px-2 sm:mt-14 lg:mx-16 lg:grid-cols-2 lg:px-6'>
            {/* -------- Left Side --------- */}
            <div className='order-2 lg:order-1'>
                <p className='mb-4 inline-flex rounded-full border border-[#0f766e]/30 bg-white/70 px-4 py-1 text-xs font-medium uppercase tracking-[0.2em] text-[#0f766e]'>AI-powered studio</p>
                <h1 className='text-4xl font-bold leading-tight text-[#0f172a] sm:text-5xl xl:text-6xl'>
                    Remove image backgrounds in <span className='text-[#0f766e]'>one click</span>
                </h1>
                <p className='my-6 max-w-xl text-sm text-slate-600 sm:text-base'>Upload any photo and get a clean cutout in seconds. Built for creators, stores, and teams that need quick, polished visuals.</p>
                <div>
                    <input onChange={e => removeBG(e.target.files[0])} type="file" id="upload1" accept='image/*' hidden />
                    <label htmlFor='upload1' className='inline-flex cursor-pointer items-center gap-3 rounded-full bg-[#0f766e] px-8 py-3.5 text-sm font-medium text-white transition hover:bg-[#115e59]'>
                        <img width={20} src={assets.upload_btn_icon} alt="" />
                        <p>Upload your image</p>
                    </label>
                </div>
            </div>
            {/* -------- Right Side -------- */}
            <div className='glass-card order-1 w-full max-w-md justify-self-center overflow-hidden rounded-3xl p-4 shadow-lg lg:order-2 lg:max-w-lg'>
                <img className='rounded-2xl' src={assets.header_img} alt="" />
            </div>
        </div>
    )
}

export default Header