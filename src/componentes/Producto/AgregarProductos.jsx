import React, { useState,useEffect } from 'react';
import { Box, Typography, Button, Stack, TextField,MenuItem,Select,FormControl,InputLabel } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';

const AgregarProducto = () => {
    const { state } = useLocation();
    const navigate = useNavigate();
    const productoData = state?.producto || {};
    const isEditing = !!productoData.IdProducto;
    
    const [marca, setMarca] = useState({ IdMarca: '' });
    const [marcas, setMarcas] = useState([]);

    const [presentacion, setPresentacion] = useState({ IdPresentacion: '' });
    const [presentaciones, setPresentaciones] = useState([]);
    const [proveedor, setProveedor] = useState({ IdProveedor: '' });
    const [proveedores, setProveedores] = useState([]);
    const [zona, setZona] = useState({ IdZona: '' });
    const [zonas, setZonas] = useState([]);
    
    

    // Estados para cada propiedad del producto
    const [codigo, setCodigo] = useState(isEditing ? productoData.Codigo : '');
    const [descripcionProducto, setDescripcionProducto] = useState(isEditing ? productoData.DescripcionProducto : '');
    const [precio, setPrecio] = useState(isEditing ? productoData.Precio : 0);
    const [stock, setStock] = useState(isEditing ? productoData.Stock : 0);
    const [iva, setIva] = useState(isEditing ? productoData.Iva : 0);
    const [peso, setPeso] = useState(isEditing ? productoData.Peso : 0);
    const [idMarca, setIdMarca] = useState(isEditing ? productoData.IdMarca : '');
    const [idPresentacion, setIdPresentacion] = useState(isEditing ? productoData.IdPresentacion : '');
    const [idProveedor, setIdProveedor] = useState(isEditing ? productoData.IdProveedor : '');
    const [idZona, setIdZona] = useState(isEditing ? productoData.IdZona : '');

    useEffect(() => {
        // Carga inicial de datos
        const cargarDatos = async () => {
            try {
                const [resMarcas, resPresentaciones, resProveedores, resZonas] = await Promise.all([
                    fetch('https://inv-wspruebatecnica-be.azurewebsites.net/api/Marca').then(res => res.json()),
                    fetch('https://inv-wspruebatecnica-be.azurewebsites.net/api/Presentacion').then(res => res.json()),
                    fetch('https://inv-wspruebatecnica-be.azurewebsites.net/api/Proveedor').then(res => res.json()),
                    fetch('https://inv-wspruebatecnica-be.azurewebsites.net/api/Zona').then(res => res.json()),
                ]);
                setMarcas(resMarcas);
                setPresentaciones(resPresentaciones);
                setProveedores(resProveedores);
                setZonas(resZonas);
            } catch (error) {
                console.error("Error al cargar datos: ", error);
            }
        };
        cargarDatos();
    }, []);
    
    const handleSubmit = () => {
        if (isEditing) {
            handleActualizar(productoData.IdProducto);
        } else {
            handleCrear();
        }
    };

    const handleCrear = async () => {
        const response = await fetch('https://inv-wspruebatecnica-be.azurewebsites.net/api/Producto', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                Codigo: codigo,
                DescripcionProducto: descripcionProducto,
                Precio: parseFloat(precio),
                Stock: parseInt(stock, 10),
                Iva: parseFloat(iva),
                Peso: parseFloat(peso),
                IdMarca: parseInt(marca.IdMarca, 10),
                IdPresentacion: parseInt(presentacion.IdPresentacion, 10),
                IdProveedor: parseInt(proveedor.IdProveedor, 10),
                IdZona: parseInt(zona.IdZona, 10),
            }),
        });

        if (response.status === 200) {
            alert('Producto registrado correctamente');
            navigate('/productos');
        } else {
            alert('Error al registrar el producto.');
        }
    };

    const handleActualizar = async () => {
        const response = await fetch('https://inv-wspruebatecnica-be.azurewebsites.net/api/Producto', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                IdProducto: parseInt(productoData.IdProducto),
                Codigo: codigo,
                DescripcionProducto: descripcionProducto,
                Precio: parseFloat(precio),
                Stock: parseInt(stock),
                Iva: parseFloat(iva),
                Peso: parseFloat(peso),
                IdMarca: parseInt(marca.IdMarca, 10),
                IdPresentacion: parseInt(presentacion.IdPresentacion, 10),
                IdProveedor: parseInt(proveedor.IdProveedor, 10),
                IdZona: parseInt(zona.IdZona, 10),
            }),
        });
        console.log(response.json())
        if (response.status === 200) {
            alert('Producto actualizado correctamente');
            navigate('/productos');
        } else {
            alert('Error al actualizar el producto.');
            
        }
    };



    return (
        <Box sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
                {isEditing ? 'Editar Producto' : 'Agregar Producto'}
            </Typography>
            <Stack spacing={3}>
                {/* Repetir para cada propiedad del producto */}
                <TextField
                    label="Código"
                    variant="outlined"
                    value={codigo}
                    onChange={(e) => setCodigo(e.target.value)}
                />
                <TextField
                    label="Descripción del Producto"
                    variant="outlined"
                    value={descripcionProducto}
                    onChange={(e) => setDescripcionProducto(e.target.value)}
                />
                <TextField
                    label="Precio"
                    variant="outlined"
                    type="number"
                    value={precio}
                    onChange={(e) => setPrecio(e.target.value)}
                />
                <TextField
                    label="Stock"
                    variant="outlined"
                    type="number"
                    value={stock}
                    onChange={(e) => setStock(e.target.value)}
                />
                <TextField
                    label="IVA"
                    variant="outlined"
                    type="number"
                    value={iva}
                    onChange={(e) => setIva(e.target.value)}
                />
                <TextField
                    label="Peso"
                    variant="outlined"
                    type="number"
                    value={peso}
                    onChange={(e) => setPeso(e.target.value)}
                />
                
                <FormControl variant="outlined" fullWidth>
                    <InputLabel id="marca-label">Marca</InputLabel>
                    <Select
                    labelId="marca-label"
                    id="marca"
                    value={marca.IdMarca}
                    onChange={(e) => setMarca(marcas.find((m) => m.IdMarca === parseInt(e.target.value, 10)) || { IdMarca: '' })}
                    label="Marca" // Debes agregar esto para que el espacio para la etiqueta se calcule correctamente
                    >
                    {marcas.map((marcaItem) => (
                        <MenuItem key={marcaItem.IdMarca} value={marcaItem.IdMarca}>
                        {marcaItem.Descripcion}
                        </MenuItem>
                    ))}
                    </Select>
                </FormControl>


                                <FormControl variant="outlined" fullWidth>
                    <InputLabel id="presentacion-label">Presentación</InputLabel>
                    <Select
                        labelId="presentacion-label"
                        id="presentacion"
                        value={presentacion.IdPresentacion}
                        onChange={(e) => setPresentacion(presentaciones.find((p) => p.IdPresentacion === parseInt(e.target.value, 10)) || { IdPresentacion: '' })}
                        label="Presentación" // Esto asegura que la etiqueta se muestre correctamente
                    >
                        {presentaciones.map((item) => (
                            <MenuItem key={item.IdPresentacion} value={item.IdPresentacion}>
                                {item.Descripcion}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <FormControl variant="outlined" fullWidth>
                    <InputLabel id="proveedor-label">Proveedor</InputLabel>
                    <Select
                        labelId="proveedor-label"
                        id="proveedor"
                        value={proveedor.IdProveedor}
                        onChange={(e) => setProveedor(proveedores.find((p) => p.IdProveedor === parseInt(e.target.value, 10)) || { IdProveedor: '' })}
                        label="Proveedor" // Esto asegura que la etiqueta se muestre correctamente
                    >
                        {proveedores.map((item) => (
                            <MenuItem key={item.IdProveedor} value={item.IdProveedor}>
                                {item.Descripcion}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <FormControl variant="outlined" fullWidth>
                    <InputLabel id="zona-label">Zona</InputLabel>
                    <Select
                        labelId="zona-label"
                        id="zona"
                        value={zona.IdZona}
                        onChange={(e) => setZona(zonas.find((p) => p.IdZona === parseInt(e.target.value, 10)) || { IdZona: '' })}
                        label="Zona" // Esto asegura que la etiqueta se muestre correctamente
                    >
                        {zonas.map((item) => (
                            <MenuItem key={item.IdZona} value={item.IdZona}>
                                {item.Descripcion}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <Button
                    color="primary"
                    variant="contained"
                    size="large"
                    fullWidth
                    onClick={handleSubmit}
                    sx={{ mt: 2 }}
                >
                    {isEditing ? 'Actualizar Producto' : 'Agregar Producto'}
                </Button>
            </Stack>
        </Box>
    );
};

export default AgregarProducto; 