import React, { useContext } from 'react'
import { AppContext } from '../context/AppContext'
import { useNavigate } from 'react-router-dom'

const Result = () => {

  const navigate = useNavigate()

  const { resultImage, image } = useContext(AppContext)

  return (
    <div className='mx-4 mt-8 min-h-[75vh] lg:mx-16'>

      <div className='glass-card rounded-3xl px-5 py-6 shadow-md sm:px-8'>

        {/* --------- Images Container --------- */}
        <div className='grid grid-cols-1 gap-8 sm:grid-cols-2'>

          {/* --------- Left Side --------- */}
          <div>
            <p className='mb-2 font-semibold text-slate-700'>Original</p>
            <img className='rounded-xl border border-slate-200' src={image ? URL.createObjectURL(image) : ''} alt='' />
          </div>

          {/* --------- Right Side --------- */}
          <div className='flex flex-col'>
            <p className='mb-2 font-semibold text-slate-700'>Background Removed</p>
            <div className='bg-layer relative h-full rounded-xl border border-slate-300'>
              <img src={resultImage ? resultImage : ""} alt='' />
              {!resultImage && image && <div className="absolute right-1/2 bottom-1/2  transform translate-x-1/2 translate-y-1/2 ">
                <div className="h-12 w-12 animate-spin rounded-full border-4 border-[#0f766e] border-t-transparent"></div>
              </div>}
            </div>
          </div>

        </div>

        {/* --------- Buttons --------- */}
        {resultImage && <div className='mt-6 flex flex-wrap items-center justify-center gap-4 sm:justify-end'>
          <button onClick={() => navigate('/')} className='rounded-full border border-[#0f766e] px-8 py-2.5 text-sm text-[#0f766e] transition hover:bg-[#ccfbf1]'>Try another image</button>
          <a href={resultImage} className='rounded-full bg-[#0f766e] px-8 py-2.5 text-sm text-white transition hover:bg-[#115e59]' download>Download image</a>
        </div>}

      </div>
    </div>
  )
}

export default Result