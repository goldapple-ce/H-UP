import { requestTeamProjectList } from '@api/services/project';
import { requestTeamList } from '@api/services/team';
import SettingContainer from '@component/Setting/SettingContainer';
import { menuSidebarState, teamIdState } from '@recoil/commonPersist';
import { projectState } from '@recoil/project';
import { teamState } from '@recoil/team';
import { Settings } from '@styled-icons/evaicons-solid/Settings';
import { useEffect, useState } from 'react';
import { List } from 'react-bootstrap-icons';
import { useRecoilState } from 'recoil';
import IconButton from '../IconButton/IconButton';
import styles from './MenuSidebar.module.scss';
import SubMenu from './SubMenu';

const MenuSidebar = () => {
  const [isOpen, setIsopen] = useRecoilState(menuSidebarState);
  const [projectList, setProjectList] = useRecoilState(projectState);
  const [teamList, setTeamList] = useRecoilState(teamState);
  const [teamId, setTeamId] = useRecoilState(teamIdState);
  const [isSettingOpen, setIsSettingOpen] = useState(false);

  // Team 리스트 불러오기
  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log('sideMenuBar opened : ' + isOpen);
        const response = await requestTeamList();
        if (response.data && Array.isArray(response.data.teamInfoList)) {
          console.log(response.data.teamInfoList);
          setTeamList(response.data.teamInfoList);
          setTeamId(parseInt(response.data.teamInfoList[0].id));
        } else {
          setTeamList([]);
        }
      } catch (error) {
        console.log(error);
        setTeamList([]);
      }
    };
    if (isOpen) fetchData();
  }, [isOpen]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await requestTeamProjectList(teamId);
        if (response.data && Array.isArray(response.data.projectInfoList)) {
          console.log(response.data.projectInfoList);
          setProjectList(response.data.projectInfoList);
        } else {
          setProjectList([]);
        }
      } catch (error) {
        console.log(
          'error : fail to fetch teamProjectList at menuSideBar' + error,
        );
      }
    };
    console.log('team Id changed to => ' + teamId);
    if (teamId !== 0) fetchData();
  }, [teamId]);

  const handleRadioChange = e => {
    setTeamId(parseInt(e.target.value));
  };

  // Side바 보여주기
  const ShowSidebar = () => {
    setIsopen(!isOpen);
  };

  const showSetting = () => {
    setIsSettingOpen(true);
  };
  const closeSetting = () => {
    setIsSettingOpen(false);
  };

  const [activeSubMenuId, setActiveSubMenuId] = useState(null);

  const handleSubMenuClick = (id) => {
    setActiveSubMenuId(prevId => prevId === id ? null : id);
  };

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
              <IconButton>
                <Settings />
              </IconButton>
              <div>설정</div>
            </div>
            <SettingContainer
              isOpen={isSettingOpen}
              closeSetting={closeSetting}
            />
          </div>
          <div className={styles.sd_body}>
            <ul>
              {projectList.map(item => {
                return <SubMenu 
                key={item.id} 
                item={item} 
                activeSubMenuId={activeSubMenuId}
                onSubMenuClick={handleSubMenuClick}
                />;
              })}
            </ul>
          </div>
          <div className={styles.team_container}>
            <h5>Team</h5>
            {teamList.map(team => (
              <div key={team.id} className={styles.team}>
                <label htmlFor={team.id}>
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
