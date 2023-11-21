import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../contexts/auth";

import {toast} from 'react-toastify';

import fisioterapia from '../../assets/fisioterapia.png'

function SignUp(){

    //Armazena os dados que o usuário digitar
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    //Utilizando a função que foi criada no contexto
    const { signUp, loadingAuth } = useContext(AuthContext);

   //Função submeter os dados do formalário
   async function handleSubmit(e){
    //Evita que a página que atualizando automaticamente
    e.preventDefault();

    // Se nome é diferente de vazio, se email diferente de vazio, se password diferente de vazio 
    //fazer cadastro
    if(nome !== '' && email !== '' && password !== ''){
        await signUp(email, password, nome)
    }if(nome === '' && email !== '' && password !== ''){
        toast.error("Obrigatório preencher o campo em branco!")
    }if(nome === '' && email === '' && password !== ''){
        toast.error("Obrigatório preencher os campos em branco!")
    }if(nome !== '' && email === '' && password === ''){
        toast.error("Obrigatório preencher os campos em branco!")
    }if(nome !== '' && email === '' && password !== ''){
        toast.error("Obrigatório preencher o campo em branco!")
    }if(nome !== '' && email !== '' && password === ''){
        toast.error("Obrigatório preencher o campo em branco!")
    }if(nome === '' && email === '' && password === ''){
        toast.error("Obrigatório preencher os campos em branco!")
    }

   }

    return(
        <div className='container-center'>
            <div className='login'>
                <div className='login-area'>
                    <img src={fisioterapia} alt='Logo do clienteapp' />
                </div>

                <form onSubmit={handleSubmit}>
                    <h1>Nova Conta</h1>

                    <input
                    type='text'
                    placeholder='Nome'
                    //Usa a useState para capturar o que foi digitado
                    value={nome}
                    //Capturar os dados digitados e passar para a useState
                    onChange={ (e) => setNome(e.target.value)}
                    />

                    <input
                    type='email'
                    placeholder='Email'
                    //Usa a useState para capturar o que foi digitado
                    value={email}
                    //Capturar os dados digitados e passar para a useState
                    onChange={ (e) => setEmail(e.target.value)}
                    />

                    <input
                    type='password'
                    placeholder='Senha'
                    value={password}
                    onChange={ (e) => setPassword(e.target.value)}
                    />
                    
                        <button type='submit'>{loadingAuth ? 'Carregando...' : 'Cadastrar'}</button>
                    
                </form>
                
                <Link to="/">Já possui uma conta? Faça login</Link>
            </div>
        </div>
    )
}

export default SignUp;