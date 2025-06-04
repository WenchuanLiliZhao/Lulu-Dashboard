import type { ColorName } from "../Timeline/Utils";
import styles from "./TransBgBox.module.scss";

interface TransBgBoxProps {
  className?: string;
  color: ColorName;
}

const TransBgBox = ({ className, color }: TransBgBoxProps) => {
  return <div className={`${styles["trans-bg-box"]} ${className} ${styles[color]}`}
    style={{
      backgroundColor: `var(--color-team-${color})`,
    }}
  ></div>;
};

export default TransBgBox;