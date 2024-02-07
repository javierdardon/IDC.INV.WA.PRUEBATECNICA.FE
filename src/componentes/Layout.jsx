import { Outlet } from 'react-router-dom';
import Navbar from "./Navbar";

const Layout = () => {
    const layoutStyle = {
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        textAlign: 'center',
    };

    const titleStyle = {
        fontSize: '24px',
        color: '#333',
        margin: '20px 0',
    };

    const outletContainerStyle = {
        marginTop: '20px', // Ajusta la cantidad de espacio hacia abajo que deseas
    };

    return (
        <div style={layoutStyle}>
            <h1 style={titleStyle}>Prueba Técnica</h1>
            <Navbar />
            <div style={outletContainerStyle}>
                <Outlet />
            </div>
        </div>
    );
}

export default Layout;
