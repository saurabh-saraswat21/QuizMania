import React, { useContext } from 'react';
// import { NavLink } from 'react-router-dom'
import { useHistory } from 'react-router-dom';
import UserContext from '../../context/userContext';

const SignedOutLinks = () => {
    const { userData, setUserData } = useContext(UserContext);
    const history = useHistory();

    const signup = () => {
        history.push('/signup');
    }
    const signin = () => {
        history.push('/signin');
        console.log(userData.user);
    }
    const logout = () => {
        setUserData({
            token: undefined,
            user: undefined
        });
        localStorage.setItem("auth-token", "");
    }
    return (
        <ul className='right'>
            {(userData.user) ? (
                <li onClick={logout}>Sign out</li>

            ) : (
                    <>

                        <li onClick={signup}>Sign Up</li>
                        <li onClick={signin}>Log In</li>
                    </>
                )

            }
        </ul>
    )
}
export default SignedOutLinks