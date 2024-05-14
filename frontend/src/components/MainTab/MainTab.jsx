import Agenda from '../Agenda/Agenda';
import MyCalendar from '../Calendar/Calendar';
import IssueForm from '../Issue/IssueForm';
import Kanban from '../Kanban/Kanban';
import styles from './MainTab.module.scss';
import Todo from '../Todo/Todo';
import { useEffect, useState } from 'react';
import { useIssueListQuery } from '@hook/ReactQuery/useIssueList';
import { useParams } from 'react-router-dom/dist';

const MainTab = () => {
  // /////////////////////////////////////////////////////////////////////
  // // member id 테스트
  // const memberId = useSelector((state) => state.auth.memberId);

  // useEffect(() => {
  //     let option = document.getElementById("tab-1");
  //     option.checked = true;

  //     const data = onLoadData(memberId)
  //     console.log(data);
  //   }, []);
  //   ///////////////////////////////////////////////////////////////////
  const { id } = useParams();
  const { isLoading, data } = useIssueListQuery(parseInt(id));

  return (
    <div className={styles.maintab_container}>
      <div className={styles.tab__group}>
        {!isLoading ? (
          <>
            <div className={styles.tab}>
              <input
                className={styles.tab__radio}
                type='radio'
                id='tab-1'
                name='tab-group-1'
                defaultChecked={true}
              />
              <label className={styles.tab__label} htmlFor='tab-1'>
                이슈
              </label>

              <div className={styles.tab__content}>
                <IssueForm issues={data} />
              </div>
            </div>

            <div className={styles.tab}>
              <input
                className={styles.tab__radio}
                type='radio'
                id='tab-2'
                name='tab-group-1'
              />
              <label className={styles.tab__label} htmlFor='tab-2'>
                칸반
              </label>

              <div className={styles.tab__content}>
                <Kanban />
              </div>
            </div>
          </>
        ) : null}

        <div className={styles.tab}>
          <input
            className={styles.tab__radio}
            type='radio'
            id='tab-3'
            name='tab-group-1'
          />
          <label className={styles.tab__label} htmlFor='tab-3'>
            할 일
          </label>

          <div className={styles.tab__content}>
            <Todo />
          </div>
        </div>

        <div className={styles.tab}>
          <input
            className={styles.tab__radio}
            type='radio'
            id='tab-4'
            name='tab-group-1'
          />
          <label className={styles.tab__label} htmlFor='tab-4'>
            의사결정
          </label>

          <div className={styles.tab__content}>
            <Agenda />
          </div>
        </div>

        <div className={styles.tab}>
          <input
            className={styles.tab__radio}
            type='radio'
            id='tab-5'
            name='tab-group-1'
          />
          <label className={styles.tab__label} htmlFor='tab-5'>
            캘린더
          </label>

          <div className={styles.tab__content}>
            <MyCalendar />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainTab;
