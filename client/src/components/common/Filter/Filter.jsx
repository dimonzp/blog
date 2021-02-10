import React from "react";
import style from "./Filter.module.scss";

const Filter = ({ onChangeHandler, placeHolder }) => {
  return (
    <div className={style.group} >
      <input
        className={style.input}
        type="text"
        placeholder={placeHolder}
        onChange={onChangeHandler}
      />
      <span className={style.bar}></span>
      <label className={style.label}>Filter by</label>
    </div>
  );
};

export default Filter;
