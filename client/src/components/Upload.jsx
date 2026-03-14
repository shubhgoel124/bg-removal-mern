import React, { useContext } from 'react'
import { assets } from '../assets/assets'
import { AppContext } from '../context/AppContext'

const Upload = () => {

    const { removeBG } = useContext(AppContext)

    return (
        <div className='pb-16 pt-8'>
            {/* Title */}
            <h1 className='py-6 text-center text-2xl font-semibold text-[#0f172a] md:py-12 md:text-3xl lg:text-4xl'>Ready to create your clean cutout?</h1>

            <div className='text-center mb-24'>
                <input onChange={e => removeBG(e.target.files[0])} type="file" id="upload2" hidden />
                <label htmlFor='upload2' className='inline-flex cursor-pointer items-center gap-3 rounded-full bg-[#0f766e] px-8 py-3.5 font-medium text-white transition hover:bg-[#115e59]'>
                    <img width={20} src={assets.upload_btn_icon} alt="" />
                    <p className='text-sm'>Upload your image</p>
                </label>
            </div>
        </div>
    )
}

export default Upload