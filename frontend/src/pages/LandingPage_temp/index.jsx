import FloatingButton from '@component/FloatingButton/FloatingButton';
import styles from './LandingPage.module.scss';

const LandingPage = props => {
  return (
    <div>
      <h1 className={styles.hello}>반가워요!</h1>
      <div>
        <FloatingButton />
      </div>
    </div>
  );
};

export default LandingPage;
