import React, {useEffect} from "react";
import styles from "./MainTab.module.scss"
import IssueForm from "../Issue/IssueForm";
import MyCalendar from "../Calendar/Calendar";
import Kanban from "../Kanban/Kanban";
import { RecoilRoot } from "recoil";

const MainTab = () => {

    useEffect(() => {
        let option = document.getElementById("tab-1");
        option.checked = true;
      }, []);

    return (
        <div className={styles.maintab_container}>
            <div className={styles.tab__group}>
            
                <div className={styles.tab}>
                    <input className={styles.tab__radio} type="radio" id="tab-1" name="tab-group-1"/>
                    <label className={styles.tab__label} htmlFor="tab-1">이슈</label>
                    
                    <div className={styles.tab__content}>
                        {/* 이슈 목록 */}
                        <IssueForm/>
                    </div> 
                </div>
                
                <div className={styles.tab}>
                    <input className={styles.tab__radio} type="radio" id="tab-2" name="tab-group-1"/>
                    <label className={styles.tab__label} htmlFor="tab-2">칸반</label>
                    
                    <div className={styles.tab__content}>
                        <Kanban/>
                    </div> 
                </div>
            
                <div className={styles.tab}>
                    <input className={styles.tab__radio} type="radio" id="tab-3" name="tab-group-1"/>
                    <label className={styles.tab__label} htmlFor="tab-3">할 일</label>
                    
                    <div className={styles.tab__content}>
                        할 일 목록이 들어갈 공간입니다.
                    </div> 
                </div>

                <div className={styles.tab}>
                    <input className={styles.tab__radio} type="radio" id="tab-4" name="tab-group-1"/>
                    <label className={styles.tab__label} htmlFor="tab-4">의사결정</label>
                    
                    <div className={styles.tab__content}>
                        의사결정이 들어갈 공간입니다.
                    </div>
                </div>

                <div className={styles.tab}>
                    <input className={styles.tab__radio} type="radio" id="tab-5" name="tab-group-1"/>
                    <label className={styles.tab__label} htmlFor="tab-5">캘린더</label>
                    
                    <div className={styles.tab__content}>
                        <MyCalendar/>
                    </div> 
                </div>
            
            </div>
        </div>
    )
}

export default MainTab