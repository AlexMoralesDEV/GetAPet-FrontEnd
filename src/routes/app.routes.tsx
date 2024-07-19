import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../components/pages/Home";
import Pet from "../components/pages/Pet";
import User from "../components/pages/User";

const AppRoutes: React.FC = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/pet" element={<Pet />} />
            <Route path="/user" element={<User />} />
        </Routes>
    )
}

export default AppRoutes;