import { Children, createContext, useState, PropsWithChildren, useContext } from "react";
import { Track } from "../types";



type PlayerContextType = {
    track?: Track;
    setTract: (track: Track) => void;
}


const PlayerContext = createContext<PlayerContextType>({
    setTract: () => {},
})

export default function PlayerProvider({ children }: PropsWithChildren) {
    const [track, setTrack] = useState<Track>()

    console.log("Track: ", track)
    return (
        <PlayerContext.Provider value={{ track, setTrack }}>
            {children}
        </PlayerContext.Provider>
    )
}

export const usePlayerContext = () => useContext(PlayerContext)