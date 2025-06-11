import React from 'react';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Settings from "./settings/Settings";
import Home from "./home/Home";

function App(props) {
    return (
        <div>
            <BrowserRouter>
                <Routes>
                    <Route path={"/"} element={<Home/>}/>
                    <Route path={"/settings"} element={<Settings/>}/>
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;