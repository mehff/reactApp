
import React, {useState} from "react"
import firebase from "../../firebase"
import { Link } from "react-router-dom"
const cadastro = <Link to="/">Cadastre-se</Link>

export default function App() {
  const [user, userInfo] = useState({ email: '', senha: '' })
  const [status, setStatus] = useState({ type: '', message: '', link: '' })
  const values = e => userInfo({...user, [e.target.name]: e.target.value})

  const validate = e => {
    e.preventDefault()
    const validateFieldsResult = validateFields()
    if(!validateFieldsResult.success) return
    console.log(validateFieldsResult)
    if(validateFieldsResult.success === true) login()
  }
  
  function login(){
    firebase.auth().signInWithEmailAndPassword(user.email, user.senha)
      .then(result => {
        window.location.href = "/userInformation"
        console.log("then do login")
        console.log(result)
      })
      .catch(result => {
        console.log('catch do login')
        console.log(result)
        if(result.code === "auth/user-not-found") {
          setStatus({ type: 'error', message: "Usuário não encontrado. ", link: cadastro })
        } else if(result.code === "auth/wrong-password"){
          setStatus({ type: 'error', message: "Senha incorreta." })
        }
      })
  }
  const verifications = {
    email(email){
      if(email.search("@") ===-1) {
        setStatus({ type: 'error', message: "Email inválido." })
        return {success: false}
      }
      if(email.search(".com") ===-1){
        setStatus({ type: 'error', message: "Email inválido." })
        return {success: false}
      }
      if(email.indexOf(" ") !==-1){
        setStatus({ type: 'error', message: "O Email não pode ter espaços em branco." })
        return {success: false}
      }
      return {success: true} 
    },
    password(senha){
      if(senha.length < 6){
        setStatus({ type: 'error', message: "A senha deve ter 6 ou mais caracteres." })
        return {success: false}
      }
      return {success: true}
    }
  }

  function validateFields() {
    if(!verifications.email(user.email).success) return {success: false}
    if(!verifications.password(user.senha).success) return {success: false}
    else return {success: true}
  }

  return(
      <div className="App">
        <form onSubmit={validate}>
        <div>
        <h1>Faça login</h1>
        <input type="text" name = "email" placeholder="E-mail" onChange={values}></input>
        <input type="password" name = "senha" placeholder="Senha" onChange={values}></input>
        <button>Entrar</button>
    </div>
          {status.type === 'success' ? <p style={{color:"green"}} className = "status">{status.message}</p> : ''}
          {status.type === 'error' ? <p style={{color:"#ff0000"}} className = "status">{status.message}{status.link ? status.link : ''}</p> : ''}
        </form>
    </div>
  )
  
}