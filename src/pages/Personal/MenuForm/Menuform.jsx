import React, { useState, useEffect } from 'react';
import axios  from 'axios';

const MenuForm = ({ onAddPerson }) => {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [role, setRole] = useState('');

  const handleAddPerson = () => {
    const newPerson = { name, age, role };

    // Realizar solicitud POST al servidor
    axios.post('https://www.crudresto.somee.com/personas', newPerson)
      .then((response) => {
        console.log('Persona agregada:', response.data);
        // Actualizar el estado o realizar alguna acción después de agregar
        onAddPerson();
      })
      .catch((error) => {
        console.error('Error al agregar persona:', error);
      });
  };

  return (
    <div className="container">
      <h2>Agregar Personal</h2>
      <div className="row mt-3">
        <div className="col">
          <label htmlFor="name">Nombre:</label>
          <input
            id="name"
            name="name"
            type="text"
            className="form-control"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            placeholder="Escriba el nombre de la persona"
          />
        </div>
        <div className="col">
          <label htmlFor="age">Edad:</label>
          <input
            id="age"
            name="age"
            type="number"
            className="form-control"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            required
            placeholder="Ingrese la edad de la persona"
          />
        </div>
        <div className="col">
          <label htmlFor="role">Rol:</label>
          <select
            id="role"
            name="role"
            className="form-control"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            required
          >
            <option value="" disabled>Seleccione un rol</option>
            <option value="gerente">Gerente</option>
            <option value="mozo">Mozo</option>
          </select>
        </div>
      </div>
      <div className="mt-3 d-flex justify-content-end">
        <button onClick={handleAddPerson} className="btn btn-primary">
          Agregar Persona
        </button>
      </div>
    </div>
  );
};

export default MenuForm;
