
import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const Navbar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  const handleLogin = () => {
    const usuariosGuardados = localStorage.getItem("usuarios");
    
    try {
      const usuarios = JSON.parse(usuariosGuardados);
  
      if (!Array.isArray(usuarios)) {
        console.error('La variable "usuarios" no es un array:', usuarios);
        return;
      }
  
      const usuarioAutenticado = usuarios.find(
        (usuario) => usuario.usuario === username && usuario.contrasena === password
      );
  
      if (usuarioAutenticado) {
        alert(`Bienvenido, ${usuarioAutenticado.rol} ${usuarioAutenticado.usuario}!`);
      } else {
        alert("Credenciales incorrectas");
      }
    } catch (error) {
      console.error('Error al parsear usuarios:', error);
    }
  
    closeModal();
  };
  

  return (
    <div className="navbar">
      <h1 className="restaurant-title">Nombre del Restaurante</h1>
      <button className="login-button" onClick={openModal}>
        Iniciar sesión
      </button>

      <Modal show={isModalOpen} onHide={closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>Inicio de Sesión</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <label>
              Usuario:
              <input type="text" onChange={(e) => setUsername(e.target.value)} />
            </label>
            <br />
            <label>
              Contraseña:
              <input type="password" onChange={(e) => setPassword(e.target.value)} />
            </label>
            <br />
            <Button variant="primary" onClick={handleLogin}>
              Iniciar sesión
            </Button>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeModal}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Navbar;
