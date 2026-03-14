import React, { useContext } from 'react'
import { assets } from '../assets/assets'
import { useAuth } from '@clerk/clerk-react'
import { toast } from 'react-toastify'
import axios from 'axios'
import { AppContext } from '../context/AppContext'
import { useNavigate } from 'react-router-dom'
import { plans } from '../assets/assets'

const BuyCredit = () => {


  const { backendUrl, loadCreditsData } = useContext(AppContext)
  const navigate = useNavigate()

  const { getToken } = useAuth()

  const initPay = (order) => {
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      name: 'Credits Payment',
      description: "Credits Payment",
      order_id: order.id,
      receipt: order.receipt,
      handler: async (response) => {

        console.log(response)
        const token = await getToken()

        try {
          const { data } = await axios.post(backendUrl + "/api/user/verify-razor", response, { headers: { token } })
          if (data.success) {
            loadCreditsData()
            navigate('/')
          }
        } catch (error) {
          console.log(error)
          toast.error(error.message)
        }
      }
    };
    const rzp = new window.Razorpay(options)
    rzp.open();
  };

  const paymentRazorpay = async (planId) => {
    try {

      const token = await getToken()
      const { data } = await axios.post(backendUrl + '/api/user/pay-razor', { planId }, { headers: { token } })
      if (data.success) {
        initPay(data.order)
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  return (
    <div className='relative min-h-[80vh] px-4 py-14 lg:px-16'>
      <div className='mx-auto max-w-6xl text-center'>
        <button className='rounded-full border border-[#0f766e]/40 bg-white/70 px-8 py-2 text-sm font-medium text-[#0f766e] shadow-sm backdrop-blur'>Credit Packs</button>
        <h1 className='mt-5 text-3xl font-bold leading-tight text-[#0f172a] sm:text-4xl lg:text-5xl'>Choose a plan and top up in seconds</h1>
        <p className='mx-auto mt-3 max-w-2xl text-sm text-slate-600 sm:text-base'>Pay once with Razorpay and immediately unlock more background removals.</p>
      </div>

      <div className='mx-auto mt-10 grid max-w-6xl grid-cols-1 gap-6 text-left md:grid-cols-2 lg:grid-cols-3'>
        {plans.map((item, index) => (
          <div className='group rounded-3xl border border-[#0f766e]/20 bg-white/80 p-8 text-slate-700 shadow-md transition duration-300 hover:-translate-y-1 hover:shadow-xl' key={index}>
            <img width={40} src={assets.logo_icon} alt='' />
            <p className='mt-4 text-lg font-semibold'>{item.id}</p>
            <p className='mt-1 text-sm text-slate-500'>{item.desc}</p>
            <p className='my-6 text-lg'>
              <span className='text-3xl font-bold text-[#0f172a]'>₹{item.price}</span> for {item.credits} credits
            </p>

            <button onClick={() => paymentRazorpay(item.id)} className='mt-3 flex w-full items-center justify-center gap-3 rounded-xl border border-[#0f766e]/40 bg-[#0f766e] px-4 py-3 text-sm font-medium text-white transition hover:bg-[#115e59]'>
              <img className='h-4' src={assets.razorpay_logo} alt="Razorpay" />
              Continue with Razorpay
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default BuyCredit