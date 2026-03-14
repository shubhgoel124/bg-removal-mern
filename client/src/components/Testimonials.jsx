import React from 'react'
import { testimonialsData } from '../assets/assets';

const Testimonials = () => {

    return (
        <div className='mx-4 py-6 lg:mx-16'>

            {/* Title */}
            <h1 className='py-5 text-center text-2xl font-semibold text-[#0f172a] lg:py-14 md:text-3xl lg:text-4xl'>What creators say</h1>

            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-8 md:grid-cols-2">

                {
                    testimonialsData.map((item, index) => (
                        <div key={index} className='glass-card rounded-2xl p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md'>
                            <p className='text-4xl text-[#0f766e]'>"</p>
                            <p className='text-sm text-slate-600'>{item.text}</p>
                            <div className='mt-5 flex items-center gap-3'>
                                <img className='w-9 rounded-full' src={item.image} alt="" />
                                <div>
                                    <p className='font-medium text-slate-800'>{item.author}</p>
                                    <p className='text-sm text-slate-500'>{item.jobTitle}</p>
                                </div>
                            </div>
                        </div>
                    ))
                }

            </div>
        </div>
    )
}

export default Testimonials