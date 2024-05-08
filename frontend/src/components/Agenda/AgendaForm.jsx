import React from 'react'
import styles from './AgendaForm.module.scss'
import {useRecoilState} from 'recoil'
import AgendaItemContainer from './AgendaItemContainer';
import { agendaListState } from '../../recoil/recoil';

const AgendaForm = () => {
    const [agendaList, setAgendaList] = useRecoilState(agendaListState);

    const imminentDate = (agenda) => {
        const date = agenda.createdAt;

        const year = date.getFullYear();
        const month = date.getMonth();
        const day = date.getDate() - 7;

        return new Date(year,month,day,0,0,0,0)
    }

    return (
        <div className={styles.agenda}>
            <div className={styles.agenda__column1}>
                <ul className={styles.agenda__list}>
                    {agendaList.map((agenda) => (
                        <li key={agenda.agendaId}>
                            <AgendaItemContainer agenda={agenda} />
                        </li>
                    ))}
                </ul>
            </div>
            <div className={styles.agenda__column2}>
                <h4>최근 생성된 의사결정</h4>
                <ul className={styles.agenda__imminent_list}>
                    {agendaList
                        .filter((agenda) => new Date() >= imminentDate(agenda))
                        .map((agenda) => (
                            <li key={agenda.agendaId}>
                                <AgendaItemContainer agenda={agenda} />
                            </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default AgendaForm;