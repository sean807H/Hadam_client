import React from "react";
import styles from "./SplashScreen.module.css";
import splashLogo from "./splash.png";

function SplashScreen() {
  return (
    <div className={styles.container}>
      <img src={splashLogo} alt="Splash Logo" className={styles.logo} />
      <div className={styles.text}>하담: 하루를 담다</div>
    </div>
  );
}

export default SplashScreen;
