import React from 'react'
import '../../App.css'
import Cards from '../HomePageComp/Cards';
import Footer from '../HomePageComp/Footer';
import Title from '../HomePageComp/Title'
import Navbar from '../partials/Navbar';

function Home () {

    return (
        <>
            <Navbar />
            <Title />
            <Cards />
            <Footer />
        </>
    )

}

export default Home;