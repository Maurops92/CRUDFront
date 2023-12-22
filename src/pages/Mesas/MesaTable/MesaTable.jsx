import React, { useState, useEffect } from 'react';
import MesaModal from '../MesaModal/MesaModal';
import axios from 'axios';

const MesaTable = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedMesa, setSelectedMesa] = useState(null);
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    // Realizar una solicitud GET para obtener todas las mesas desde el servidor
    const fetchData = async () => {
      try {
        const response = await axios.get('https://www.crudresto.somee.com/api/Mesas');
        setTableData(response.data);
      } catch (error) {
        console.error('Error al obtener mesas:', error);
      }
    };

    fetchData();
  }, []);

  const handleEditarClick = (mesaid) => {
    const mesa = tableData.find((m) => m.mesaid === mesaid);
    setSelectedMesa(mesa);
    setShowModal(true);
  };

  const handleConfirmarEdicion = async (editedMesa) => {
    try {
      // Realizar una solicitud PUT para actualizar la mesa
      await axios.put(`https://localhost:44369/api/Mesas/${editedMesa.mesaid}`, editedMesa);

      // Actualizar el estado local y cerrar el modal
      const updatedMesas = tableData.map((m) =>
        m.mesaid === editedMesa.mesaid ? editedMesa : m
      );
      setTableData(updatedMesas);
      setShowModal(false);
    } catch (error) {
      console.error('Error al actualizar mesa:', error);
    }
  };


  return (
    <div className="col-12 col-md-8 offset-md-2 mt-3">
      <h2>Mis mesas</h2>
      <table className="table table-striped mt-2">
        <thead>
          <tr>
            <th>Id</th>
            <th>Nombre</th>
            <th>Comensales</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {tableData.map((mesa) => (
            <tr key={mesa.mesaid}>
              <td>{mesa.mesaid}</td>
              <td>{mesa.name}</td>
              <td>{mesa.capacity}</td>
              <td>{mesa.isOccupied ? 'Activa' : 'Inactiva'}</td>
              <td>
                <button
                  onClick={() => handleEditarClick(mesa.mesaid)}
                  className="btn btn-primary me-2"
                >
                  Editar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <MesaModal
        show={showModal}
        onHide={() => setShowModal(false)}
        mesa={selectedMesa}
        onConfirm={handleConfirmarEdicion}
      />
    </div>
  );
};

export default MesaTable;

