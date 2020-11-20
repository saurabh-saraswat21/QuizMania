import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import cookie from 'js-cookie';
import UserContext from '../../context/userContext';
import { FaBars, FaTimes } from 'react-icons/fa';
import { IconContext } from 'react-icons/lib';
import { Button } from '../../globalStyles';
import {
  Nav,
  NavbarContainer,
  NavLogo,
  NavIcon,
  MobileIcon,
  NavMenu,
  NavItemBtn,
  NavBtnLink
} from './Navbar.elements';

function Navbar() {
  const { userData, setUserData } = useContext(UserContext);
  const history = useHistory();

  const signup = () => {
    history.push('/signup');
  }
  // const signin = () => {
  //   console.log(userData);
  //   history.push('/signin');
  // }
  const logout = () => {
    // console.log(userData.user);
    setUserData({
      token: undefined,
      user: undefined
    });
    cookie.set("auth-token", "");
    history.push('/');
  }
  // style
  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);

  const handleClick = () => setClick(!click);
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
  }, []);

  window.addEventListener('resize', showButton);

  return (
    <>
      <IconContext.Provider value={{ color: '#fff' }}>
        <Nav>
          <NavbarContainer>
            <NavLogo to='/' onClick={closeMobileMenu}>
              <NavIcon />
              QuizMania
            </NavLogo>
            <MobileIcon onClick={handleClick}>
              {click ? <FaTimes /> : <FaBars />}
            </MobileIcon>
            <NavMenu onClick={handleClick} click={click}>

              <NavBtnLink to='/joinquiz'>
                <Button primary>JoinQuiz</Button>
              </NavBtnLink>

              {(userData.user) ? (
                <>
                  <NavItemBtn>
                    {button ? (
                      <NavBtnLink onClick={logout}>
                        <Button primary>Logout</Button>
                      </NavBtnLink>
                    ) : (
                        <NavBtnLink onClick={logout}>
                          <Button onClick={closeMobileMenu} fontBig primary>
                            Logout
                    </Button>
                        </NavBtnLink>
                      )}
                  </NavItemBtn>
                </>
              ) : (
                  <>
                    <NavItemBtn>
                      {button ? (
                        <NavBtnLink onClick={signup}>
                          <Button primary>SignUp</Button>
                        </NavBtnLink>
                      ) : (
                          <NavBtnLink onClick={signup}>
                            <Button onClick={closeMobileMenu} fontBig primary>
                              SignUp
                    </Button>
                          </NavBtnLink>
                        )}
                    </NavItemBtn>
                  </>
                )

              }
              {/* <NavItemBtn>
                {button ? (
                  <NavBtnLink to='/signup'>
                    <Button primary>SIGN UP</Button>
                  </NavBtnLink>
                ) : (
                    <NavBtnLink to='/signup'>
                      <Button onClick={closeMobileMenu} fontBig primary>
                        SIGN UP
                    </Button>
                    </NavBtnLink>
                  )}
              </NavItemBtn> */}
            </NavMenu>
          </NavbarContainer>
        </Nav>
      </IconContext.Provider>
    </>
  );
}

export default Navbar;