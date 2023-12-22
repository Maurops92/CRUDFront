import React, { useState, useEffect } from 'react';

const MesaModal = ({ show, onHide, mesa, onConfirm }) => {
  const [name, setName] = useState('');
  const [capacity, setComensales] = useState('');
  const [estado, setEstado] = useState(true);

  useEffect(() => {
    setName(mesa?.name || '');
    setComensales(mesa?.capacity || '');
    setEstado(mesa?.estado || true);
  }, [mesa]);

  const handleSave = () => {
    const updatedMesas = JSON.parse(localStorage.getItem('mesas')) || [];
    const originalMesa = updatedMesas.find((m) => m.id === mesa.id);

    if (originalMesa) {
      originalMesa.name = name;
      originalMesa.capacity = capacity;
      originalMesa.estado = estado;


      localStorage.setItem('mesas', JSON.stringify(updatedMesas));


      onConfirm({ id: originalMesa.id, name, capacity, estado });
    }


    onHide();
  };

  return (
    <div className={`modal ${show ? 'd-block' : 'd-none'}`} tabIndex="-1" aria-labelledby="producModalLabel">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="modalLabel">Modificar Mesa</h1>
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
                  <label htmlFor="comensales">Comensales:</label>
                  <input
                    id="comensalesModal"
                    type="number"
                    className="form-control"
                    value={capacity}
                    onChange={(e) => setComensales(e.target.value)}
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
                    <option value={'true'}>Activa</option>
                    <option value={'false'}>Inactiva</option>
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

export default MesaModal;
