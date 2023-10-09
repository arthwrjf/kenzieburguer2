import { useContext } from 'react';
import CartProductCard from './CartProductCard';

import { StyledCartProductList } from './style';
import { StyledButton } from '../../../styles/button';
import { StyledParagraph } from '../../../styles/typography';
import { ShopContext } from '../../../providers/ShopContext/ShopContext';

const CartProductList = () => {
  const { cart, setCart } = useContext(ShopContext);
  const total = cart.reduce(
    (accumulator, item) => accumulator + Number(item.price) * item.quantity,
    0
  );

  return (
    <StyledCartProductList>
      <ul>
        {cart.map((product) => (
          <CartProductCard
            product={product.name}
            src={product.img}
            quantity={product.quantity}
            productComplete={product}
          />
        ))}
      </ul>

      <div className='totalBox'>
        <StyledParagraph>
          <strong>Total</strong>
        </StyledParagraph>
        <StyledParagraph className='total'>
          {total.toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL',
          })}
        </StyledParagraph>
      </div>
      <StyledButton
        $buttonSize='default'
        $buttonStyle='gray'
        onClick={() => {
          setCart([]);
        }}
      >
        Remover todos
      </StyledButton>
    </StyledCartProductList>
  );
};

export default CartProductList;
