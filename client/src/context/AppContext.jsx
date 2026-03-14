import { useAuth, useClerk, useUser } from "@clerk/clerk-react";
import { createContext, useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { toast } from "react-toastify";


export const AppContext = createContext()

const AppContextProvider = (props) => {

    const navigate = useNavigate()
    const [image, setImage] = useState(false)
    const [resultImage, setResultImage] = useState(false)
    const { getToken } = useAuth()
    const { isSignedIn } = useUser()
    const { openSignIn } = useClerk()
    const backendUrl = import.meta.env.VITE_BACKEND_URL

    const [credit, setCredit] = useState(false)
    const [platformStats, setPlatformStats] = useState({
        totalUsers: 0,
        totalProcessedImages: 0,
    })
    const pollingIntervalRef = useRef(null)

    const loadCreditsData = async () => {
        try {
            const token = await getToken()
            const { data } = await axios.get(backendUrl + '/api/user/credits', { headers: { token } })
            if (data.success) {
                setCredit(data.credits)
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }


    const removeBG = async (image) => {
        try {

            if (!isSignedIn) {
                return openSignIn()
            }

            setResultImage(false)
            setImage(image)

            navigate('/result')

            const token = await getToken()

            const formData = new FormData()
            image && formData.append('image', image)

            const { data } = await axios.post(backendUrl + '/api/image/remove-bg', formData, { headers: { token } })

            if (data.success) {
                setResultImage(data.resultImage)
                data.creditBalance && setCredit(data.creditBalance)
                setPlatformStats(prev => ({
                    ...prev,
                    totalProcessedImages: prev.totalProcessedImages + 1,
                }))
            } else {
                toast.error(data.message)
                data.creditBalance && setCredit(data.creditBalance)
                if (data.creditBalance === 0) {
                    navigate('/buy')
                }
            }

        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }

    }

    const loadPlatformStats = useCallback(async () => {
        try {
            const { data } = await axios.get(backendUrl + '/api/user/stats')
            if (data.success && data.stats) {
                setPlatformStats(prev => ({
                    totalUsers: Number(data.stats.totalUsers) || 0,
                    totalProcessedImages: Math.max(
                        Number(data.stats.totalProcessedImages) || 0,
                        prev.totalProcessedImages
                    ),
                }))
            }
        } catch (error) {
            console.log(error)
        }
    }, [backendUrl])

    const STATS_POLL_INTERVAL = 30_000

    const startStatsPolling = useCallback(() => {
        loadPlatformStats()
        if (pollingIntervalRef.current) {
            clearInterval(pollingIntervalRef.current)
        }
        pollingIntervalRef.current = setInterval(() => {
            loadPlatformStats()
        }, STATS_POLL_INTERVAL)
    }, [loadPlatformStats])

    const stopStatsPolling = useCallback(() => {
        if (pollingIntervalRef.current) {
            clearInterval(pollingIntervalRef.current)
            pollingIntervalRef.current = null
        }
    }, [])

    useEffect(() => {
        return () => stopStatsPolling()
    }, [stopStatsPolling])

    const value = {
        image, setImage,
        backendUrl,
        removeBG,
        loadCreditsData,
        startStatsPolling,
        stopStatsPolling,
        resultImage, setResultImage,
        credit,
        platformStats,
    }

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )

}

export default AppContextProvider