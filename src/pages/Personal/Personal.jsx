import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import MenuForm from './MenuForm/Menuform';
import ProductTable from './ProductTable/ProducTable';
import ProductModal from './ProductModal/ProductModal';

const Personal = ({ onAddPerson }) => {
  const people = JSON.parse(localStorage.getItem('people')) || [];
  const handlePersonUpdate = (updatedPeople) => {
    onAddPerson(updatedPeople);
  };

  return (
    <div>
      <div className="container">
        <MenuForm onAddPerson={onAddPerson} />
        <div className="row">
          <ProductTable people={people} onPersonUpdate={handlePersonUpdate} />
        </div>
      </div>
      <ProductModal />
    </div>
  );
};

export default Personal;
