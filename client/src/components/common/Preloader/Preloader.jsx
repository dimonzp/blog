import React from "react";
import preloader from "../../../assets/Spinner.svg";
import style from "./Preloader.module.scss";

const Preloader = () => {
  return (
    <div className={style.preloader}>
      <img src={preloader} alt="loading process" />
    </div>
  );
};

export default Preloader;
