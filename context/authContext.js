import { createContext, useContext, useEffect, useState } from 'react';

//контекст авторизации, который хранит пользователя и его состояние
export const AuthContext = createContext();
//провайдер контекста авторизации
export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(undefined);

  useEffect(() => {
    //onAuthStateChanged

    //имитация проверки аутентификации
    setTimeout(() => {
      setIsAuthenticated(false);
    }, 3000);
  }, []);

  const login = async (email, password) => {
    try {
    } catch (error) {}
  };

  const logout = async () => {
    try {
    } catch (error) {}
  };

  const register = async (email, password, username, profileurl) => {
    try {
    } catch (error) {}
  };
  //передача данных через контекст чтобы дочерние элементы получили доступ
  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated, login, register, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};
// проверяем, что вызов сделан внутри AuthContext.Provider, возвращаем значения контекста
export const useAuth = () => {
  const value = useContext(AuthContext);

  if (!value) {
    throw new Error('useAuth must be wrapped inside AuthContextProvider');
  }

  return value;
};
