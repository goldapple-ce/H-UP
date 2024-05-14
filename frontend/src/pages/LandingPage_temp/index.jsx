// import useInput from '@hook/useInput';
// import useLogin from '@hook/useLogin';
// import { Styleshare } from '@styled-icons/simple-icons';
// import { useNavigate } from 'react-router-dom';
import styles from './LandingPage.module.scss';

const LandingPage = props => {

    return (
        <div>
            <nav className={styles.nav}>
  <input type="checkbox" class="nav__cb" id="menu-cb"/>
  <div class="nav__content">
    <ul class="nav__items">
      <li class="nav__item">
        <span class="nav__item-text">
          Home
        </span>
      </li>
      <li class="nav__item">
        <span class="nav__item-text">
          Works
        </span>
      </li>
      <li class="nav__item">
        <span class="nav__item-text">
          About
        </span>
      </li>
      <li class="nav__item">
        <span class="nav__item-text">
          Contact
        </span>
      </li>
    </ul>
  </div>
  <label class="nav__btn" for="menu-cb"></label>
</nav>
        </div>
    );
};

export default LandingPage;