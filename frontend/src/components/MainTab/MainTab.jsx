import { useAgendaListQuery } from '@hook/ReactQuery/useAgendaList';
import { useIssueListQuery } from '@hook/ReactQuery/useIssueList';
import { useTodoListQuery } from '@hook/ReactQuery/useTodoList';
import { agendaState } from '@recoil/agenda';
import { issueState } from '@recoil/issue';
import { todoState } from '@recoil/todo';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom/dist';
import { useSetRecoilState } from 'recoil';
import Agenda from '../Agenda/Agenda';
import MyCalendar from '../Calendar/Calendar';
import IssueForm from '../Issue/IssueForm';
import Kanban from '../Kanban/Kanban';
import Todo from '../Todo/Todo';
import styles from './MainTab.module.scss';
import Tab from './Tab';

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
  const [activeTab, setActiveTab] = useState(1);

  const handleTabContent = tab => {
    console.log(tab);
    setActiveTab(tab);
  };

  useEffect(() => {
    console.log('activeTab : ' + activeTab);
  }, [activeTab]);
  // issue
  const { isLoading: issueLoading, data: issues } = useIssueListQuery(
    parseInt(id),
  );

  const setIssueList = useSetRecoilState(issueState);

  useEffect(() => {
    const fetchData = async () => {
      if (Array.isArray(issues) && issues.length > 0) {
        try {
          console.log('issue changed');
          console.log(issues);
          setIssueList(
            issues.map(item => ({
              ...item,
              title: item.title || '제목 없음',
            })),
          );
        } catch (error) {
          console.log(error);
          setIssueList([]);
        }
      }
    };
    fetchData();
  }, [issues]);

  // to_do
  const { isLoading: todoLoading, data: todos } = useTodoListQuery(
    parseInt(id),
  );

  const setTodoList = useSetRecoilState(todoState);

  useEffect(() => {
    console.log('todo changed');
    console.log(todos);
    setTodoList(todos);
  }, [todos]);

  // agendas
  const { isLoading: agendaLoading, data: agendas } = useAgendaListQuery(
    parseInt(id),
    {},
  );

  const setAgendaList = useSetRecoilState(agendaState);

  useEffect(() => {
    console.log(agendas);
    setAgendaList(agendas);
  }, [agendas]);

  return (
    <div className={styles.maintab_container}>
      <div className={styles.tab__group}>
        <Tab
          groupId='1'
          id='1'
          name='이슈'
          onClick={() => handleTabContent(1)}
          setDefault={true}
        ></Tab>
        <Tab
          groupId='1'
          id='2'
          name='칸반'
          onClick={() => handleTabContent(2)}
        ></Tab>
        <Tab
          groupId='1'
          id='3'
          name='할일'
          onClick={() => handleTabContent(3)}
        ></Tab>
        <Tab
          groupId='1'
          id='4'
          name='의사결정'
          onClick={() => handleTabContent(4)}
        ></Tab>
        <Tab
          groupId='1'
          id='5'
          name='캘린더'
          onClick={() => handleTabContent(5)}
        ></Tab>
      </div>
      <div className={styles.tab__content}>
        {activeTab === 1 && !issueLoading && <IssueForm />}
        {activeTab === 2 && !issueLoading && <Kanban />}
        {activeTab === 3 && !todoLoading && <Todo />}
        {activeTab === 4 && !agendaLoading && <Agenda />}
        {activeTab === 5 && !issueLoading && <MyCalendar />}
      </div>
    </div>
  );
};

export default MainTab;
