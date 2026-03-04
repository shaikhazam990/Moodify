import { createContext } from "react";
import { useState } from "react"

export const SongContext = createContext()

export const SongContextProvider = ({children})=>{

    const [song, setSong] = useState({
        "url": "https://ik.imagekit.io/gdmcmlxtw/cohort-2/moodify/songs/Kaun_Thagwa__From__Jaaiye_Aap_Kahan_Jaayenge___pHRjTDnRk.mp3",
        "posterUrl": "https://ik.imagekit.io/gdmcmlxtw/cohort-2/moodify/posters/Kaun_Thagwa__From__Jaaiye_Aap_Kahan_Jaayenge___i33yzpXBH.jpeg",
        "title": "Kaun Thagwa (From \"Jaaiye Aap Kahan Jaayenge\")",
        "mood": "surprised",
    })

    const [loading, setLoading] = useState(false)

    return(
        <SongContext.Provider value={{song, setSong,loading,setLoading}}>
            {children}
        </SongContext.Provider>
    )

}