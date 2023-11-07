import { useState } from 'react'
import Header from '../../components/Header'
import Title from '../../components/Title'

import { FiUser } from 'react-icons/fi'

import { db } from '../../services/firebaseConnection'
import { addDoc, collection } from 'firebase/firestore'

import { toast } from 'react-toastify'

import './custormers.css'

export default function Customers(){
  const [nome, setNome] = useState('')
  const [telefone, setTelefone] = useState('')
  const [endereco, setEndereco] = useState('')
  const [datanascimento, setDatanascimento] = useState('')
  const [profissao, setProfissao] = useState('')
  const[emergencia, setEmergencia]  = useState('')

  async function handleRegister(e){
    e.preventDefault();

    if(nome !== '' && telefone !== '' && endereco !== '' && datanascimento !== ''){
        await addDoc(collection(db, "customers"), {
          nomeFantasia: nome,
          telefone: telefone,
          endereco: endereco,
          datanascimento: datanascimento,
          profissao: profissao,
          emergencia: emergencia
        })
        .then(() => {
          setNome('')
          setTelefone('')
          setEndereco('')
          setDatanascimento('')
          setProfissao('')
          setEmergencia('')
          toast.success("Paciente Cadastrado!")
        })
        .catch((error) => {
          console.log(error);
          toast.error("Erro ao fazer o cadastro.")
        })

    }else{
      toast.error("Preencha todos os campos!")
    }

  }

  return(
    <div>
      <Header/>

      <div className="content">
        <Title name="Cadastro de Pacientes">
          <FiUser size={25} />
        </Title>

        <div className="container">
          <form className="form-profile-custormers" onSubmit={handleRegister}>
             <div className="space"> <label>Nome</label><br/>
              <input
                type="text"
                placeholder="Nome Completo"
                value={nome}
                onChange={(e) => setNome(e.target.value) }
              /></div>

              <div className="space">
              <label>Telefone</label><br/>
              <input
                type="text"
                placeholder="Digite o Telefone"
                value={telefone}
                onChange={(e) => setTelefone(e.target.value) }
              /></div>

              <div className="space">
              <label>Endereço</label><br/>
              <input
                type="text"
                placeholder="Digite o endereço"
                value={endereco}
                onChange={(e) => setEndereco(e.target.value) }
              /></div>

              <div className="space">
              <label>Profissão</label><br/>
              <input
                type="text"
                placeholder="Digite a Profissão"
                value={profissao}
                onChange={(e) => setProfissao(e.target.value) }
              /></div>

              <div className="space">
              <label>Emergência</label><br/>
              <input
                type="text"
                placeholder="Digite o nome e o telefone"
                value={emergencia}
                onChange={(e) => setEmergencia(e.target.value) }
              /></div>

              <div className="space">
              <label>Data de Nascimento</label><br/>
              <input
                type="date"
                placeholder="Digite a Profissão"
                value={datanascimento}
                onChange={(e) => setDatanascimento(e.target.value) }
              /></div>

              <button type="submit" className="container-btn2">Salvar</button>
          </form>
          
          
        </div>
       
      </div>

    </div>
  )
}