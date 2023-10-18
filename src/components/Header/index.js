import { useContext } from "react"
import avatarImg from '../../assets/avatar.png'
import {Link} from 'react-router-dom'

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
            <FiHome color="#fff" size={24}/>
            Formulário
            </Link>
            <Link to="/customers">
            <FiUser color="#fff" size={24}/>
            Pacientes
            </Link>
            <Link to="/profile">
            <FiSettings color="#fff" size={24}/>
            Perfil
            </Link>
        </div>
    )
}