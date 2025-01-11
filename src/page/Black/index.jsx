import { black } from '../../utils/black';
import MusicPlayer from '../../components/MusicPlayer';

export const Black = () => {  
    const countdownTime1 = 15000;
    const countdouwnTime2 = 150000;

    return (
        <>
            <MusicPlayer 
            album={black} 
            countdownTime1={countdownTime1}
            countdouwnTime2={countdouwnTime2}
            />
        </>
    )
    
}