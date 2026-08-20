import React from "react";

const NavigationDots = ({ active }) => (
  <div className="app__navigation">
    {["home", "skills", "work", "about", "contact"].map(
      (item, index) => (
        <a
          href={`#${item}`}
          key={item + index}
          className="app__navigation-dot"
          style={
            active === item
              ? { backgroundColor: "var(--secondary-color)", borderColor: "var(--secondary-color)" }
              : {}
          }
        />
      )
    )}
  </div>
);

export default NavigationDots;
