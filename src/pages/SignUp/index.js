import { useState } from "react";
import { Link } from "react-router-dom";

import fisioterapia from '../../assets/fisioterapia.png'

function SignUp(){

    //Armazena os dados que o usuário digitar
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

   //Função submeter os dados do formalário
   async function handleSubmit(e){
    //Evita que a página que atualizando automaticamente
    e.preventDefault();

    // Se nome é diferente de vazio, se email diferente de vazio, se password diferente de vazio 
    //fazer cadastro
    if(nome !== '' && email !== '' && password !== ''){
        alert("testando")
    }

   }

    return(
        <div className='container-center'>
            <div className='login'>
                <div className='login-area'>
                    <img src={fisioterapia} alt='Logo do clienteapp' />
                </div>

                <form onSubmit={handleSubmit}>
                    <h1>Novo Usuário</h1>

                    <input
                    type='text'
                    placeholder='Nome'
                    //Usa a useState para capturar o que foi digitado
                    value={nome}
                    //Capturar os dados digitados e passar para a useState
                    onChange={ (e) => setNome(e.target.value)}
                    />

                    <input
                    type='text'
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
                    
                    <button type='submit'>Cadastrar</button>
                    
                </form>
                
                <Link to="/">Já possui uma conta? Faça login</Link>
            </div>
        </div>
    )
}

export default SignUp;