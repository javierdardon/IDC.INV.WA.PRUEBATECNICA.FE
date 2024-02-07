import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
    // Estilos directamente en el componente
    const navbarStyle = {
        backgroundColor: '#333',
        overflow: 'hidden',
        fontFamily: 'Arial, sans-serif',
    };

    const linkStyle = {
        float: 'left',
        display: 'block',
        color: '#f2f2f2',
        textAlign: 'center',
        padding: '14px 16px',
        textDecoration: 'none',
    };

    return (
        <div style={navbarStyle}>
            <a href="/productos" style={linkStyle}>Productos</a>
            <a href="/marcas" style={linkStyle}>Marcas</a>
            <a href="/proveedores" style={linkStyle}>Proveedores</a>
            <a href="/zonas" style={linkStyle}>Zonas</a>
            <a href="/presentaciones" style={linkStyle}>Presentaciones</a>
            {/* Otros enlaces que necesites */}
        </div>
    );
};

export default Navbar;
