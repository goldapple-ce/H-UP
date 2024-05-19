import UserIcon from '@component/common/UserIcon';
import styles from './ManagementItem.module.scss';
import memberManagementStyles from './MemberManagement.module.scss';

const MemberManagement = ({ members }) => {
  return (
    <div>
        <div className={styles.header}> 
            사용자
        </div>
        <div className={styles.body}>
            {members && members.map(member => (
            <div className={memberManagementStyles.member} key={member.id}>
                <UserIcon className={memberManagementStyles.member_image}
                  src={member.img}
                  alt={member.name}/>
                <div className={memberManagementStyles.member_name}>{member.name}</div>
            </div>
            ))}
        </div>
    </div>
  );
};

export default MemberManagement;