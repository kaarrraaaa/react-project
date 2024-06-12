import React from "react";
import styles from './PaginationButton.module.css'
import classNames from "classnames";


export default function PaginationButton(props) {
  const { active, updatePage, children } = props;
  return (
    <button
      className={classNames(styles['pagination-button'], {
        [styles.active]: active,
      })}
      onClick={updatePage}
    >
      {children}
    </button>
  );
}
