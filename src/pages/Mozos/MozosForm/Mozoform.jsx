import React, { useState } from 'react';
import axios from 'axios';

const MozoForm = ({ onAddPerson }) => {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');

  const handleAddPerson = async () => {
    try {
      const response = await axios.post('URL_DE_TU_API/personas', { name, age, role: 'mozo', estado: true });

      const newPerson = response.data;

      onAddPerson(newPerson);

      setName('');
      setAge('');
    } catch (error) {
      console.error('Error al agregar persona:', error);
    }
  };


  return (
    <div className="container">
      <h2>Agregar Mozo</h2>
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
          <input
            id="role"
            name="role"
            type="text"
            className="form-control"
            value="Mozo"
            readOnly
          />
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

export default MozoForm;
