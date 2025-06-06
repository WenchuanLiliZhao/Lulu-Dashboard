import styles from "./HoverBox.module.scss";

const HoverBox = ({className, style}: {className?: string, style?: React.CSSProperties}) => {
  return <div className={`${styles["hover-box"]} ${className}`} style={style}></div>;
};

export default HoverBox;
