import React from "react";
import Layout from "../components/layouts/Layout";
import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "./app.routes";

const Routes: React.FC = () => {
    return (
        <Router>
            <Layout>
                <AppRoutes />
            </Layout>
        </Router>
    )
}

export default Routes;