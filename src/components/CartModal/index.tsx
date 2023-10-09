import { useContext } from 'react';
import { MdClose } from 'react-icons/md';
import CartProductList from './CartProductList';

import { StyledCartModalBox } from './style';
import { StyledParagraph, StyledTitle } from '../../styles/typography';
import { ShopContext } from '../../providers/ShopContext/ShopContext';

const CartModal = () => {
  const { open, setOpen, cart, setCart } = useContext(ShopContext);
  const handleClickToClose = () => {
    setOpen(false);
  };

  return (
    <StyledCartModalBox>
      <dialog open={open}>
        {cart.length > 0 ? (
          <div>
            <header>
              <StyledTitle tag='h2' $fontSize='three'>
                Carrinho de compras
              </StyledTitle>
              <button
                type='button'
                aria-label='Fechar'
                onClick={handleClickToClose}
              >
                <MdClose size={21} />
              </button>
            </header>
            <div className='cartBox'>
              <CartProductList />
            </div>
          </div>
        ) : (
          <div>
            <header>
              <StyledTitle tag='h2' $fontSize='three'>
                Carrinho de compras
              </StyledTitle>
              <button
                type='button'
                aria-label='Fechar'
                onClick={handleClickToClose}
              >
                <MdClose size={21} />
              </button>
            </header>
            <div className='cartBox'>
              <div className='emptyBox'>
                <StyledTitle tag='h3' $fontSize='three' textAlign='center'>
                  Sua sacola está vazia
                </StyledTitle>
                <StyledParagraph textAlign='center'>
                  Adicione itens
                </StyledParagraph>
              </div>
            </div>
          </div>
        )}
      </dialog>
    </StyledCartModalBox>
  );
};

export default CartModal;
