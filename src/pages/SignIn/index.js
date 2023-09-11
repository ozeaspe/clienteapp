import { useState } from 'react';
import { Link } from 'react-router-dom';

import './signin.css'

import fisioterapia from '../../assets/fisioterapia.jpg'

function SignIn(){

    //Armazena os dados que o usuário digitar
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

   

    return(
        <div className='container-center'>
            <div className='login'>
                <div className='login-area'>
                    <img src={fisioterapia} alt='Logo do clienteapp' />
                </div>

                <form>
                    <h1>Entrar</h1>
                    <input
                    type='text'
                    placeholder='email@email.com'
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
                    
                    
                </form>

                <Link to="/register">Criar uma conta</Link>
            </div>
        </div>
    )
}

export default SignIn;