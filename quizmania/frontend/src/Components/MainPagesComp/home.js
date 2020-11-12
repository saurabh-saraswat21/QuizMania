import React from 'react';
import { homeObjOne, homeObjTwo, homeObjThree, homeObjFour } from './Data';
import { InfoSection } from '../../Components';
import Footer from '../Footer/Footer';
import Navbar from '../Navbar/Navbar';

function Home() {
  return (
    <>
      <InfoSection {...homeObjOne} />
      <InfoSection {...homeObjTwo} />
      <InfoSection {...homeObjFour} />
      <Footer/>
    </>
  );
}

export default Home;
