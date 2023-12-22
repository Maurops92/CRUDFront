import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.scss';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Personal from './pages/Personal/Personal';
import React, { useEffect, useState } from 'react';
import usuariosJson from './user.json';
import AltaMozos from './pages/Mozos/AltaMozo';
import Mesas from './pages/Mesas/Mesas';
import VentaPage from './pages/Ventas/Ventas';

function App() {
  useEffect(() => {
    localStorage.setItem("usuarios", JSON.stringify(usuariosJson.usuarios));
  }, []);

const userRoles = JSON.parse(localStorage.getItem("usuarios"))?.map(user => user.rol) || [];

const [people, setPeople] = useState([]);
const [mesas, setMesas] = useState([]);

const handleAddPerson = (updatedPeople) => {
  console.log('Lista actualizada de personas:', updatedPeople);

  setPeople(updatedPeople);
};
const handleAddMesa = (updatedMesas) => {
  console.log('Lista actualizada de mesas:', updatedMesas);
  setMesas(updatedMesas);
};

  return (
    <Router>
      <Navbar />
      <div className='flex'>
      <Sidebar userRoles={userRoles} />
        <div className='content'>
          <div className='centered-content'>
            <Routes>
              <Route
                path='/personal'
                element={
                  <PrivateRoute
                    allowedRoles={['CEO']}
                    element={
                    <div className="col-12 col-md-9">
                    <Personal onAddPerson={handleAddPerson} />
                    </div>}
                  />
                }
              />
              <Route
                path='/historial-de-ventas'
                element={
                  <PrivateRoute
                    allowedRoles={['CEO']}
                    element={
                    <div className="col-12 col-md-9">
                    Historial de Ventas
                    </div>}
                  />
                }
              />
              <Route
                path='/Ventas'
                element={<PrivateRoute allowedRoles={['Mozo', 'Gerente', 'CEO']} element={<div className="col-12 col-md-9"><VentaPage/></div>} />}
              />
              <Route
                path='/Mesas'
                element={<PrivateRoute allowedRoles={['Gerente', 'CEO']} element={<div className="col-12 col-md-9"><Mesas  onAddMesa={handleAddMesa}/></div>} />}
              />
              <Route
                path='/AltaMozos'
                element={<PrivateRoute allowedRoles={['Gerente', 'CEO']} element={<div className="col-12 col-md-9">
                <AltaMozos onAddPerson={handleAddPerson} />
                </div>} />}
              />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}


const PrivateRoute = ({ element, allowedRoles }) => {
  const userRoles = JSON.parse(localStorage.getItem("usuarios"))?.map(user => user.rol) || [];
  const isAllowed = allowedRoles.some(allowedRole => userRoles && userRoles.includes(allowedRole));

  return isAllowed ? element : <Navigate to="/" />;
};

  export default App;
