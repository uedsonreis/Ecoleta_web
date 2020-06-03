import React from 'react'

import logo from '../../assets/logo.svg'

interface Props { children?: any }

const Header: React.FC<Props> = (props) => {

    return (
        <header>
            <img src={logo} alt="Ecoleta" />
            {props.children}
        </header>
    )
}

export default Header