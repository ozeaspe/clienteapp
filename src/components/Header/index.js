import { useContext } from "react"
import avatarImg from '../../assets/avatar.png'
import {Link} from 'react-router-dom'

import './header.css';

import { AuthContext } from '../../contexts/auth'
/*Impotação de biblioteca de ícones, antes de importar é necessário a instalação usando o comando
npm install react-icons*/
import {FiHome, FiUser, FiSettings} from 'react-icons/fi'

export default function Header(){
    const { user } = useContext(AuthContext);

    return(
        <div className="sidebar">
            <div>
                <img src={user.avatarUrl === null ? avatarImg : user.avatarUrl} alt="Foto do Usuário"/>
            </div>

            <Link to="/dashboard">
            <FiHome size={24} className="icon"/>
            Formulário
            </Link>
            <Link to="/customers">
            <FiUser className="icon" size={24}/>
            Cadastro
            </Link>
            <Link to="/profile">
            <FiSettings className="icon" size={24}/>
            Perfil
            </Link>
        </div>
    )
}