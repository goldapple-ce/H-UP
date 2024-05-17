import { requestAllMember } from '@api/services/auth';
import {
  requestTeamInviteMember,
  requestTeamMemberList,
} from '@api/services/team';
import { useEffect, useState } from 'react';
import InviteMemberContainer from './InviteMemberContainer';
import styles from './ManagementItem.module.scss';
import MemberManagement from './MemberManagement';

const TeamManagementItem = ({ team }) => {
  const [teamMembers, setTeamMembers] = useState([]);
  const [members, setMembers] = useState([]);
  const [inviteMembers, setInviteMembers] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  const getAllMemberInfo = async () => {
    const response = await requestAllMember();
    setMembers(response.data.memberInfoList);
  };

  const toggleContent = () => {
    setIsOpen(!isOpen);
  };

  async function invite() {
    const formData = {
      teamId: team.id,
      memberIdList: inviteMembers.map(member => member.id),
    };
    await requestTeamInviteMember(JSON.stringify(formData));
    alert('초대완료');
  }

  const getTeamMemberInfo = async () => {
    const response = await requestTeamMemberList(team.id);
    setTeamMembers(response.data.memberInfoList);
  };

  useEffect(() => {
    getTeamMemberInfo();
    getAllMemberInfo();
  }, []);

  return (
    <div>
      <div className={styles.header} onClick={toggleContent}>
        {team.name}
      </div>
      {isOpen && (
        <div className={styles.body}>
          <MemberManagement members={teamMembers} />
          <InviteMemberContainer
            members={members}
            inviteMembers={inviteMembers}
            setInviteMembers={setInviteMembers}
            invite={invite}
          />
        </div>
      )}
    </div>
  );
};

export default TeamManagementItem;
