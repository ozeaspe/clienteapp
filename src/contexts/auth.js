import { useState, createContext,} from "react";
//fazendo a conexão com o firebase
import{ auth, db } from '../services/firebaseConnection'
//Importando do firebase para criar um usuário
import { createUserWithEmailAndPassword } from "firebase/auth";
/*Importando do banco doc==>para acessar os documentos
                      getDoc==> para pegar os documentos
                      setDoc==> para passa os dados para o documento
*/
import { doc, getDoc, setDoc } from "firebase/firestore";

//Importando o useNavigate que é uma forma de navegar entre as páginas
import { useNavigate } from "react-router-dom";

//Importa biblioteca de toast, usando o site React-Toastify
import { toast } from "react-toastify";

export const AuthContext = createContext({});

/*função criada para que os dados sejam utlizados por qualquer componente da aplicação
ou seja uma reutilização de códigos*/
function AuthProvider({children}){
    const [user, setUser] = useState(null)
    
    //Criando um spinner, para controlar quando o usuário estiver cadastrando
    const[loadingAuth, setLoadingAuth] = useState(false);

    //Criando a navegação entre paáginas
    const navigate = useNavigate();

    function signIn(email, password){
        console.log(email)
        console.log(password);
        toast.success("Bem-vindo(a)!")
    }

    //Criando um novo usuário
    async function signUp(email, password, nome){
        setLoadingAuth(true);

        createUserWithEmailAndPassword(auth, email, password)
        .then(async (value) => {
            let uid = value.user.uid

            await setDoc(doc(db, "users", uid), {
                nome: nome,
                avatarUrl: null
            })
            .then( () => {
               
                let data = {
                    uid: uid,
                    nome: nome,
                    email: value.user.email,
                    avatarUrl: null
                };

                setUser(data);
                storageUser(data);
                setLoadingAuth(false);
                toast.success("Usuário Cadastrado");
                navigate("/")
            })
        })
        .catch((error) => {
            console.log(error);
            setLoadingAuth(false);
            toast.error("Email já cadastrado!")
            navigate("/")
        })
    }

    function storageUser(data){
        localStorage.setItem('@ticketsPro', JSON.stringify(data))
    }    

    return(
        
        <AuthContext.Provider
            value={{
            signed: !!user,
            user,
            signIn,
            signUp,
            setUser,
            loadingAuth
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider;