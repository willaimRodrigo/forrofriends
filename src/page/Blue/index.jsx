import { blue } from '../../utils/blue';
import MusicPlayer from '../../components/MusicPlayer';

export const Blue = () => {  
    // const countdownTime1 = 15000;
    // const countdouwnTime2 = 150000;

    return (
        <>  
            <h3>Azul Bebe</h3>
            <MusicPlayer 
            album={blue} 
            // countdownTime1={countdownTime1}
            // countdouwnTime2={countdouwnTime2}
            />
        </>
    ) 
}