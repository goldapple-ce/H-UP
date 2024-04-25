import React from "react";
import styles from "./IssueItem.module.scss";

const IssueItem = ({ issue, onClick }) => {
    const {name, imageList }= issue;

    return (
        <div className={styles.issue_item_container} onClick={onClick}>
            <div>
                <div>
                    <div className="time">11:00 - 12:00 PM</div>
                    <div className="task-name">{name}</div>
                </div>
                <div className="more-button"></div>
                <ul>
                    {imageList && imageList.map((image) => (
                    <img key={image.id}
                        src={image.src}
                        alt={image.alt}>
                    </img>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default IssueItem;