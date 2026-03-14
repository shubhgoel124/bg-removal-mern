import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
  return (
    <div className='mx-4 mb-4 mt-4 rounded-2xl border border-[#0f766e]/20 bg-white/70 px-4 py-3 backdrop-blur lg:mx-16'>
      <div className='flex flex-wrap items-center justify-between gap-4'>
        <img width={150} src={assets.logo} alt="" />
        <p className='text-sm text-slate-600'>Copyright Bg Remover | All rights reserved.</p>
        <div className='flex gap-1'>
          <img width={36} src={assets.facebook_icon} alt="Facebook" />
          <img width={36} src={assets.twitter_icon} alt="Twitter" />
          <img width={36} src={assets.google_plus_icon} alt="Google" />
        </div>
      </div>
    </div>
  )
}

export default Footer