import noImage from '@asset/img/no_image.png';
import styles from './UserIcon.module.scss';

export default function UserIcon({ src, alt }) {
  return (
    <img className={styles.user_icon} src={src ? src : noImage} alt={alt} />
  );
}
