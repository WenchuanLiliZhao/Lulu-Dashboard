import styles from "./HoverBox.module.scss";

const HoverBox = ({className}: {className?: string}) => {
  return <div className={`${styles["hover-box"]} ${className}`}></div>;
};

export default HoverBox;
