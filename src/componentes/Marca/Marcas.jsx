import { Table, TableBody, TableCell, TableHead, TableRow, Button ,Container,TextField,Stack,TablePagination} from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';

const Marcas = () => {
    const [Marcas, setMarcas] = useState([]);
    const navigate = useNavigate();

    //paginacion y filtro
    const [searchTerm, setSearchTerm] = useState('');
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    

    useEffect(() => {
        const jwtToken = localStorage.getItem('jwtToken');
        fetch('https://inv-wspruebatecnica-be.azurewebsites.net/api/Marca' )
            .then((response) => response.json())
            .then((data) => {
                setMarcas(data);
            });
    }, []);

    const agregarMarca = () => {
        navigate('/ui/agregar-Marca');
    };

    const handleEliminar = (MarcaId) => {
        const jwtToken = localStorage.getItem('jwtToken');
        if (window.confirm('¿Estás seguro de que deseas eliminar esta categoría?')) {
            fetch(`https://inv-wspruebatecnica-be.azurewebsites.net/api/Marca/${MarcaId}`, {
                method: 'DELETE'
            })
                .then((response) => {
                    if (response.status === 200) {
                        alert('Categoría eliminada correctamente');
                        setMarcas(Marcas.filter((Marca) => Marca.IdMarca !== MarcaId));
                    } else {
                        console.error('Error al eliminar la categoría.');
                    }
                })
                .catch((error) => {
                    console.error('Error al eliminar la categoría:', error);
                });
        }
    };
    const filteredMarcas = Marcas.filter((marca) =>
        marca.Descripcion.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Cambiar la página
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    // Cambiar la cantidad de filas por página
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0); // Resetear la página al cambiar las filas por página
    };
    

    return (
        <Container maxWidth="xl">
            <>
                <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 2 }}>
                    <Button variant="contained" color="success" size="large" onClick={agregarMarca}>
                        Agregar Marca
                    </Button>
                    <TextField
                        label="Buscar Marca"
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
                        {filteredMarcas
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((Marca, index) => (
                                <TableRow key={index}>
                                    <TableCell>{Marca.Descripcion}</TableCell>
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
                                                navigate(`/ui/editar-Marca/${Marca.IdMarca}`, {
                                                    state: { Marca: Marca },
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
                                            onClick={() => handleEliminar(Marca.IdMarca)}
                                        >
                                            Eliminar
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))
                        }
                    </TableBody>
                </Table >
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={filteredMarcas.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </>
        </Container>
    );
};

export default Marcas;
