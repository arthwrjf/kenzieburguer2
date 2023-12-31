import { FieldError, UseFormRegisterReturn } from 'react-hook-form';
import { StyledTextField } from '../../../styles/form';
import { StyledParagraph } from '../../../styles/typography';

interface iProps {
  label?: string;
  type?: 'text' | 'email' | 'password';
  register?: UseFormRegisterReturn<string>;
  error?: FieldError;
}
const Input = ({ label, type, register, error }: iProps) => (
  <fieldset>
    <StyledTextField label={label} type={type} {...register} />
    {error ? (
      <StyledParagraph fontColor='red'>{error.message} </StyledParagraph>
    ) : null}
  </fieldset>
);

export default Input;
