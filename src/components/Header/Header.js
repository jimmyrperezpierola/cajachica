import React, { useState, useEffect } from 'react';
import { Button } from '../Button/Button';
import { connect, useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import PATHS from '../../routes';
import { logout } from '../../actions/auth';
import { clearNotification } from '../../actions/notification';
import './Header.css';

const Header = (props) => {
    const dispatch = useDispatch();
    const isAuth = useSelector(state => state.auth);
    const [click, setClick] = useState(false);//const [click, setClick] = useState(false);
    const [button, setButton] = useState(true);//const [button, setButton] = useState(true);

    const closeMobileMenu = () => setClick(false);

    const showButton = () => {
        if (window.innerWidth <= 960) {
          setButton(false);
        } else {
          setButton(true);
        }
      };

      useEffect(() => {
        showButton();
        window.addEventListener('resize', showButton);
        return() => window.removeEventListener('resize', showButton);  
      }, []);

    return (
        <>
        <header className="navbar">
            <div className="navbar-container container">
                    {/* <div className="logo">IO</div> */}
                    <Link to={PATHS.HOME} className='navbar-logo'>IO Caja Chica</Link>   
                    <ul className={click ? 'nav-menu active' : 'nav-menu'}>                                        
                        <li className='nav-item'>
                            <Link to={PATHS.HOME} className="nav-links">Home</Link>
                        </li>
                        <li className='nav-item'>
                            <Link to={PATHS.SEARCH} className="nav-links">Search</Link>
                        </li>
                        {
                            isAuth.isAuthenticated ? <>
                                    <li className='nav-item'><Link to={PATHS.ADD_BOOK} className="nav-links">Caja Chica</Link> </li>
                                    <span onClick={() => { dispatch(logout()); console.log("apple") }} className="nav logout-btn">Logout</span>
                                </> 
                                : <>
                                    <li className='nav-btn'>
                                        { button ? (
                                            <Link to={PATHS.SIGN_IN} className="btn-link"><Button buttonStyle='btn--outline'>SIGN IN</Button></Link> 
                                            ) : (
                                                <Link to={PATHS.SIGN_IN} className='btn-link'>
                                                    <Button
                                                        buttonStyle='btn--outline'
                                                        buttonSize='btn--mobile'
                                                        onClick={closeMobileMenu}
                                                    >
                                                    SIGN IN
                                                    </Button>
                                              </Link>                                                
                                          )                                            
                                        }
                                    </li>
                                    {/* <li className='nav-btn'>
                                        <Link to={PATHS.SIGN_UP} className="btn-link"><Button buttonStyle='btn--outline'>SIGN UP</Button></Link> 
                                    </li> */}
                                </>
                        }
                    </ul>
            </div>                   
        </header>
        <hr />            
        </>
    );
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, {clearNotification})(Header); 