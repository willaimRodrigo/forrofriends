import { Route, Routes } from "react-router-dom";
import { HomePage } from "../page/HomePage";
import { Playlists } from "../page/Playlists";
import { Black } from "../page/Black";
import { BlueAdv } from "../page/BlueAdv";
import { About } from "../page/About";
import { Blue } from "../page/Blue";
import { Party } from "../page/Party";

export const RouterMain = () => {
    return (
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/playlists" element={<Playlists />} />
            <Route path="/black" element={<Black />} />
            <Route path="/blueadv" element={<BlueAdv />} />
            <Route path="/blue" element={<Blue />} />
            <Route path="/party" element={<Party />} />
            <Route path="/about" element={<About />} />
        </Routes>
    )
}