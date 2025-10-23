import { useAuth, useClerk, useUser } from "@clerk/clerk-react";
import { createContext, useState } from "react";
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

    const value = {
        image, setImage,
        backendUrl,
        removeBG,
        loadCreditsData,
        resultImage, setResultImage,
        credit
    }

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )

}

export default AppContextProvider