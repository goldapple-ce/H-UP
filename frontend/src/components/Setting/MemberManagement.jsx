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
                <img className={memberManagementStyles.member_image}src="https://images.unsplash.com/photo-1455504490126-80ed4d83b3b9?ixlib=rb-1.2.1&amp;auto=format&amp;fit=crop&amp;w=2250&amp;q=80" alt="4"/>
                <div className={memberManagementStyles.member_name}>{member.name}</div>
            </div>
            ))}
        </div>
    </div>
  );
};

export default MemberManagement;