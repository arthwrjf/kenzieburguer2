import { createContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { api } from '../../services/api';

interface IContext {
  userRegister: (formData: IRegister) => Promise<void>;
  userLogin: (formData: ILogin) => Promise<void>;
  userLogout: () => void;
  user: IUser | null;
  userLoad: () => Promise<void>;
}

export const UserContext = createContext({} as IContext);
interface IDefaultProviderProps {
  children: React.ReactNode;
}
interface IUser {
  id: string;
  name: string;
  email: string;
}
interface IRegister {
  email: string;
  password: string;
  name: string;
}

interface ILogin {
  email: string;
  password: string;
}

export function UserProvider({ children }: IDefaultProviderProps) {
  const [user, setUser] = useState<IUser | null>(null);

  const navigate = useNavigate();

  async function userLoad() {
    const token = localStorage.getItem('@TOKEN');

    if (token) {
      try {
        const response = await api.get('/products', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        navigate('/shop');
      } catch (error) {
        console.log(error);
      }
    }
  }

  useEffect(() => {
    userLoad();
  }, []);

  async function userRegister(formData: IRegister) {
    try {
      const response = await api.post('/users', formData);
      setUser(response.data.user);
      localStorage.setItem('@TOKEN', response.data.accessToken);

      toast.success('Registrado com sucesso');
      navigate('/shop');
    } catch (error) {
      toast.error('Algo deu errado!');
    }
  }

  async function userLogin(formData: ILogin) {
    try {
      const response = await api.post('/login', formData);
      setUser(response.data.user);
      localStorage.setItem('@TOKEN', response.data.accessToken);

      toast.success('Login efetuado com sucesso');
      navigate('/shop');
    } catch (error) {
      console.log(error);
      toast.error('Algo deu errado!');
    }
  }

  function userLogout(): void {
    setUser(null);
    window.localStorage.clear();
    navigate('/');
  }

  return (
    <UserContext.Provider
      value={{ userRegister, userLogin, userLogout, user, userLoad }}
    >
      {children}
    </UserContext.Provider>
  );
}
