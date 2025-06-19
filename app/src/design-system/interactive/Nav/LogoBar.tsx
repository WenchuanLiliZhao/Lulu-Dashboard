import { Link } from "react-router";
import styles from "./LogoBar.module.scss";

interface LogoBarProps {
  logo: React.ReactNode;
  title: string;
}

export const LogoBar: React.FC<LogoBarProps> = ({ logo, title }) => {
  return (
    <div className={styles["logo-bar"]}>
      <div className={styles["logo-bar-logo"]}>
        <Link to="/">
          {logo}
        </Link>
      </div>
      <div className={styles["logo-bar-title"]}>{title}</div>
    </div>
  );
};