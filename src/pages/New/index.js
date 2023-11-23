import { useState, useEffect, useContext  } from 'react'

import { FiPlusCircle } from 'react-icons/fi';
import Header from '../../components/Header'
import Title from '../../components/Title'

import {AuthContext} from '../../contexts/auth'
import { db } from '../../services/firebaseConnection'
import {collection, getDocs, getDoc, doc, addDoc, updateDoc} from 'firebase/firestore'

import { useParams, navigate, useNavigate } from 'react-router-dom';

import { toast } from 'react-toastify'

import './new.css'; 

const listRef = collection(db, "customers");

export default function New(){

    const { user } = useContext(AuthContext);
    const { id } = useParams();
    const navigate = useNavigate();
    

    const [customers, setCustomers] = useState([])
    const [loadCustomer, setLoadCustomer] = useState(true);
    const [customerSelected, setCustomerSelected] = useState(0)

    const [complemento, setComplemento] = useState('')
    const [servico, setServico] = useState('Acupuntura')
    const [status, setStatus] = useState('Atendido')
    const [idCustomer, setIdCustomer] = useState(false)
    const [queixa, setQueixa] = useState('')
    const [doencas, setDoencas] = useState('')
    const [antfamilia, setAntfamilia] = useState('')
    const [medicamentos, setMedicamentos] = useState('')
    const [bebidas, setBebidas] = useState('')
    const [fuma, setFuma] = useState('')
    const [acidente, setAcidente] = useState('')
    const [qtnestresse, setQtnestresse] = useState('')
    const [objpilates, setObjpilates] = useState('')

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

            if(id){
              loadId(lista);
            }
    
          })
          .catch((error) => {
            console.log("ERRRO AO BUSCAR OS CLIENTES", error)
            setLoadCustomer(false);
            setCustomers([ { id: '1', nomeFantasia: 'FREELA' } ])
          })
        }
    
        loadCustomers();    
      }, [id])
    
      async function loadId(lista){
        const docRef = doc(db, "anamnese", id);
        await getDoc(docRef)
        .then((snapshot) => {
          setServico(snapshot.data().servico)
          setStatus(snapshot.data().status)
          setComplemento(snapshot.data().complemento)
          setQueixa(snapshot.data().queixa)
          setDoencas(snapshot.data().doencas)
          setAntfamilia(snapshot.data().antfamilia)
          setMedicamentos(snapshot.data().medicamentos)
          setBebidas(snapshot.data().bebidas)
          setFuma(snapshot.data().fuma)
          setAcidente(snapshot.data().acidente)
          setQtnestresse(snapshot.data().qtnestresse)
          setObjpilates(snapshot.data().objpilates);
    
    
          let index = lista.findIndex(item => item.id === snapshot.data().clienteId)
          setCustomerSelected(index);
          setIdCustomer(true);
    
        })
        .catch((error) => {
          console.log(error);
          setIdCustomer(false);
        })
      }

      function handleOptionChange(e){
        setStatus(e.target.value);
      }

      function handleChangeSelect(e){
        setServico(e.target.value);
      }

      function handleChangeSelect1(e){
        setQtnestresse(e.target.value);
      }

      function handleChangeSelect2(e){
        setObjpilates(e.target.value);
      }

      function handleChangeCustomer(e){
        setCustomerSelected(e.target.value)
        console.log(customers[e.target.value].nomeFantasia);
      }

      async function handleRegister(e){
        e.preventDefault();
        if(idCustomer){
          //Atualizando chamado
          const docRef = doc(db, "anamnese", id)
          await updateDoc(docRef, {
            cliente: customers[customerSelected].nomeFantasia,
            clienteId: customers[customerSelected].id,
            servico: servico,
            complemento: complemento,
            status: status,
            userId: user.uid,
            queixa: queixa,
            doencas: doencas,
            antfamilia: antfamilia,
            medicamentos: medicamentos,
            bebidas: bebidas,
            fuma:fuma,
            acidente: acidente,
            qtnestresse: qtnestresse,
            objpilates: objpilates,
          })
          .then(() => {
            toast.info("Cliente atualizado com sucesso!")
            setCustomerSelected(0);
            setComplemento('');
            navigate('/dashboard')
          })
          .catch((error) => {
            toast.error("Ops erro ao atualizar esse cliente!")
            console.log(error);
          })
    
          return;
        }

        //Registrar um chamado
    await addDoc(collection(db, "anamnese"), {
        created: new Date(),
        cliente: customers[customerSelected].nomeFantasia,
        clienteId: customers[customerSelected].id,
        servico: servico,
        complemento: complemento,
        status: status,
        userId: user.uid,
        queixa: queixa,
        doencas: doencas,
        antfamilia: antfamilia,
        medicamentos: medicamentos,
        bebidas: bebidas,
        fuma:fuma,
        acidente: acidente,
        qtnestresse: qtnestresse,
        objpilates: objpilates,
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
                <Title name={id ? "Editando Anamnese" : "Nova Anamnese"}>
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
                            

                        
                        <label>Queixa Principal</label>
                        <textarea
                            type="text"
                            placeholder="Digite aqui"
                            value={queixa}
                            onChange={(e) => setQueixa(e.target.value)}
                        />
                        

                        
                        <label>Doenças crônicas conjugadas</label>
                        <textarea
                            type="text"
                            placeholder="Digite aqui"
                            value={doencas}
                            onChange={(e) => setDoencas(e.target.value)}
                        />
                        

                             
                        <label>Antecedentes Familiares</label>
                        <textarea
                            type="text"
                            placeholder="Digite aqui"
                            value={antfamilia}
                            onChange={(e) => setAntfamilia(e.target.value)}
                        />
                        

                             
                        <label>Lista de Medicamentos que o paciente faz uso</label>
                        <textarea
                            type="text"
                            placeholder="Digite aqui"
                            value={medicamentos}
                            onChange={(e) => setMedicamentos(e.target.value)}
                        />
                        

                            
                        <label>Costuma ingerir bebidas alcoólicas?</label>
                        <textarea
                            type="text"
                            placeholder="Digite aqui"
                            value={bebidas}
                            onChange={(e) => setBebidas(e.target.value)}
                        />
                        

                          
                        <label>Costuma fumar?</label>
                        <textarea
                            type="text"
                            placeholder="Digite aqui"
                            value={fuma}
                            onChange={(e) => setFuma(e.target.value)}
                        />
                        

                           
                        <label>Sofreu acidente grave?Apresenta alguma sequela?</label>
                        <textarea
                            type="text"
                            placeholder="Digite aqui"
                            value={acidente}
                            onChange={(e) => setAcidente(e.target.value)}
                        />
                        

                           
                        <label>Selecione opção em relação ao estresse durante um dia normal</label>
                        <select value={qtnestresse} onChange={handleChangeSelect1}>
                            <option value="Sem estresse">Sem estresse</option>
                            <option value="Estresse leve ocasional">Estresse leve ocasional</option>
                            <option value="Estresse moderado frequente">Estresse moderado frequente</option>
                            <option value="Estresse elevado frequente">Estresse elevado frequente</option>
                            <option value="Estresse elevado constante">Estresse elevado constante</option>
                        </select>
                        

                            
                        <label>Qual o objetivo em praticar pilates</label>
                        <select value={objpilates} onChange={handleChangeSelect2}>
                            <option value="Perder peso">Perder peso</option>
                            <option value="Melhorar a flexibilidade">Melhorar a flexibilidade</option>
                            <option value="Melhorar a condição muscular">Melhorar a condição muscular</option>
                            <option value="Reduzir dores">Reduzir dores</option>
                            <option value="Reduzir o estresse">Reduzir o estresse</option>
                        </select>
                        

                          
                        <label>Serviço</label>
                        <select value={servico} onChange={handleChangeSelect}>
                            <option value="Acupuntura">Acupuntura</option>
                            <option value="Fisioterapia">Fisioterapia</option>
                            <option value="Massoterapia">Massoterapia</option>
                            <option value="Pilates">Pilates</option>
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
                        

                        <button type="submit">Registrar</button>
                    </form>
                </div>
            </div>
        </div>
    )
}