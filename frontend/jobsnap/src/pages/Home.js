import React from 'react';
import Header from "../components/Header";
import Footer from "../components/Footer";
import HeroSection from "../components/Hero_Section";
import Benefits_Section from "../components/Benefits_Section";
import How_It_Works_Section from "../components/How_It_Works_Section";

function Home() {
    return (
        <div>

            <HeroSection />
            <Benefits_Section />
            <How_It_Works_Section />


        </div>
    );
}

export default Home;
