import React, { useState, useEffect } from 'react';
import axios from 'axios';

const MozoModal = ({ show, onHide, people, onConfirm, onPersonUpdate }) => {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [estado, setEstado] = useState(true);
  const [role, setRole] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`URL_DE_TU_API/personas/${people.id}`);
        const { name, age, estado } = response.data;
        setName(name);
        setAge(age);
        setEstado(estado);
        setRole(role);
      } catch (error) {
        console.error('Error al obtener detalles de la persona:', error);
      }
    };

    if (people) {
      fetchData();
    }
  }, [people]);

  const handleSave = async () => {
    try {
      await axios.put(`URL_DE_TU_API/personas/${people.id}`, { name, age, estado });

      onConfirm({ id: people.id, name, age, estado });

      onPersonUpdate();

      onHide();
    } catch (error) {
      console.error('Error al actualizar persona:', error);
    }
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
                    readOnly
                  />
                </div>
                <div className="col">
                  <label htmlFor="type">Rol:</label>
                  <input
                    id="typeModal"
                    type="text"
                    className="form-control"
                    value={role}
                    readOnly
                  />
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

export default MozoModal;
