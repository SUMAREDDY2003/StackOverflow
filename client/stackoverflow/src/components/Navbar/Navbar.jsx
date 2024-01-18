import React, { useEffect } from 'react';
import {Link, useNavigate} from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import logo from '../../assets/logo.png';
import search from '../../assets/search-solid.svg';
import Avatar from '../../components/Avatar/Avatar';
import './Navbar.css'
import { setCurrentUser } from '../../actions/currentUser';
import { jwtDecode } from "jwt-decode";

const Navbar = () => {

    // var User = null
    // var User = JSON.parse(localStorage.getItem('Profile'))
      var User = useSelector((state) => (state.currentUserReducer))
      const naviagte = useNavigate() 
    const handleLogout = () => 
    {
      dispatch({type: 'LOGOUT'});
      naviagte('/')
      dispatch(setCurrentUser(null))
    }

      const dispatch = useDispatch()

      useEffect(() => {
        const token = User?.token;
        if(token){
          const decodedToken = jwtDecode(token)
          if( decodedToken.exp * 100 < new Date().getTime()){
            handleLogout();
          }
        }
        dispatch(setCurrentUser(JSON.parse(localStorage.getItem('Profile'))))
      },[dispatch])



  return (
    <nav className='main-nav'>
        <div className='navbar'>
            <Link to='/' className='nav-item nav-logo'>
                 <img src={logo} alt ="logo"></img>
            </Link>
            <Link to='/' className='nav-item nav-btns'>About</Link>
            <Link to='/' className='nav-item nav-btns'>Product</Link>
            <Link to='/' className='nav-item nav-btns'>For items</Link>
            <form>
                <input type='text' placeholder='search..'/>
                <img src={search} alt="search" width={18} className='icon'></img>
            </form>
            { User === null ?
                <Link to='/Auth' className='nav-item nav-links'>Log in</Link>:    
                <>
                    <Avatar
                backgroundColor="#009dff"
                px="10px"
                py="7px"
                borderRadius="50%"
                color="white"
              >
                <Link
                  to={`/Users/${User?.result?._id}`}
                  style={{ color: "white", textDecoration: "none" }}
                >
                  {User.result.name.charAt(0).toUpperCase()}
                </Link>
                </Avatar>
                    <button className='nav-item nav-links' onClick={handleLogout} style={{marginLeft: "15px"}}>Log Out</button>
                </>
            }
        </div>
    </nav>
    )
}

export default Navbar
