import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import UserContext from '../../context/userContext';

export default function AuthOption() {
    const { userData, setUserData } = useContext(UserContext);
    const history = useHistory();

    const signup = () => {
        history.push('/signup');
    }
    const signin = () => {
        console.log(userData);
        history.push('/signin');
    }
    const logout = () => {
        // console.log(userData.user);
        setUserData({
            token: undefined,
            user: undefined
        });
        localStorage.setItem("auth-token", "");
    }
    return (
        <ul className='right'>
            {(userData.user) ? (
                <>
                    <li onClick={logout}>Sign out</li>
                    <li >{(userData.user.displayName)} </li>
                </>
            ) : (
                    <>

                        <li onClick={signup}>Sign Up</li>
                        <li onClick={signin}>Log In</li>
                    </>
                )

            }
        </ul>
    );
}