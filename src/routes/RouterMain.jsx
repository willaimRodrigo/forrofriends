import { Route, Routes } from "react-router-dom";
import { HomePage } from "../page/HomePage";
import { Playlists } from "../page/Playlists";
import { Black } from "../page/Black";
import { BlueAdv } from "../page/BlueAdv";
import { About } from "../page/About";
import { Blue } from "../page/Blue";
import { Party } from "../page/Party";
import { Blueint } from "../page/Blueint";
import { White } from "../page/White";
import { Pre } from "../page/Pre";
import { Tutorials } from "../components/Tutorials";

export const RouterMain = () => {
    return (
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/playlists" element={<Playlists />} />
            <Route path="/pre" element={<Pre />} />
            <Route path="/black" element={<Black />} />
            <Route path="/blueadv" element={<BlueAdv />} />
            <Route path="/blueint" element={<Blueint />} />
            <Route path="/blue" element={<Blue />} />
            <Route path="/white" element={<White />} />
            <Route path="/party" element={<Party />} />
            <Route path="/about" element={<About />} />
            <Route path="/tutorials" element={<Tutorials />} />
        </Routes>
    )
}