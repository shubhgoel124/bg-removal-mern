import React from 'react'
import { assets } from '../assets/assets'

const Steps = () => {
    return (
        <div className='mx-4 py-20 lg:mx-16 xl:py-28'>

            <h1 className='text-center text-2xl font-semibold text-[#0f172a] md:text-3xl lg:text-4xl'>Three steps to studio-ready cutouts</h1>

            <div className='mt-12 grid grid-cols-1 gap-5 md:grid-cols-3 xl:mt-16'>

                <div className='glass-card rounded-2xl p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md'>
                    <img className='max-w-9' src={assets.upload_icon} alt="Upload" />
                    <div>
                        <p className='mt-4 text-xl font-semibold'>Upload image</p>
                        <p className='mt-2 text-sm text-slate-600'>Drop a JPG or PNG and we start processing instantly.</p>
                    </div>
                </div>

                <div className='glass-card rounded-2xl p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md'>
                    <img className='max-w-9' src={assets.remove_bg_icon} alt="Remove background" />
                    <div>
                        <p className='mt-4 text-xl font-semibold'>AI removes background</p>
                        <p className='mt-2 text-sm text-slate-600'>Our model isolates your subject with sharp edges and high accuracy.</p>
                    </div>
                </div>

                <div className='glass-card rounded-2xl p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md'>
                    <img className='max-w-9' src={assets.download_icon} alt="Download" />
                    <div>
                        <p className='mt-4 text-xl font-semibold'>Download and use</p>
                        <p className='mt-2 text-sm text-slate-600'>Export your transparent image and publish it anywhere.</p>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Steps