import { useContext } from 'react';
import { StyledProductCard } from './style';
import { StyledButton } from '../../../styles/button';
import { StyledParagraph, StyledTitle } from '../../../styles/typography';
import { ShopContext } from '../../../providers/ShopContext/ShopContext';

interface ILiProps {
  src: string;
  product: string;
  category: string;
  price: string | number;
}
const ProductCard = ({ src, product, category, price }: ILiProps) => {
  const { cart, setCart, searchHamburger } = useContext(ShopContext);
  return (
    <StyledProductCard>
      <div className='imageBox'>
        <img src={src} alt='Hamburguer' />
      </div>
      <div className='content'>
        <StyledTitle tag='h3' $fontSize='three'>
          {product}
        </StyledTitle>
        <StyledParagraph className='category'>{category}</StyledParagraph>
        <StyledParagraph className='price'>
          {price.toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL',
          })}
        </StyledParagraph>
        <StyledButton
          $buttonSize='medium'
          $buttonStyle='green'
          onClick={() => {
            const result = searchHamburger.filter(
              (item) => item.name === product
            );
            const index = cart.findIndex((e) => e.name === product);

            if (index === -1) {
              result[0].quantity = 1;
              setCart([...cart, ...result]);
            } else {
              // eslint-disable-next-line no-plusplus
              cart[index].quantity++;
              setCart([...cart]);
            }
          }}
        >
          Adicionar
        </StyledButton>
      </div>
    </StyledProductCard>
  );
};

export default ProductCard;
