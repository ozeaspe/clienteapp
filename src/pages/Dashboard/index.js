import { useContext } from 'react'
import {AuthContext} from '../../contexts/auth'

import Header from '../../components/Header'
import Title from '../../components/Title'
import { FiPlus, FiLayers, FiSearch, FiEdit2 } from 'react-icons/fi'

import { Link } from 'react-router-dom'

import './dashboard.css'

export default function Dashboard(){

  const { logout } = useContext(AuthContext);

  async function handleLogout(){
    await logout();
  }

  return(
    <div>
      <Header/>

      <div className="content">
        <Title name="Anamnese">
          <FiLayers size={25} />
        </Title>

        <>
          <Link to="/new" className="new">
            <FiPlus color="#FFF" size={25} />
            Adicionar Paciente
          </Link>  

          <table>
            <thead>
              <tr>
                <th scope="col">Paciente</th>
                <th scope="col">Serviço</th>
                <th scope="col">Status</th>
                <th scope="col">Início</th>
                <th scope="col">#</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td data-label="Paciente">Isaura</td>
                <td data-label="Serviço">Pilates</td>
                <td data-label="Status"><span className='badge' style={{ backgroundColor: '#999' }}>Em Aberto</span></td>
                <td data-label="Inicio">12/05/2022</td>
                <td data-label="#">
                  <button className="action" style={{ backgroundColor: '#3583f6' }}>
                    <FiSearch color='#FFF' size={17}/>
                  </button>
                  <button className="action" style={{ backgroundColor: '#f6a935' }}>
                    <FiEdit2 color='#FFF' size={17}/>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </>

      </div>
    
    </div>
  )
}