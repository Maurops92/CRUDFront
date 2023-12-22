import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import MozoTable from './MozoTable/MozoTable';
import MozoForm from './MozosForm/Mozoform';



const AltaMozos = ({ onAddPerson }) => {
  const people = JSON.parse(localStorage.getItem('people')) || [];
  return (
    <div>
      <div className="container">
        <MozoForm onAddPerson={onAddPerson} />
        <div className="row">
        <MozoTable  people={people}/>
        </div>
      </div>
    </div>
  );
}

export default AltaMozos;