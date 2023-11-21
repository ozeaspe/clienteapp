import { useState, useContext } from 'react';
import { AuthContext } from '../../contexts/auth';
import { Link } from 'react-router-dom';

import './signin.css'

import fisioterapia from '../../assets/fisioterapia.png'
import { toast } from 'react-toastify';

function SignIn(){

    //Armazena os dados que o usuário digitar
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

   const {signIn, loadingAuth} = useContext(AuthContext)

   async function handleSignIn(e){
    e.preventDefault();

    //Se o email é diferente de vazio, se a senha é diferente de vazio, chama o método de signIn 
    if(email !== '' && password !== ''){
        await signIn(email, password);
        
    }if(email === '' && password !== ''){
        toast.error("Digite o email!")
    }if(password === '' && email !== ''){
        toast.error("Digite a senha!")
    }
    if(email === '' && password === ''){
        toast.error("É necessário criar uma conta!")
    }
}

    return(
        <div className='container-center'>
            <div className='login'>
                <div className='login-area'>
                    <img src={fisioterapia} alt='Logo do clienteapp' />
                </div>

                <form onSubmit={handleSignIn}>
                    <h1>Login</h1>
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
                    placeholder='********'
                    value={password}
                    onChange={ (e) => setPassword(e.target.value)}
                    />
                    
                    <button type='submit'>
                        {loadingAuth ? "Carregando..." : "Acessar"}
                    </button>
                    
                </form>

                <Link to="/register">Criar uma conta</Link>
            </div>
        </div>
    )
}

export default SignIn;