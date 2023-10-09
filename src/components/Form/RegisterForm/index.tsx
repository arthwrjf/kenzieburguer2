import { SubmitHandler, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useContext } from 'react';
import { UserContext } from '../../../providers/UserContext/UserContext';
import Input from '../Input';
import { StyledButton } from '../../../styles/button';
import { StyledForm } from '../../../styles/form';

const RegisterForm = () => {
  const formSchema = yup.object().shape({
    name: yup.string().required('Nome Obrigatório'),
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

    confirmPassword: yup
      .string()
      .required('Confirme sua senha')
      .oneOf([yup.ref('password')], 'As senhas devem ser idênticas'),
  });

  const { userRegister } = useContext(UserContext);

  interface IRegister {
    email: string;
    password: string;
    name: string;
    confirmPassword: string;
  }
  function submit(formData: IRegister) {
    userRegister(formData);
  }
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IRegister>({ resolver: yupResolver(formSchema) });

  return (
    <StyledForm onSubmit={handleSubmit(submit)}>
      <Input
        type='text'
        label='Nome'
        register={register('name')}
        error={errors.name}
      />
      <Input
        label='Email'
        register={register('email')}
        type='email'
        error={errors.email}
      />
      <Input
        type='password'
        label='Senha'
        register={register('password')}
        error={errors.password}
      />
      <Input
        type='password'
        label='Confirmar Senha'
        register={register('confirmPassword')}
        error={errors.confirmPassword}
      />
      <StyledButton $buttonSize='default' $buttonStyle='gray'>
        Cadastrar
      </StyledButton>
    </StyledForm>
  );
};

export default RegisterForm;
