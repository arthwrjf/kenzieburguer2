/* eslint-disable operator-assignment */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { MdDelete } from 'react-icons/md';
import { useContext } from 'react';

import { StyledCartProductCard } from './style';
import { StyledTitle } from '../../../../styles/typography';
import { ShopContext } from '../../../../providers/ShopContext/ShopContext';

interface ILiProps {
  src: string;
  product: string;
  quantity: number;
  productComplete: object;
}
const CartProductCard = ({
  src,
  product,
  quantity,
  productComplete,
}: ILiProps) => {
  const { cart, setCart } = useContext(ShopContext);
  const index = cart.findIndex((e) => e.name === product);
  return (
    <StyledCartProductCard>
      <div className='imageBox'>
        <img src={src} alt={product} />
      </div>
      <div className='contentBox'>
        <StyledTitle tag='h3' $fontSize='three'>
          {product} x {quantity}
        </StyledTitle>
        {quantity > 1 ? (
          <div className='addAndRemove'>
            <p
              className='add'
              onClick={() => {
                cart[index].quantity = cart[index].quantity + 1;
                setCart([...cart]);
              }}
            >
              +
            </p>
            <p
              className='remove'
              onClick={() => {
                cart[index].quantity = cart[index].quantity - 1;
                setCart([...cart]);
              }}
            >
              -
            </p>
          </div>
        ) : (
          <div>
            <p
              className='add'
              onClick={() => {
                cart[index].quantity = cart[index].quantity + 1;
                setCart([...cart]);
              }}
            >
              +
            </p>
          </div>
        )}

        <button
          type='button'
          aria-label='Remover'
          onClick={() => {
            const remove = cart.filter((item) => item.name !== product);
            setCart(remove);
          }}
        >
          <MdDelete size={24} />
        </button>
      </div>
    </StyledCartProductCard>
  );
};
export default CartProductCard;
