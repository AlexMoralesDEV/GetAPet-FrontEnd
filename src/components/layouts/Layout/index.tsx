import React from "react";
import Header from "../Header";
import Content from "../Content";

interface ILayoutProps {
    children: React.ReactNode;
}

const Layout: React.FC<ILayoutProps> = ({ children }) => {
    return (
        <>
            <Header />
            <Content>
                {children}
            </Content>
        </>
    )
}

export default Layout;