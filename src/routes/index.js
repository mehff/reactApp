import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import UserInfo from '../pages/userInfo'
import SignUp from '../pages/signUp'
import SignIn from '../pages/signIn'
import InexistentPage from '../pages/inexistentRoute'
import Menu from '../pages/menu'

export default function Router() {
  return(
    <BrowserRouter>
    <Menu></Menu>
    <Routes>
      <Route exact path="/" element={<SignUp/>}/>
      <Route exact path="/userInformation" element={<UserInfo/>}/>
      <Route path="*" element={<InexistentPage/>}/>
      <Route path="/signIn" element={<SignIn/>}/>

    </Routes>
    </BrowserRouter>
      
   
  )
}
