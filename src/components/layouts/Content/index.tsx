import React from "react";
import Container from 'react-bootstrap/Container';

interface IContentProps {
    children: React.ReactNode;
}

const Content: React.FC<IContentProps> = ({ children }) => {
    return (
        <Container>
            {children}
        </Container>
    )
}

export default Content;