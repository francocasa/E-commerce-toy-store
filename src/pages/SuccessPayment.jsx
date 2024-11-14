import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { authenticateUser } from '../services/users';
import { obtenerCarritoPorUsuario } from '../services/cart';
import { useCounter } from '../components/counter/Context';

const SuccessPayment = () => {
  return (
    <main className="container mx-auto p-8">
      <h1>pago exitoso</h1>
    </main>
  );
};

export default SuccessPayment;
