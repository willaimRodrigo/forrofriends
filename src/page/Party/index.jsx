import { party } from '../../utils/party';
import MusicPlayer from '../../components/MusicPlayer';

export const Party = () => {  
    // const countdownTime1 = 15000;
    // const countdouwnTime2 = 150000;

    return (
        <>
            <h2>Baile</h2>
            <MusicPlayer 
            album={party} 
                enabledTimers={{
                    blues: false,
                    blackBlue: false,
                    preExam: false,
                }}
            />
        </>
    ) 
}