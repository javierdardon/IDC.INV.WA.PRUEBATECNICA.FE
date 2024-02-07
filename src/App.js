import {Route, Routes} from "react-router-dom";
import Marcas from "./componentes/Marca/Marcas";
import AgregarMarca from "./componentes/Marca/AgregarMarca";
import AgregarProveedores from "./componentes/Proveedor/AgregarProveedores";
import Proveedores from "./componentes/Proveedor/Proveedores";
import Zonas from "./componentes/zona/Zonas";
import AgregarZonas from "./componentes/zona/AgregarZonas";
import Presentaciones from "./componentes/Presentacion/Presentaciones";
import AgregarPresentaciones from "./componentes/Presentacion/AgregarPresentaciones";
import Productos from "./componentes/Producto/Productos";
import AgregarProductos from "./componentes/Producto/AgregarProductos";
import Layout from "./componentes/Layout";



export default function App() {
    return (
        <div className="App">
            <Routes>
                <Route  path="/" element={<Layout/>}>
                    <Route index element={<Productos />} />
                    <Route path="/Marcas" element={<Marcas/>}/>
                    <Route path="/ui/agregar-Marca" element={<AgregarMarca/>}/>
                    <Route path="/ui/editar-Marca/:IdMarca" element={<AgregarMarca/>}/>
                    <Route path="/proveedores" element={<Proveedores/>}/>
                    <Route path="/ui/agregar-Proveedor" element={<AgregarProveedores/>}/>
                    <Route path="/ui/editar-Proveedor/:IdProveedor" element={<AgregarProveedores/>}/>
                    <Route path="/zonas" element={<Zonas/>}/>
                    <Route path="/ui/agregar-Zona" element={<AgregarZonas/>}/>
                    <Route path="/ui/editar-Zona/:IdZona" element={<AgregarZonas/>}/>
                    <Route path="/Presentaciones" element={<Presentaciones/>}/>
                    <Route path="/ui/agregar-Presentacion" element={<AgregarPresentaciones/>}/>
                    <Route path="/ui/editar-Presentacion/:IdPresentacion" element={<AgregarPresentaciones/>}/>
                    <Route path="/Productos" element={<Productos/>}/>
                    <Route path="/ui/agregar-Productos" element={<AgregarProductos/>}/>
                    <Route path="/ui/editar-Productos/:IdProductos" element={<AgregarProductos/>}/>
                </Route>
            </Routes>
        </div>
    );
}
