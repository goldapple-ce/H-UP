import React, { useState, useEffect } from "react";
import styles from "./AgendaItem.module.scss";
import { CaretRightFill } from 'react-bootstrap-icons';
import playIcon from "../../assets/img/play_icon.png";

const AgendaItem = ({agenda, onClick}) => {

    const {id, title, createdAt, requester, responser} = agenda;
    const [ iconImage, setIconImage ] = useState('')


    const formatToDate = (jsDateStr) => {
        const date = new Date(jsDateStr);
        const year = date.getFullYear();
        const month = date.getMonth()+1;
        const day = date.getDate();
        // const hour = date.getHours();
        // const minutes = date.getMinutes();
        // const formattedDate = `${year}년 ${month}월 ${day}일 ${hour}:${minutes}`;
        const formattedDate = `${year}. ${month}. ${day}`;
        return formattedDate;
    };    

    return (
        <div className={styles.agenda} onClick={onClick}>
            <img src={playIcon} alt=""/>
            <h5>{title}</h5>
            <ul>
                <p>{formatToDate(createdAt)}</p>
            </ul>
            <img className={styles.agenda__requester}
                key={requester.id}
                src={requester.img}
                alt={requester.name}     
            />
            <CaretRightFill/>
            <img className={styles.agenda__responser}
                key={responser.id}
                src={responser.img}
                alt={responser.name}     
            />
        </div>

    )    
}

export default AgendaItem;