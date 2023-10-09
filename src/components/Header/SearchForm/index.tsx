import { useContext, useState } from 'react';
import { MdSearch } from 'react-icons/md';
import { useForm } from 'react-hook-form';
import { StyledSearchForm } from './style';
import { UserContext } from '../../../providers/UserContext/UserContext';
import { StyledButton } from '../../../styles/button';
import { ShopContext } from '../../../providers/ShopContext/ShopContext';

const SearchForm = () => {
  const [searchValue, setSearchValue] = useState('');

  const { search, setSearch } = useContext(ShopContext);
  const submit = () => {
    setSearch(searchValue);
    setSearchValue('');
  };
  const { handleSubmit } = useForm();
  return (
    <StyledSearchForm onSubmit={handleSubmit(submit)}>
      <input
        type='text'
        placeholder='Digitar pesquisa'
        value={searchValue}
        onChange={(event) => setSearchValue(event.target.value)}
      />
      <StyledButton type='submit' $buttonSize='medium' $buttonStyle='green'>
        <MdSearch />
      </StyledButton>
    </StyledSearchForm>
  );
};

export default SearchForm;
