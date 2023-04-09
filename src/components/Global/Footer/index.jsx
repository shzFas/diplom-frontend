import React from "react";
import styles from "./Footer.module.scss";
import logoKTU from "../../../assets/logoKTU.png";
import githubSvg from "./github.svg";

export const Footer = ({ changeLanguage }) => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerInner}>
        <div className={styles.footerItem}>
          <div className={styles.logoImg}>
            <img src={logoKTU} alt="logoKTU" />
          </div>
        </div>
        <div className={styles.footerItem}>
          <button onClick={() => changeLanguage("kaz")} className={styles.langBtn}>
            KAZ
          </button>
          <button onClick={() => changeLanguage("ru")} className={styles.langBtn}>
            RU
          </button>
        </div>
        <div className={styles.footerItem}>
          <a
            href="https://github.com/shzFas"
            className={styles.logoGit}
            target="_blank"
            rel="noreferrer"
          >
            <img src={githubSvg} alt="git" />
          </a>
        </div>
      </div>
    </footer>
  );
};
