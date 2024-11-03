import { createContext, useContext, useEffect, useState } from 'react';
import {
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import { auth, db } from '../firebaseConfig';
import { doc, getDoc, setDoc } from 'firebase/firestore';

//контекст авторизации, который хранит пользователя и его состояние
export const AuthContext = createContext();
//провайдер контекста авторизации
export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(undefined);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsAuthenticated(true);
        setUser(user);
        updateUserData(user.uid);
      } else {
        setIsAuthenticated(false);
        setUser(null);
      }
    });
    return unsub;
  }, []);

  const updateUserData = async (userId) => {
    const docRef = doc(db, 'users', userId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      let data = docSnap.data();
      setUser({
        ...user,
        username: data.username,
        profileurl: data.profileurl,
        userId: data.userId,
      });
    }
  };

  const login = async (email, password) => {
    try {
      const response = await signInWithEmailAndPassword(auth, email, password);
      return { success: true };
    } catch (error) {
      let msg = error.message;
      if (msg.includes('(auth/invalid-email)'))
        msg = 'Неверный адрес электронной почты';
      if (msg.includes('(auth/invalid-credential)'))
        msg = 'Неверный логин или пароль';
      return { success: false, msg };
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      return { success: true };
    } catch (error) {
      return { success: false, msg: e.message, error: e };
    }
  };

  const register = async (email, password, username, profileurl) => {
    try {
      const response = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log('response.user :', response?.user);

      await setDoc(doc(db, 'users', response?.user?.uid), {
        username,
        profileurl,
        userId: response?.user?.uid,
      });
      return { success: true, data: response?.user };
    } catch (error) {
      let msg = error.message;
      if (msg.includes('(auth/invalid-email)'))
        msg = 'Неверный адрес электронной почты';
      if (msg.includes('(auth/email-already-in-use)'))
        msg = 'Эта электронная почта уже используется';
      return { success: false, msg };
    }
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
