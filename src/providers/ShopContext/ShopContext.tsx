import { createContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../../services/api';

interface IContext {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  list: IProduct[];
  cart: IProduct[];
  setCart: React.Dispatch<React.SetStateAction<IProduct[]>>;
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  searchHamburger: IProduct[];
  setList: React.Dispatch<React.SetStateAction<IProduct[]>>;
}
interface IProduct {
  quantity: number;
  category: string;
  price: string;
  name: string;
  id: string;
  img: string;
}

export const ShopContext = createContext({} as IContext);
interface IDefaultProviderProps {
  children: React.ReactNode;
}

export function ShopProvider({ children }: IDefaultProviderProps) {
  const [open, setOpen] = useState(false);
  const [list, setList] = useState<IProduct[]>([]);
  const [cart, setCart] = useState<IProduct[]>([]);
  const [search, setSearch] = useState('');

  const searchHamburger = list.filter((hamburger) =>
    search === ''
      ? true
      : hamburger.name.toLowerCase().includes(search.toLowerCase()) ||
        hamburger.category.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    async function getList() {
      const token = localStorage.getItem('@TOKEN');

      if (token) {
        try {
          const response = await api.get('/products', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setList([...response.data]);
        } catch (error) {
          console.log(error);
        }
      }
    }
    getList();
  }, []);

  return (
    <ShopContext.Provider
      value={{
        open,
        setOpen,
        list,
        cart,
        setCart,
        search,
        setSearch,
        searchHamburger,
        setList,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
}
