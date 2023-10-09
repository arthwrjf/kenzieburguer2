import { useContext, useEffect } from 'react';
import { StyledShopPage } from './style';
import CartModal from '../../components/CartModal';
import Header from '../../components/Header';
import ProductList from '../../components/ProductList';
import { StyledContainer } from '../../styles/grid';
import { ShopContext } from '../../providers/ShopContext/ShopContext';
import { UserContext } from '../../providers/UserContext/UserContext';
import { api } from '../../services/api';

const ShopPage = () => {
  const { open, setOpen, setList } = useContext(ShopContext);
  const { userLoad } = useContext(UserContext);

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
    <StyledShopPage>
      {open ? <CartModal /> : null}
      <Header />
      <main>
        <StyledContainer containerWidth={1300}>
          <ProductList />
        </StyledContainer>
      </main>
    </StyledShopPage>
  );
};
export default ShopPage;
