import { useState, createContext, useEffect} from "react";
//fazendo a conexão com o firebase
import{ auth, db } from '../services/firebaseConnection'
/*Importando do firebase para criar um usuário, importando signInWithEmailAndPassword
para criar o login do usuário, importando signOut para deslogar o usuário*/
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
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

    //Criando um spinner, para controlar o acesso a rota privada
    const[loading, setLoading] = useState(true);

    //Criando a navegação entre paáginas
    const navigate = useNavigate();

    /*Utilizando ciclo de vida para fazer com o que não se perca o login depois que 
    a página for atualizada*/
    useEffect(() => {
        async function loadUser(){
            const storageUser = localStorage.getItem('@ticketsPRO')

            if(storageUser){
                setUser(JSON.parse(storageUser))
                setLoading(false);
            }
            setLoading(false);
        }
        loadUser();
    }, [])

    //Criando o login do usuário
    async function signIn(email, password){
        setLoadingAuth(true);

        await signInWithEmailAndPassword(auth, email, password)
        .then( async (value) => {
            let uid = value.user.uid;

            const docRef = doc(db, "users", uid);
            const docSnap = await getDoc(docRef);

            let data = {
                uid: uid,
                nome: docSnap.data().nome,
                email: value.user.email,
                avatarUrl: docSnap.data().avatarUrl,
            };

            setUser(data);
            storageUser(data);
            setLoadingAuth(false);
            toast.success("Bem-vindo(a)!");
            navigate("/dashboard");
        })
        .catch((error) => {
            console.log(error);
            setLoadingAuth(false);
            toast.error("Ops aconteceu algum problema!")
            navigate("/")
        })
    }

    //Criando um novo usuário
    async function signUp(email, password, nome){
        setLoadingAuth(true);

         await createUserWithEmailAndPassword(auth, email, password)
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

    //Método para adicionar os dados do usuário ao localStorage
    function storageUser(data){
        localStorage.setItem('@ticketsPro', JSON.stringify(data))
    } 
    
    //Método para deslogar o usuário
    async function logout(){
        await signOut(auth);
        localStorage.removeItem('@ticketsPro');
        setUser(null);
    }

    return(
        
        <AuthContext.Provider
            value={{
            signed: !!user,
            user,
            signIn,
            signUp,
            setUser,
            logout,
            loadingAuth,
            loading,
            storageUser,
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider;