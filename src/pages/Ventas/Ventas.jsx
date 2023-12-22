import React, { useState, useEffect } from 'react';
import axios from 'axios';

const VentaPage = () => {
  const [mozos, setMozos] = useState([]);
  const [mesas, setMesas] = useState([]);
  const [menuOptions, setMenuOptions] = useState([]);
  const [selectedMozo, setSelectedMozo] = useState(null);
  const [selectedMesa, setSelectedMesa] = useState(null);
  const [selectedMenus, setSelectedMenus] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [selectedMenuOption, setSelectedMenuOption] = useState('');

  useEffect(() => {
    // Obtener lista de mozos
    axios.get('URL_DE_TU_API/mozos')
      .then((response) => setMozos(response.data))
      .catch((error) => console.error('Error al obtener mozos:', error));

    // Obtener lista de mesas
    axios.get('URL_DE_TU_API/mesas')
      .then((response) => setMesas(response.data))
      .catch((error) => console.error('Error al obtener mesas:', error));

    // Obtener lista de opciones de menú
    axios.get('URL_DE_TU_API/menu-options')
      .then((response) => setMenuOptions(response.data))
      .catch((error) => console.error('Error al obtener opciones de menú:', error));
  }, []);

  const handleAddMenu = () => {
    const selectedMenu = menuOptions.find((menu) => menu.id === parseInt(selectedMenuOption, 10));
    setSelectedMenus((prevMenus) => [...prevMenus, selectedMenu]);
    setTotalPrice((prevPrice) => prevPrice + selectedMenu.precio);
  };

  const handleRemoveMenu = (menuId) => {
    const selectedMenu = menuOptions.find((menu) => menu.id === menuId);
    setSelectedMenus((prevMenus) => prevMenus.filter((menu) => menu.id !== menuId));
    setTotalPrice((prevPrice) => prevPrice - selectedMenu.precio);
  };

  const handleVentaSubmit = () => {
    // Realizar la solicitud para agregar a la tabla "detalle_venta"
    axios.post('URL_DE_TU_API/detalle-venta', {
      mozoId: selectedMozo.id,
      mesaId: selectedMesa.id,
      menus: selectedMenus.map((menu) => menu.id),
      total: totalPrice,
    })
    .then((response) => {
      console.log('Venta registrada exitosamente:', response.data);
      // Puedes realizar alguna acción adicional después de registrar la venta
    })
    .catch((error) => console.error('Error al registrar venta:', error));
  };

  /*const handleUpdateVenta = () => {
    // Reemplaza obtenerIdDeLaVenta() con la lógica para obtener el ID de la venta
    const ventaId = obtenerIdDeLaVenta(); // Asegúrate de implementar la lógica para obtener el ID correcto
    axios.put(`URL_DE_TU_API/detalle-venta/${ventaId}`, {
      mozoId: selectedMozo.id,
      mesaId: selectedMesa.id,
      menus: selectedMenus.map((menu) => menu.id),
      total: totalPrice,
    })
    .then((response) => {
      console.log('Venta actualizada exitosamente:', response.data);
      // Puedes realizar alguna acción adicional después de actualizar la venta
    })
    .catch((error) => console.error('Error al actualizar venta:', error));
  };

  const handleGetVenta = () => {
    // Reemplaza obtenerIdDeLaVenta() con la lógica para obtener el ID de la venta
    const ventaId = obtenerIdDeLaVenta(); // Asegúrate de implementar la lógica para obtener el ID correcto
    axios.get(`URL_DE_TU_API/detalle-venta/${ventaId}`)
      .then((response) => {
        console.log('Detalles de la venta:', response.data);
        // Actualiza el estado o realiza acciones necesarias con la respuesta
      })
      .catch((error) => console.error('Error al obtener detalles de la venta:', error));
  };
*/
  return (
    <div className="container mt-5">
      <h2 className="mb-4">Venta</h2>

      <div className="mb-3">
        <label htmlFor="mozo" className="form-label">Selecciona un mozo:</label>
        <select id="mozo" className="form-select" onChange={(e) => setSelectedMozo(mozos.find((mozo) => mozo.id === parseInt(e.target.value, 10)))}>
          <option value="">Selecciona un mozo</option>
          {mozos.map((mozo) => (
            <option key={mozo.id} value={mozo.id}>{mozo.nombre}</option>
          ))}
        </select>
      </div>

      <div className="mb-3">
        <label htmlFor="mesa" className="form-label">Selecciona una mesa:</label>
        <select id="mesa" className="form-select" onChange={(e) => setSelectedMesa(mesas.find((mesa) => mesa.id === parseInt(e.target.value, 10)))}>
          <option value="">Selecciona una mesa</option>
          {mesas.map((mesa) => (
            <option key={mesa.id} value={mesa.id}>{mesa.numero}</option>
          ))}
        </select>
      </div>

      <div className="mb-3">
        <label htmlFor="menuOption" className="form-label">Selecciona un menú:</label>
        <select id="menuOption" className="form-select" onChange={(e) => setSelectedMenuOption(e.target.value)}>
          <option value="">Selecciona un menú</option>
          {menuOptions.map((menu) => (
            <option key={menu.id} value={menu.id}>{menu.nombre} - ${menu.precio}</option>
          ))}
        </select>
        <button className="btn btn-primary mt-2" onClick={handleAddMenu}>Agregar</button>
      </div>

      <div className="mb-3">
        <h3>Mis Menús Seleccionados:</h3>
        <ul className="list-group">
          {selectedMenus.map((menu) => (
            <li key={menu.id} className="list-group-item d-flex justify-content-between align-items-center">
              {menu.nombre} - ${menu.precio}
              <button className="btn btn-danger" onClick={() => handleRemoveMenu(menu.id)}>Quitar</button>
            </li>
          ))}
        </ul>
        <p className="mt-3">Total: ${totalPrice}</p>
      </div>

      <button className="btn btn-success" onClick={handleVentaSubmit}>Realizar Venta</button>
    </div>
  );
};

export default VentaPage;
