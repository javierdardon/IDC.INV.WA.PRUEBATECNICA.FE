import { Table, TableBody, TableCell, TableHead, TableRow, Button ,Container,TextField,Stack,TablePagination} from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';

const Zonas = () => {
    const [Zonas, setZonas] = useState([]);
    const navigate = useNavigate();

    const [searchTerm, setSearchTerm] = useState('');
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    useEffect(() => {
        const jwtToken = localStorage.getItem('jwtToken');
        fetch('https://inv-wspruebatecnica-be.azurewebsites.net/api/Zona' )
            .then((response) => response.json())
            .then((data) => {
                setZonas(data);
            });
    }, []);

    const agregarZona = () => {
        navigate('/ui/agregar-Zona');
    };

    const handleEliminar = (ZonaId) => {
        const jwtToken = localStorage.getItem('jwtToken');
        if (window.confirm('¿Estás seguro de que deseas eliminar esta categoría?')) {
            fetch(`https://inv-wspruebatecnica-be.azurewebsites.net/api/Zona/${ZonaId}`, {
                method: 'DELETE'
            })
                .then((response) => {
                    if (response.status === 200) {
                        alert('Categoría eliminada correctamente');
                        setZonas(Zonas.filter((Zona) => Zona.IdZona !== ZonaId));
                    } else {
                        console.error('Error al eliminar la categoría.');
                    }
                })
                .catch((error) => {
                    console.error('Error al eliminar la categoría:', error);
                });
        }
    };
    const filteredZonas = Zonas.filter((zona) =>
        zona.Descripcion.toLowerCase().includes(searchTerm.toLowerCase())
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
                    <Button variant="contained" color="success" size="large" onClick={agregarZona}>
                        Agregar Zona
                    </Button>
                    <TextField
                        label="Buscar Zona"
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
                        {filteredZonas
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((Zona, index) => (
                                <TableRow key={index}>
                                    <TableCell>{Zona.Descripcion}</TableCell>
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
                                            data-id={Zona.IdZona}
                                            onClick={() =>
                                                navigate(`/ui/editar-Zona/${Zona.IdZona}`, {
                                                    state: { Zona: Zona },
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
                                            onClick={() => handleEliminar(Zona.IdZona)}
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
                    count={filteredZonas.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </>
        </Container>
    );
};

export default Zonas;
