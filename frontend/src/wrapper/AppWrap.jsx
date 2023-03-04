import React from "react";
import { NavigationDots, SocialMedia } from "../components";
// here HOC to provides fuul height, socia, dots
const AppWrap = (Component, idName, classNames) =>
  function HOC() {
    return (
      // implementing css in main.css
      <div id={idName} className={`app__container ${classNames}`}>
        <SocialMedia />
        <div className="app__wrapper app__flex">
          {/* other components gets wrapped with 100vh and centered also */}
          <Component />

          <div className="copyright">
            <p className="p-text">@2023 Kaleem</p>
          </div>
        </div>
        <NavigationDots active={idName} />
      </div>
    );
  };

export default AppWrap;
