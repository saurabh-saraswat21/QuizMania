import React from 'react';
import { homeObjOne, homeObjTwo, homeObjFour } from './Data';
import { InfoSection } from '../../Components';
import Footer from '../Footer/Footer';

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
