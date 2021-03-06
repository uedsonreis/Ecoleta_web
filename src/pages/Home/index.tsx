import React from 'react'
import { Link } from 'react-router-dom'
import { FiLogIn } from 'react-icons/fi'

import Header from '../../components/Header'

import './styles.css'

export default function Home() {
    return (
        <div id="page-home">
            <div className="content">
                
                <Header />

                <main>
                    <h1>Seu marketplace de coleta de resíduos.</h1>
                    <p>Ajudamos pessoas a encontrarem pontos de coleta de forma eficiente.</p>

                    <Link to="/register">
                        <span> <FiLogIn /> </span>
                        <strong> Cadastre um ponto de coleta </strong>
                    </Link>
                </main>

            </div>
        </div>
    )
}
