import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import MesaForm from './MesasForm/Mesaform';
import MesaTable from './MesaTable/MesaTable';

const Mesas = ({ onAddMesa }) => {
  const mesas = JSON.parse(localStorage.getItem('mesas')) || [];
  
  return (
    <div>
      <div className="container">
        <MesaForm onAddMesa={onAddMesa} />
        <div className="row">
          <MesaTable mesas={mesas} />
        </div>
      </div>
    </div>
  );
}

export default Mesas;
