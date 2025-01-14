import MusicPlayer from "../../components/MusicPlayer"
import { blueadv } from "../../utils/blueadv"

export const BlueAdv = () => {
    return (
        <>
            <h3>Azul Avancada</h3>
            <MusicPlayer album={blueadv} />
        </>
    )
}