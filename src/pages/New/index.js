import { useState, useEffect, useContext  } from 'react'

import { FiPlusCircle } from 'react-icons/fi';
import Header from '../../components/Header'
import Title from '../../components/Title'

import {AuthContext} from '../../contexts/auth'
import { db } from '../../services/firebaseConnection'
import {collection, getDocs, getDoc, doc, addDoc} from 'firebase/firestore'

import { toast } from 'react-toastify'

import './new.css'; 

const listRef = collection(db, "customers");

export default function New(){

    const { user } = useContext(AuthContext);
    
    

    const [customers, setCustomers] = useState([])
    const [loadCustomer, setLoadCustomer] = useState(true);
    const [customerSelected, setCustomerSelected] = useState(0)

    const [complemento, setComplemento] = useState('')
    const [servico, setServico] = useState('Pilates')
    const [status, setStatus] = useState('Atendido')

    useEffect(() => {
        async function loadCustomers(){
          const querySnapshot = await getDocs(listRef)
          .then( (snapshot) => {
            let lista = [];
    
            snapshot.forEach((doc) => {
              lista.push({
                id: doc.id,
                nomeFantasia: doc.data().nomeFantasia
              })
            })
    
            if(snapshot.docs.size === 0){
              console.log("NENHUM CLIENTE ENCONTRADO");
              setCustomers([ { id: '1', nomeFantasia: 'FREELA' } ])
              setLoadCustomer(false);
              return;
            }
    
            setCustomers(lista);
            setLoadCustomer(false);
    
          })
          .catch((error) => {
            console.log("ERRRO AO BUSCAR OS CLIENTES", error)
            setLoadCustomer(false);
            setCustomers([ { id: '1', nomeFantasia: 'FREELA' } ])
          })
        }
    
        loadCustomers();    
      }, [])
    

    function handleOptionChange(e){
        setStatus(e.target.value);
      }

      function handleChangeSelect(e){
        setServico(e.target.value)
      }

      function handleChangeCustomer(e){
        setCustomerSelected(e.target.value)
        console.log(customers[e.target.value].nomeFantasia);
      }

      async function handleRegister(e){
        e.preventDefault();
        //Registrar um chamado
    await addDoc(collection(db, "anamnese"), {
        created: new Date(),
        cliente: customers[customerSelected].nomeFantasia,
        clienteId: customers[customerSelected].id,
        servico: servico,
        complemento: complemento,
        status: status,
        userId: user.uid,
      })
      .then(() => {
        toast.success("Anamnese Concluída!")
        setComplemento('')
        setCustomerSelected(0)
      })
      .catch((error) => {
        toast.error("Ops erro ao registrar anamnese, tente mais tarde!")
        console.log(error);
      })

    }

    return (
        <div>
            <Header/>
            <div className="content">
                <Title name="Nova Anamnese">
                    <FiPlusCircle size={25} />
                </Title>

                <div className="container">
                    <form className="form-profile" onSubmit={handleRegister}>

                        <label>Pacientes</label>
                        {
                            loadCustomer ? (
                         <input type="text" disabled={true} value="Carregando..." />
                             ) : (
                            <select value={customerSelected} onChange={handleChangeCustomer}>
                                {customers.map((item, index) => {
                                  return(
                                    <option key={index} value={index}>
                                         {item.nomeFantasia}
                                    </option>
                                    )
                                     })}
                             </select>
                             )
                            }

                        <label>Serviço</label>
                        <select value={servico} onChange={handleChangeSelect}>
                            <option value="Pilates">Pilates</option>
                            <option value="Acupuntura">Acupuntura</option>
                            <option value="Massagens">Massagens</option>
                        </select>

                        <label>Status</label>
                        <div>
                        <input
                            type="radio"
                            name="radio"
                            value="Atendimento"
                            onChange={handleOptionChange}
                            checked={status === 'Atendimento'}
                        />
                        <span>Em atendimento</span>

                        <input
                            type="radio"
                            name="radio"
                            value="Atendido"
                            onChange={handleOptionChange}
                            checked={status === 'Atendido'}
                        />
                        <span>Atendido</span>

                        <input
                            type="radio"
                            name="radio"
                            value="Finalizado"
                            onChange={handleOptionChange}
                            checked={status === 'Finalizado'}
                        />
                        <span>Finalizado</span>
                        </div>

                        <label>Complemento</label>
                        <textarea
                            type="text"
                            placeholder="Descreve seu problema (opcional)"
                            value={complemento}
                            onChange={(e) => setComplemento(e.target.value)}
                        />

                        <button type="submit">Register</button>
                    </form>
                </div>
            </div>
        </div>
    )
}