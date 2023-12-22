import React, { useState, useEffect } from 'react';

const ProductModal = ({ show, onHide, people, onConfirm }) => {
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [estado, setEstado] = useState(true);

  useEffect(() => {
    setName(people?.name || '');
    setRole(people?.role || '');
    setEstado(people?.estado || true);
  }, [people]);

  const handleSave = () => {
    const updatedPeople = JSON.parse(localStorage.getItem('people')) || [];
    const originalPerson = updatedPeople.find((p) => p.id === people.id);

    if (originalPerson) {
      originalPerson.name = name;
      originalPerson.role = role;
      originalPerson.estado = estado;

      localStorage.setItem('people', JSON.stringify(updatedPeople));
      onConfirm({ id: originalPerson.id, name, role, estado });
    }

    onHide();
  };

  return (
    <div className={`modal ${show ? 'd-block' : 'd-none'}`} tabIndex="-1" aria-labelledby="producModalLabel">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="modalLabel">Modificar Personal</h1>
            <button type="button" className="btn-close" aria-label="Close" onClick={onHide}></button>
          </div>
          <div className="modal-body">
            <form id="formModal">
              <div className="row mt-3">
                <div className="col">
                  <label htmlFor="name">Nombre:</label>
                  <input
                    id="nameModal"
                    type="text"
                    className="form-control"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="col">
                  <label htmlFor="type">Rol:</label>
                  <select
                    id="typeModal"
                    className="form-control"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                  >
                    <option value="gerente">Gerente</option>
                    <option value="mozo">Mozo</option>
                  </select>
                </div>
                <div className="col">
                  <label htmlFor="estado">Estado:</label>
                  <select
                    id="estadoModal"
                    className="form-control"
                    value={estado.toString()}
                    onChange={(e) => setEstado(e.target.value === 'true')}
                  >
                    <option value={'true'}>Alta</option>
                    <option value={'false'}>Baja</option>
                  </select>
                </div>
              </div>
              <div className="mt-3 d-flex justify-content-end">
                <button
                  type="button"
                  className="btn btn-info"
                  onClick={handleSave}
                >
                  Actualizar
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;
