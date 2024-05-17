import { requestTeamProjectList } from '@api/services/project';
import { requestTeamList } from '@api/services/team';
import { projectState } from '@recoil/project';
import { MenuSidebarState } from '@recoil/recoil';
import { teamState } from '@recoil/team';
import { useEffect, useState } from 'react';
import { List } from 'react-bootstrap-icons';
import { useRecoilState } from 'recoil';
import styles from './MenuSidebar.module.scss';
import SubMenu from './SubMenu';
import { infoState } from '@recoil/info';
import { Settings } from '@styled-icons/evaicons-solid/Settings';
import IconButton from '../IconButton/IconButton';
import SettingContainer from '@component/Setting/SettingContainer';

const MenuSidebar = () => {
  const [isOpen, setIsopen] = useRecoilState(MenuSidebarState);
  const [projectList, setProjectList] = useRecoilState(projectState);
  const [teamList, setTeamList] = useRecoilState(teamState);
  const [info, setInfo] = useRecoilState(infoState);
  const [isSettingOpen, setIsSettingOpen] = useState(false);

  // 팀 선택 Radio
  const handleRadioChange = async event => {
    const teamId = event.target.value;
    try {
      const teamData = await requestTeamProjectList(teamId);
      console.log(teamData);
      setInfo({
        teamId: teamId,
      });
      setProjectList(teamData.data.projectInfoList);
    } catch (error) {
      console.log(error);
    }
  };

  // Side바 보여주기
  const ShowSidebar = () => {
    isOpen === true ? setIsopen(false) : setIsopen(true);
  };

  const showSetting = () => {
    setIsSettingOpen(true);
  }
  const closeSetting = () => {
    setIsSettingOpen(false);
  }

  // Team 리스트 불러오기
  useEffect(() => {
    const fetchData = async () => {
      try {
        setTeamList([]);
        const response = await requestTeamList();
        console.log(response.data);
        const teams = response.data.teamInfoList;
        setTeamList(teams);

        if (teams.length > 0) {
          const teamData = await requestTeamProjectList(teams[0].id);
          console.log(teamData.data);
          setProjectList(teamData.data.projectInfoList);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <div className='bar-container'>
        <div
          className={`${styles.sidebar} ${isOpen == true ? styles.active : ''}`}
        >
          <div className={styles.sd_header}>
            <h4 className='mb-0'>사이드 바</h4>
            <div className='btn' onClick={ShowSidebar}>
              <List />
            </div>
          </div>
          <div className={styles.sd_option}>
            <div className={styles.sd_option_item} onClick={showSetting}>
              <IconButton >
                <Settings />
              </IconButton>
              <div >설정</div>
            </div>
            <SettingContainer isOpen={isSettingOpen} closeSetting={closeSetting}/>
          </div>
          <div className={styles.sd_body}>
            <ul>
              {projectList.map(item => {
                return <SubMenu key={item.id} item={item} />;
              })}
            </ul>
          </div>
          <div className={styles.team_container}>
            <h5>Team</h5>
            {teamList.map(team => (
              <div className={styles.team}>
                <label key={team.id} htmlFor={team.id}>
                  <input
                    type='radio'
                    name='team'
                    value={team.id}
                    id={team.id}
                    className={styles.team__radio}
                    onChange={handleRadioChange}
                  />
                  {team.name}
                </label>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default MenuSidebar;
