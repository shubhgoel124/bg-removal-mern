import axios from 'axios';
import React, { useContext, useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { AppContext } from '../context/AppContext';
import { toast } from 'react-toastify';
import { useAuth, useUser } from '@clerk/clerk-react';

const Verify = () => {

    const [searchParams, setSearchParams] = useSearchParams()
    const { isSignedIn } = useUser()
    const { getToken } = useAuth()

    const success = searchParams.get("success")
    const transactionId = searchParams.get("transactionId")

    const { backendUrl, loadCreditsData } = useContext(AppContext)

    const navigate = useNavigate()

    // Function to verify stripe payment
    const verifyStripe = async () => {

        try {

            const token = await getToken()

            const { data } = await axios.post(backendUrl + "/api/user/verify-stripe", { success, transactionId }, { headers: { token } })

            if (data.success) {
                toast.success(data.message)
                loadCreditsData()
            } else {
                toast.error(data.message)
            }

            navigate("/")

        } catch (error) {
            toast.error(error.message)
            console.log(error)
        }

    }

    useEffect(() => {
        verifyStripe()
    }, [])

    return (
        <div className='min-h-[60vh] flex items-center justify-center'>
            <div className="w-20 h-20 border-4 border-gray-300 border-t-4 border-t-primary rounded-full animate-spin"></div>
        </div>
    )
}

export default Verify