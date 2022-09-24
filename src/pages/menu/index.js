import React from "react";
import '../../App.css'
import { Link } from "react-router-dom"

export default function menu(){
  return(
    <div>
      <nav className="menu">
        <ul>
          <li>
            <Link to="/">Cadastro</Link>
          </li>
          <li>
            <Link to="/signIn">Login</Link>
          </li>
        </ul>
      </nav>
    </div>
  )
}