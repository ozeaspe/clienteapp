
import './modal.css'
import { FiX } from 'react-icons/fi'

export default function Modal({conteudo, close}){
    return(
        <div className="modal">
      <div className="container">
        <button className="close" onClick={close}>
          <FiX size={25} color="#FFF" />
          Voltar
        </button>

        <main>
          <h2>Detalhes do Paciente</h2>

          <div className="row">
            <span>
              Paciente: <i>{conteudo.cliente}</i>
            </span>
          </div>

          <div className="row">
            <span>
              Serviço: <i>{conteudo.servico}</i>
            </span>
            <span>
              Cadastrado em: <i>{conteudo.createdFormat}</i>
            </span>
          </div>

          <div className="row">
            <span>
              Status: <i className="status-badge" style={{ color: "#FFF", backgroundColor: conteudo.status === 'Atendimento' ? '#5cb85c' : '#999' }}>
                {conteudo.status}</i>
            </span>
          </div>
          {conteudo.complemento !== '' && (
          <>
            <h3>Complemento</h3>
            <p>
              {conteudo.complemento}
            </p>
          </>
          )}

        </main>
        </div>
        </div>
    )
}