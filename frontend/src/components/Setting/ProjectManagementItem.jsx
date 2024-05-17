import { requestProject, requestTeamMember } from '@api/services/setting';
import styles from './ManagementItem.module.scss';
import { useEffect, useState } from 'react';
import ProjectMemberItem from './ProjectMemberItem';

const ProjectManagementItem = ({ team }) => {
  const [projects, setProjects] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  const toggleContent = () => {
    setIsOpen(!isOpen);
  };

  const getProject = async () => {
    const response = await requestProject(team.id);
    setProjects(response.data.projectInfoList);
  };

  useEffect(() => {
    getProject();
  }, []);

  return (
    <div>
      <div className={styles.header} onClick={toggleContent}>
        {team.name}
      </div>
      {isOpen && 
        <div className={styles.body}>  
          {projects && projects.map(project => (
            <ProjectMemberItem key={project.id} team = {team} project = {project}/>
          ))}
        </div>
      }
    </div>
  );
};

export default ProjectManagementItem;
