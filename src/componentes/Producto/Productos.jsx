import { Table, TableBody, TableCell, TableHead, TableRow, Button, TextField,Container,TablePagination,Stack,Box} from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';

const Productos = () => {
    const [productos, setProductos] = useState([]);
    const [idProveedor, setIdProveedor] = useState(''); // Inicializar el estado aquí
    const [idZona, setIdZona] = useState(''); // Estado para el ID de la zona
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        fetch('https://inv-wspruebatecnica-be.azurewebsites.net/api/Producto')
            .then((response) => response.json())
            .then((data) => {
                setProductos(data);
            });
    }, []);

    const agregarProducto = () => {
        navigate('/ui/agregar-Productos');
    };

    const handleEliminar = (productoId) => {
        if (window.confirm('¿Estás seguro de que deseas eliminar este producto?')) {
            fetch(`https://inv-wspruebatecnica-be.azurewebsites.net/api/Producto/${productoId}`, {
                method: 'DELETE'
            })
                .then((response) => {
                    if (response.status === 200) {
                        alert('Producto eliminado correctamente');
                        setProductos(productos.filter((producto) => producto.IdProducto !== productoId));
                    } else {
                        console.error('Error al eliminar el producto.');
                    }
                })
                .catch((error) => {
                    console.error('Error al eliminar el producto:', error);
                });
        }
    };
    const handleDescargarReporte = () => {
        fetch('https://inv-wspruebatecnica-be.azurewebsites.net/api/reporte/productos')
            .then((response) => {
                if (response.ok) return response.blob();
                throw new Error('No se pudo generar el reporte.');
            })
            .then((blob) => {
                // Crea un enlace para descargar el PDF
                const url = window.URL.createObjectURL(blob);
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', 'ReporteProductos.pdf');
                document.body.appendChild(link);
                link.click();
                link.parentNode.removeChild(link);
                window.URL.revokeObjectURL(url);
            })
            .catch((error) => {
                console.error('Error al descargar el archivo:', error);
                alert(error.message);
            });
    };
    const handleDescargarReportePorProveedor = () => {
        if (!idProveedor) {
            alert('Por favor, ingresa el ID del proveedor.');
            return;
        }
        const url = `https://inv-wspruebatecnica-be.azurewebsites.net/api/reporte/productosporproveedor/${idProveedor}`;
        fetch(url)
            .then(response => {
                if (response.status === 200) {
                    return response.blob();
                } else {
                    throw new Error('No se pudo generar el reporte.');
                }
            })
            .then(blob => {
                // Creamos un URL para el blob
                const blobUrl = window.URL.createObjectURL(blob);
                // Creamos un enlace temporal y lo configuramos para descarga
                const link = document.createElement('a');
                link.href = blobUrl;
                link.download = `Reporte_Productos_Proveedor_${idProveedor}.pdf`;
                // Añadimos el enlace al documento y lo hacemos clic automáticamente
                document.body.appendChild(link);
                link.click();
                // Limpiamos añadiendo un pequeño timeout para la descarga
                setTimeout(() => {
                    document.body.removeChild(link);
                    window.URL.revokeObjectURL(blobUrl);
                }, 100);
            })
            .catch(error => {
                console.error('Error al descargar el reporte:', error);
                alert('Error al descargar el reporte: ' + error.message);
            });
    };
    const handleQueryTopMarcasPorZona = () => {
        if (!idZona) {
            alert('Por favor, ingresa el ID de la zona.');
            return;
        }
        const url = `https://inv-wspruebatecnica-be.azurewebsites.net/api/reporte/topmarcasporzona/${idZona}`;
        fetch(url)
            .then(response => {
                if (response.ok) return response.json();
                throw new Error('No se pudo obtener el top de marcas por zona.');
            })
            .then(data => {
                console.log(data); // Aquí podrías establecer otro estado para almacenar los datos y mostrarlos en la UI
                alert('Consulta realizada con éxito, revisa la consola para ver los resultados.');
            })
            .catch(error => {
                console.error('Error al realizar la consulta:', error);
                alert('Error al realizar la consulta: ' + error.message);
            });
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    // Función para cambiar la cantidad de filas por página
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    // Función para filtrar productos
    const filteredProductos = productos.filter((producto) => {
        return producto.DescripcionProducto.toLowerCase().includes(searchTerm.toLowerCase());
    });

    return (
        <Container maxWidth="xl">
            <>
                <Box sx={{ my: 2 }}>
                    {/* Fila superior con botones de descarga e inputs */}
                    <Stack direction="row" justifyContent="space-between" spacing={2} mb={2}>
                        <Button variant="contained" color="primary" size="large" onClick={handleDescargarReporte}>
                            Descargar Reporte PDF
                        </Button>
                        <Button variant="contained" color="primary" size="large" onClick={handleDescargarReportePorProveedor}>
                            Descargar Reporte por Proveedor
                        </Button>
                        <TextField
                            label="ID Proveedor"
                            type="number"
                            value={idProveedor}
                            onChange={(e) => setIdProveedor(e.target.value)}
                            sx={{ mx: 2 }}
                        />
                        <Button variant="contained" color="primary" size="large" onClick={handleQueryTopMarcasPorZona}>
                            Query Top Marcas por Zona
                        </Button>
                        <TextField
                            label="ID Zona"
                            type="number"
                            value={idZona}
                            onChange={(e) => setIdZona(e.target.value)}
                            sx={{ mx: 2 }}
                        />
                    </Stack>
                    {/* Fila inferior con botón para agregar y campo de búsqueda */}
                    <Stack direction="row" justifyContent="space-between" spacing={2}>
                        <Button variant="contained" color="success" size="large" onClick={agregarProducto}>
                            Agregar Producto
                        </Button>
                        <TextField
                            label="Buscar Producto"
                            variant="outlined"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            sx={{ ml: 'auto' }} // Alinea el campo de búsqueda a la derecha
                        />
                    </Stack>
                </Box>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{ fontWeight: 'bold' }}>Código</TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }}>Descripción</TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }}>Precio</TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }}>Stock</TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }}>IVA</TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }}>Peso</TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }}>Marca</TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }}>Presentación</TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }}>Proveedor</TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }}>Zona</TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }}>Editar</TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }}>Eliminar</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredProductos
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((producto, index) => (
                                <TableRow key={producto.IdProducto || index}>
                                    <TableCell>{producto.Codigo}</TableCell>
                                    <TableCell>{producto.DescripcionProducto}</TableCell>
                                    <TableCell>Q{producto.Precio.toFixed(2)}</TableCell>
                                    <TableCell>{producto.Stock}</TableCell>
                                    <TableCell>{producto.Iva}</TableCell>
                                    <TableCell>lb {producto.Peso.toFixed(2)}</TableCell>
                                    <TableCell>{producto.MarcaDescripcion}</TableCell> {/* Considerar mejorar para mostrar nombre de marca */}
                                    <TableCell>{producto.PresentacionDescripcion}</TableCell> {/* Considerar mejorar para mostrar nombre de proveedor */}
                                    <TableCell>{producto.ProveedorDescripcion}</TableCell> {/* Considerar mejorar para mostrar nombre de zona */}
                                    <TableCell>{producto.ZonaDescripcion}</TableCell> {/* Considerar mejorar para mostrar nombre de presentación */}
                                    <TableCell>
                                        <Button
                                            variant="contained"
                                            sx={{
                                                backgroundColor: '#FFC107', // Amarillo ámbar
                                                '&:hover': {
                                                    backgroundColor: '#FFB300' // Amarillo más oscuro para el hover
                                                },
                                            }}
                                            size="small"
                                            onClick={() =>
                                                navigate(`/ui/editar-Productos/${producto.IdProducto}`, {
                                                    state: { producto: producto },
                                                })}
                                        >
                                            Editar
                                        </Button>
                                    </TableCell>
                                    <TableCell>
                                        <Button
                                            variant="contained"
                                            color="error"
                                            size="small"
                                            onClick={() => handleEliminar(producto.IdProducto)}
                                        >
                                            Eliminar
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                    </TableBody>
                </Table >
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={filteredProductos.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </>
        </Container>
    );
};

export default Productos;
