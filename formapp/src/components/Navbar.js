import React from 'react'
import { Link } from 'react-router-dom'
import Formdata from './Formdata'
const Navbar = () => {
    return (
        <div>
            <nav className="navbar navbar-expand-lg bg-body-tertiary">
                <div className="container-fluid">
                    <a className="navbar-brand" href="/">Medicare</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <a className="nav-link" aria-current="page" href="https://github.com/PIYUSH-GIRI23/Intern-form-reactjs" target="_blank">Frontend (Github)</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="https://github.com/PIYUSH-GIRI23/Intern-form" target="_blank">Backend (Github)</a>
                            </li>
                        </ul>
                        <form className="d-flex" role="search">
                            <Link className="btn btn-outline-success" type="submit" to='/Admin'>Admin</Link>
                        </form>
                    </div>
                </div>
            </nav>
            <Formdata/>
        </div>
    )
}

export default Navbar
