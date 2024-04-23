import React from "react";
import styles from "./IssueItem.module.scss";

const IssueItem = ({ issue, onClick }) => {
  const { name } = issue;

  return (
    <div className={styles.issue_item_container}>
        {onClick && (
          <div onClick={onClick}>
            <p>{name}</p>
          </div>
        )}
    </div>
  );
};

export default IssueItem;