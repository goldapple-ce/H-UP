import { useAgendaListQuery } from '@hook/ReactQuery/useAgendaList';
import { useIssueListQuery } from '@hook/ReactQuery/useIssueList';
import { useTodoListQuery } from '@hook/ReactQuery/useTodoList';
import { agendaState } from '@recoil/agenda';
import { issueState } from '@recoil/issue';
import { todoState } from '@recoil/todo';
import { useEffect } from 'react';
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
  // issue
  const { isLoading: issueLoading, data: issues } = useIssueListQuery(
    parseInt(id),
  );

  const setIssueList = useSetRecoilState(issueState);

  useEffect(() => {
    console.log('issue changed');
    console.log(issues);
    if (issues)
      setIssueList(
        issues.map(item => ({
          ...item,
          title: item.title || '제목 없음',
        })),
      );
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
        <Tab groupId='1' id='1' name='이슈' setDefault={true}>
          {!issueLoading && <IssueForm />}
        </Tab>
        <Tab groupId='1' id='2' name='칸반'>
          {!issueLoading && <Kanban />}
        </Tab>
        <Tab groupId='1' id='3' name='할일'>
          {!todoLoading && <Todo />}
        </Tab>
        <Tab groupId='1' id='4' name='의사결정'>
          {!agendaLoading && <Agenda />}
        </Tab>
        <Tab groupId='1' id='5' name='캘린더'>
          {!todoLoading && <MyCalendar todos={todos} />}
        </Tab>
      </div>
    </div>
  );
};

export default MainTab;
