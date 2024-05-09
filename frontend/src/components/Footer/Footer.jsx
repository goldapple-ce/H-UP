import styles from './Footer.module.scss'; // CSS 파일 임포트

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.content}>
        <p>Copyright © 2024 H-up. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
