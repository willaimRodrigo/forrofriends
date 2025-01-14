import { black } from '../../utils/black';
import MusicPlayer from '../../components/MusicPlayer';

import "./style.scss";

export const Black = () => {  
    const countdownTime1 = 15000;
    const countdouwnTime2 = 150000;

    return (
        <div>
            <MusicPlayer 
            album={black} 
            countdownTime1={countdownTime1}
            countdouwnTime2={countdouwnTime2}
            />
        </div>
    ) 
}