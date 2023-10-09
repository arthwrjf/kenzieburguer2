import { useContext } from 'react';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { UserContext } from '../../../providers/UserContext/UserContext';
import { StyledButton } from '../../../styles/button';
import { StyledForm } from '../../../styles/form';
import Input from '../Input';

const LoginForm = () => {
  const formSchema = yup.object().shape({
    email: yup
      .string()
      .required('Email obrigatório')
      .email('Formato de email inválido'),
    password: yup
      .string()
      .required('Password obrigatório')
      .matches(/(\d)/, 'Deve conter ao menos 1 número')
      .matches(/^(?=.*[a-z])/, 'Deve conter ao menos uma letra minúscula')
      .min(6, 'Deve conter no mínimo 8 caracteres'),
  });
  const { userLogin } = useContext(UserContext);

  interface ILogin {
    email: string;
    password: string;
  }
  function submit(formData: ILogin) {
    userLogin(formData);
  }
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ILogin>({ resolver: yupResolver(formSchema) });

  return (
    <StyledForm onSubmit={handleSubmit(submit)}>
      <Input
        type='email'
        label='Email'
        register={register('email')}
        error={errors.email}
      />
      <Input
        type='password'
        label='Senha'
        register={register('password')}
        error={errors.password}
      />
      <StyledButton $buttonSize='default' $buttonStyle='green'>
        Entrar
      </StyledButton>
    </StyledForm>
  );
};

export default LoginForm;
