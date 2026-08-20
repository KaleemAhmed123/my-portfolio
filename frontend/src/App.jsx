import React from "react";
import { Navbar } from "./components";
import { About, Footer, Header, Skills, Work } from "./container";
import "./App.scss";

const App = () => {
  return (
    <div className="app">
      <Navbar />
      <Header />
      <Skills />
      <Work />
      <About />
      <Footer />
    </div>
  );
};

export default App;
