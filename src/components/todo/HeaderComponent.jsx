import { Link } from 'react-router-dom'
import { useAuth, useUsername } from './security/AuthContext'
import { useNavigate } from 'react-router-dom'
import './HeaderComponent.css'

function HeaderComponent() {

    const navigate = useNavigate()
    const authContext = useAuth()
    const isAuthenticated = authContext.isAuthenticated
    const username = useUsername();

    function logout() {
        authContext.logout()
    }

    function handleHomeClick() {
        navigate(`/welcome/${username}`)
    }

    function deleteAccount() {
        authContext.deleteAccount();
    }
    function createAccount() {
        console.log('create account')
        navigate('/register')
    }

    return (

        <header className="border-bottom border-light border-5 mb-5 p-2">
            <div className="container">
                <div className="row">
                    <nav className="navbar navbar-expand-lg">
                        <a className="navbar-brand ms-2 fs-2 fw-bold text-black" href="https://github.com/AdhikritGupta?tab=repositories">Adhikrit</a>
                        <div className="collapse navbar-collapse">
                            <ul className="navbar-nav">
                                <li className="nav-item">
                                    {isAuthenticated
                                        && <button className="nav-link btn" onClick={handleHomeClick}>Home</button>}

                                </li>
                                <li className="nav-item">
                                    {isAuthenticated
                                        && <Link className="nav-link" to="/todos">Todos</Link>}
                                </li>
                                <li className="nav-item">
                                    {!isAuthenticated &&
                                        <button className="nav-link btn" onClick={createAccount}>Create Account</button>}
                                </li>
                                <li className="nav-item">
                                {isAuthenticated &&
                                    <button className="nav-link" onClick={deleteAccount}>Delete Account</button>}
                                </li>
                            </ul>
                        </div>
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <a className="nav-link nav-button" href="/">
                                    <img src="/logo192.png" alt="App Logo" style={{ height: '24px', marginRight: '2px' }} />
                                </a>
                            </li>
                            <li className="nav-item">
                                {!isAuthenticated && <Link className="nav-link" to="/login">Login</Link>}
                            </li>
                            <li className="nav-item">
                                {isAuthenticated &&
                                    <Link className="nav-link" to="/logout" onClick={logout}>Logout</Link>}
                            </li>
                            

                        </ul>
                    </nav>
                </div>
            </div>
        </header>

    )
}

export default HeaderComponent