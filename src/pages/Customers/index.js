import { useState } from 'react'
import Header from '../../components/Header'
import Title from '../../components/Title'

import { FiUser } from 'react-icons/fi'

import { db } from '../../services/firebaseConnection'
import { addDoc, collection } from 'firebase/firestore'

import { toast } from 'react-toastify'

export default function Customers(){
  const [nome, setNome] = useState('')
  const [cpf, setCpf] = useState('')
  const [endereco, setEndereco] = useState('')

  async function handleRegister(e){
    e.preventDefault();

    if(nome !== '' && cpf !== '' && endereco !== ''){
        await addDoc(collection(db, "customers"), {
          nomeFantasia: nome,
          cpf: cpf,
          endereco: endereco
        })
        .then(() => {
          setNome('')
          setCpf('')
          setEndereco('')
          toast.success("Empresa registrada!")
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
        <Title name="Clientes">
          <FiUser size={25} />
        </Title>

        <div className="container">
          <form className="form-profile" onSubmit={handleRegister}>
              <label>Nome Completo</label>
              <input
                type="text"
                placeholder="Nome da empresa"
                value={nome}
                onChange={(e) => setNome(e.target.value) }
              />

              <label>CPF</label>
              <input
                type="text"
                placeholder="Digite o CPF"
                value={cpf}
                onChange={(e) => setCpf(e.target.value) }
              />

              <label>Endereço</label>
              <input
                type="text"
                placeholder="Endereço da empresa"
                value={endereco}
                onChange={(e) => setEndereco(e.target.value) }
              />

              <button type="submit">
                Salvar
              </button>
          </form>
        </div>

      </div>

    </div>
  )
}