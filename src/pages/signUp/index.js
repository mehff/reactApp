
import React, {useState} from "react"
import '../../App.css'
import firebase from "../../firebase"
import { Link } from "react-router-dom"
const login = <Link to="/signIn">Login</Link>

export default function App() {
  const [user, userInfo] = useState({ nome: '', sobrenome: '', email: '', senha: '', dataNascimento: '' })
  const [status, setStatus] = useState({ type: '', message: '', link: ''})
  const values = e => userInfo({...user, [e.target.name]: e.target.value})

  const validate = e => {
    e.preventDefault()
    console.log(user)
    const validateFieldsResult = validateFields()
    if(!validateFieldsResult.success) return
    console.log(validateFieldsResult)
    if(validateFieldsResult.success === true) createUser()
  }
  
  const verifications = {
    email(email){
      if(email.search("@") ===-1){
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
    },
    name(nome){
      if(nome.length <= 1 || nome === ""){
        setStatus({ type: 'error', message: "Nome inválido." })
        return {success: false}
      }
      return {success: true}
    },
    lastname(sobrenome){
      if(sobrenome.length <= 1 || sobrenome === ""){
        setStatus({ type: 'error', message: "Sobrenome inválido." })
        return {success: false}
      }
      return {success: true}
    },
    birthdate(birthdate){
      console.log(birthdate)
      if(birthdate.length < 8){
        setStatus({ type: 'error', message: "Data de nascimento inválida." })
        return {success: false}
      }
      return {success: true}
    }
  }
  

  function validateFields() {
    if(!verifications.name(user.nome).success) return {success: false}
    if(!verifications.lastname(user.sobrenome).success) return {success: false}
    if(!verifications.email(user.email).success) return {success: false}
    if(!verifications.password(user.senha).success) return {success: false}
    if(!verifications.birthdate(user.dataNascimento).success) return {success: false}
    user.dataNascimento = formatBirthDate(user.dataNascimento)
    return {success: true}
  }

  function formatBirthDate(birthdate){
    const splitDate = birthdate.split('-')
    return `${splitDate[2]}/${splitDate[1]}/${splitDate[0]}`
  }

  async function createUser(){
    let uid

    firebase.auth().createUserWithEmailAndPassword(user.email, user.senha)
      .then(result =>{
        console.log("then do firebase " + result)
        console.log(result)
        uid = result.user.uid
        
        if(uid && result.additionalUserInfo.isNewUser){
          const userInfo = {
            nome: user.nome,
            sobrenome: user.sobrenome,
            dataNascimento: user.dataNascimento
          }
          
          firebase.firestore().collection("Usuarios").doc(uid).set(userInfo)
          .then(result => {
            console.log("then do armazenamento de nome")
          })
          .catch(result => {
            console.log("catch do armazenamento de nome")
          })

          if(result.additionalUserInfo.isNewUser) return setStatus({ type: 'success', message: `Email cadastrado com sucesso. Faça `, link: login})
        }
      })
      .catch(result =>{
        console.log("catch do firebase " + result.code)
        if(result.code === "auth/email-already-in-use") return setStatus({ type: 'error', message: "Email já cadastrado. Faça ", link: login })
      })
    
  }

  return(
      <div className="App">
        <form onSubmit={validate}>
          <h1>Cadastre-se</h1>
          <input type="text" name = "nome" placeholder="Nome" onChange={values} value = {user.nome}></input>
          <input type="text" name = "sobrenome" placeholder="Sobrenome" onChange={values} value = {user.sobrenome}></input>
          <input type="text" name = "email" placeholder="E-mail" onChange={values} value = {user.email}></input>
          <input type="password" name = "senha" placeholder="Senha" onChange={values} value = {user.senha}></input>
          <input type="date" name = "dataNascimento" pattern="dd/mm/yyyy" placeholder="Data de nascimento" onChange={values} value = {user.dataNascimento}></input>
          <button>Cadastrar</button>
          {status.type === 'success' ? <p style={{color:"green"}} className = "status">{status.message}{status.link ? status.link : ''}</p> : ''}
          {status.type === 'error' ? <p style={{color:"#ff0000"}} className = "status">{status.message}{status.link ? status.link : ''}</p> : ''}
        </form>
    </div>
  )
  
}
