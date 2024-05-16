import { List } from 'react-bootstrap-icons';
import { useRecoilState } from 'recoil';
import { MenuSidebarState } from '@recoil/recoil';
import styles from './MenuSidebar.module.scss';
import SubMenu from './SubMenu';
import { LoadMyTeamList, LoadTeamProjectList } from '@api/services/team';
import {useState, useEffect} from 'react'
import { TeamListState } from '@recoil/team';
import { ProjectListState } from '@recoil/project';

const MenuSidebar = () => {
  const [isOpen, setIsopen] = useRecoilState(MenuSidebarState);
  const [projectList, setProjectList] = useRecoilState(ProjectListState);
  const [teamList, setTeamList] = useRecoilState(TeamListState);

  // 팀 선택 Radio 
  const handleRadioChange = async (event) => {
    const teamId = event.target.value;
    try {
      const teamData = await LoadTeamProjectList(teamId);
      setProjectList(teamData.data.projectInfoList);
    } catch (error) {
      console.log(error)
    }
  };

  // Side바 보여주기
  const ShowSidebar = () => {
    isOpen === true ? setIsopen(false) : setIsopen(true);
  };

  // Team 리스트 불러오기
  useEffect(() => {
    const fetchData = async () => {

      try {
        setTeamList([])
        const response = await LoadMyTeamList();
        const teams = response.data.teamInfoList;
        setTeamList(teams);

        if (teams.length > 0) {
          const teamData = await LoadTeamProjectList(teams[0].id);
          setProjectList(teamData.data.projectInfoList);
        }
      } catch (error) {
        console.log(error)
      }
    }
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
          <div className={styles.sd_body}>
            <ul>
              {projectList.map((item) => {
                return <SubMenu key={item.id} item={item} />;
              })}
            </ul>
          </div>
          <div className={styles.team_container}>
            
            <h5>Team</h5>
            {teamList.map((team) => (
              <div className={styles.team}>
                <label key={team.id} htmlFor={team.id}>
                  <input
                    type="radio"
                    name="team"
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
