import { inviteProjectMember, requestProjectMember, requestTeamMember } from '@api/services/setting';
import { useEffect, useState } from 'react';
import InviteMemberContainer from './InviteMemberContainer';
import styles from './ManagementItem.module.scss';
import MemberManagement from './MemberManagement';


const ProjectMemberItem = ({ team, project }) => {
  const [members, setMembers] = useState([]);
  const [teamMembers, setTeamMembers] = useState([]);
  const [inviteMembers, setInviteMembers] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  const toggleContent = () => {
    setIsOpen(!isOpen);
  };
  
  const getMember = async () => {
    const response = await requestProjectMember(project.id);
    setMembers(response.data.memberInfoList);
  }

  const getTeamMember = async () => {
    const response = await requestTeamMember(team.id);
    setTeamMembers(response.data.memberInfoList);
  }

  async function invite() {
    const formData = {
        projectId: project.id,
        memberList: inviteMembers.map(member => member.id)
    };
    console.log(JSON.stringify(formData));
    await inviteProjectMember(JSON.stringify(formData));
    alert('초대완료')
  }


  useEffect(() => {
    getMember();
    getTeamMember();
  }, []);

  return (
    <div>
      <div className={styles.header} onClick={toggleContent}>
        {project.name}
      </div>
      
      <div className={styles.body}>
        {isOpen && 
        <div>
          <MemberManagement members={members}/>
          <InviteMemberContainer members={teamMembers} inviteMembers={inviteMembers} setInviteMembers={setInviteMembers} invite={invite}/>
        </div>}
      </div>
    </div>
  );
};

export default ProjectMemberItem;