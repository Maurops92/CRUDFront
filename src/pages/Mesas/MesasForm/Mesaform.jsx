import React, { useState } from 'react';
import axios from 'axios';

const MesaForm = ({ onAddMesa }) => {
  const [name, setName] = useState('');
  const [comensales, setComensales] = useState('');

  const handleAddMesa = async () => {
    if (!name || !comensales) {
      alert('Por favor, complete todos los campos.');
      return;
    }

    const newMesa = { name, comensales, role: 'mozo', estado: true };

    try {
      // Realizar una solicitud POST para agregar una nueva mesa
      const response = await axios.post('URL_DE_TU_API/mesas', newMesa);

      const mesaCreada = response.data;

      onAddMesa(mesaCreada);
      
      setName('');
      setComensales('');
    } catch (error) {
      console.error('Error al agregar mesa:', error);
    }
  };

  return (
    <div className="container">
      <h2>Agregar Mesa</h2>
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
          <label htmlFor="comensales">Comensales:</label>
          <input
            id="comensales"
            name="comensales"
            type="number"
            className="form-control"
            value={comensales}
            onChange={(e) => setComensales(e.target.value)}
            required
            placeholder="Ingrese la cantidad de comensales"
          />
        </div>
      </div>
      <div className="mt-3 d-flex justify-content-end">
        <button onClick={handleAddMesa} className="btn btn-primary">
          Agregar Mesa
        </button>
      </div>
    </div>
  );
};

export default MesaForm;
