import React, { useState } from 'react';
import ProductModal from '../ProductModal/ProductModal';

const ProductTable = ({ people, onPersonUpdate }) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedPerson, setSelectedPerson] = useState(null);
  const [tableData, setTableData] = useState(people);

  const handleEditarClick = (id) => {
    const person = people.find((p) => p.id === id);
    setSelectedPerson(person);
    setShowModal(true);
  };

  const handleConfirmarEdicion = (editedPerson) => {
    const updatedPeople = tableData.map((p) =>
      p.id === editedPerson.id ? editedPerson : p
    );

    setTableData(updatedPeople);
    setShowModal(false);

    
    onPersonUpdate(updatedPeople);
  };

  const filteredPeople = tableData.filter((person) => person.role === 'mozo' || person.role === 'gerente');

  return (
    <div className="col-12 col-md-8 offset-md-2 mt-3">
      <h2>Mi Personal</h2>
      <table className="table table-striped mt-2">
        <thead>
          <tr>
            <th>Id</th>
            <th>Nombre</th>
            <th>Rol</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {filteredPeople.map((person) => (
            <tr key={person.id}>
              <td>{person.id}</td>
              <td>{person.name}</td>
              <td>{person.role}</td>
              <td>{person.estado ? 'Alta' : 'Baja'}</td>
              <td>
                <button
                  onClick={() => handleEditarClick(person.id)}
                  className="btn btn-primary me-2"
                >
                  Editar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <ProductModal
        show={showModal}
        onHide={() => setShowModal(false)}
        people={selectedPerson}
        onConfirm={handleConfirmarEdicion}
      />
    </div>
  );
};

export default ProductTable;
