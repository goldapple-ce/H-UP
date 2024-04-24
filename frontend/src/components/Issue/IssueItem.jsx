import React from "react";
import styles from "./IssueItem.module.scss";

const IssueItem = ({ issue, onClick }) => {
    const { name } = issue;
    const imageList = [{
        id: 1,
        src: "https://images.unsplash.com/photo-1491349174775-aaafddd81942?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=934&q=80",
        alt: 1,
    }, {
        id: 2,
        src: "https://images.unsplash.com/photo-1476657680631-c07285ff2581?ixlib=rb-1.2.1&auto=format&fit=crop&w=2210&q=80",
        alt: 2,
    }, {
        id: 3,
        src: "https://images.unsplash.com/photo-1496345875659-11f7dd282d1d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2250&q=80",
        alt: 3,
    }, {
        id: 4,
        src: "https://images.unsplash.com/photo-1455504490126-80ed4d83b3b9?ixlib=rb-1.2.1&auto=format&fit=crop&w=2250&q=80",
        alt: 4,
    }]

    return (
        <div className={styles.issue_item_container} onClick={onClick}>
            <div>
                <div>
                    <div className="time">11:00 - 12:00 PM</div>
                    <div className="task-name">Practise</div>
                </div>
                <div className="more-button"></div>
                <ul>
                    {imageList.map((image) => (
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