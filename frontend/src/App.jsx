import React from "react";
import Navbar from "./components/Navbar/Navbar";
import { About, Footer, Header, Skills, Testimonial, Work } from "./container";

const App = () => {
  return (
    <>
      <Navbar />
      <Header />
      <About />
      <Footer />
    </>
  );
};

export default App;
