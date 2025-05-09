import React from "react";
import Header from "../components/Header";
import CalculatorTabs from "../components/CalculatorTabs";
import Footer from "../components/Footer";
import Skip from "../components/Skip";
import Main from "../components/Main";

const HomeView = () => {
    return (
        <>
            <Skip />
            <Header />
            <Main>
                <CalculatorTabs />
            </Main>
            <Footer />
        </>
    );
};

export default HomeView;