import { useContext } from 'react';
import ProductCard from './ProductCard';
import { StyledProductList } from './style';
import { ShopContext } from '../../providers/ShopContext/ShopContext';

const ProductList = () => {
  const { searchHamburger } = useContext(ShopContext);

  return (
    <StyledProductList>
      {searchHamburger.map((product) => (
        <ProductCard
          category={product.category}
          price={product.price}
          product={product.name}
          src={product.img}
          key={product.id}
        />
      ))}
    </StyledProductList>
  );
};

export default ProductList;
