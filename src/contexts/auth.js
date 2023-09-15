import { useState, createContext,} from "react";

export const AuthContext = createContext({});

/*função criada para que os dados sejam utlizados por qualquer componente da aplicação
ou seja uma reutilização de códigos*/
function AuthProvider({children}){
    const [user, setUser] = useState(null)

    function signIn(email, password){
        console.log(email)
        console.log(password);
        alert("Logado com sucesso")
    }

    return(
        
        <AuthContext.Provider
            value={{
            signed: !!user,
            user,
            signIn,
            setUser
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider;