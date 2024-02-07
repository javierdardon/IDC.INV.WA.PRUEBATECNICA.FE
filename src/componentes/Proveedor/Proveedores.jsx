import { Table, TableBody, TableCell, TableHead, TableRow, Button ,Container,TextField,Stack,TablePagination} from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';

const Proveedores = () => {
    const [Proveedores, setProveedores] = useState([]);
    const navigate = useNavigate();

    const [searchTerm, setSearchTerm] = useState('');
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    useEffect(() => {
        const jwtToken = localStorage.getItem('jwtToken');
        fetch('https://inv-wspruebatecnica-be.azurewebsites.net/api/Proveedor' )
            .then((response) => response.json())
            .then((data) => {
                setProveedores(data);
            });
    }, []);

    const agregarProveedor = () => {
        navigate('/ui/agregar-Proveedor');
    };

    const handleEliminar = (ProveedorId) => {
        const jwtToken = localStorage.getItem('jwtToken');
        if (window.confirm('¿Estás seguro de que deseas eliminar esta categoría?')) {
            fetch(`https://inv-wspruebatecnica-be.azurewebsites.net/api/Proveedor/${ProveedorId}`, {
                method: 'DELETE'
            })
                .then((response) => {
                    if (response.status === 200) {
                        alert('Categoría eliminada correctamente');
                        setProveedores(Proveedores.filter((Proveedor) => Proveedor.IdProveedor !== ProveedorId));
                    } else {
                        console.error('Error al eliminar la categoría.');
                    }
                })
                .catch((error) => {
                    console.error('Error al eliminar la categoría:', error);
                });
        }
    };

    const filteredProveedores = Proveedores.filter((proveedor) =>
    proveedor.Descripcion.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    return (
        <Container maxWidth="xl">
            <>
                <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 2 }}>
                    <Button variant="contained" color="success" size="large" onClick={agregarProveedor}>
                        Agregar Proveedor
                    </Button>
                    <TextField
                        label="Buscar Proveedor"
                        variant="outlined"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        sx={{ minWidth: 300 }}
                    />
                </Stack>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{ fontWeight: 'bold' }}>Descripcion</TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }}>Editar</TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }}>Eliminar</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredProveedores
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((Proveedor, index) => (
                                <TableRow key={index}>
                                    <TableCell>{Proveedor.Descripcion}</TableCell>
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
                                            data-id={Proveedor.IdProveedor}
                                            onClick={() =>
                                                navigate(`/ui/editar-Proveedor/${Proveedor.IdProveedor}`, {
                                                    state: { Proveedor: Proveedor },
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
                                            onClick={() => handleEliminar(Proveedor.IdProveedor)}
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
                count={filteredProveedores.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </>
        </Container>
    );
};

export default Proveedores;
