import { createContext, useContext, useState } from 'react';
import PropTypes from 'prop-types';

// 1. Crear el contexto
const CounterContext = createContext();

// 2. Crear un Provider que envuelva a los componentes
export const CounterProvider = ({ children }) => {
  // Estado para el contador y el valor de incremento/decremento

  const [user, setUser] = useState('');
  const [userAdm, setuserAdm] = useState('');

  // 4. Valor del contexto
  const store = {
    user,
    userAdm,
    setUser,
    setuserAdm,
  };

  // 3. Utilizar el Contexto para crear el provider
  return (
    <CounterContext.Provider value={store}>{children}</CounterContext.Provider>
  );
};

// CustomHook - Consumer
export const useCounter = () => {
  const context = useContext(CounterContext);

  return context;
};

// Validación de PropTypes
CounterProvider.propTypes = {
  children: PropTypes.shape().isRequired,
};
