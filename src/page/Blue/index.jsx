import { blue } from '../../utils/blue';
import MusicPlayer from '../../components/MusicPlayer';

export const Blue = () => {  
    const countdownTime1 = 90000;
    // const countdouwnTime2 = 150000;

    return (
        <>  
            <h3>Azul Bebe</h3>
            <p>Em construção</p>
            <MusicPlayer 
            album={blue} 
            countdownTime1={countdownTime1}
            enabledTimers={{
                blues: true,
                blackBlue: false,
                preExam: false,
            }}
            />
        </>
    ) 
}