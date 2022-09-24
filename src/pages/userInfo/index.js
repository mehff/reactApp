import React, {useState} from "react"
import firebase from "../../firebase"

export default function Home(){
  const [user, userInfo] = useState({ nome: '', sobrenome: '', email: '', senha: '' })

  firebase.auth().onAuthStateChanged(async (userResult) => {
    const uid = userResult.uid

    await firebase.firestore().collection("Usuarios").doc(uid).get()
      .then(result => {

        userInfo({
          ...user,
          nome: result.data().nome,
          sobrenome: result.data().sobrenome,
          dataNascimento: result.data().dataNascimento
      })
    })

  })

  return(
    <div>
      <h1>Seus dados:</h1>
      <p>Nome: {user.nome}</p>
      <p>Sobrenome: {user.sobrenome}</p>
      <p>Data de Nascimento: {user.dataNascimento}</p>

    </div>
  )
}