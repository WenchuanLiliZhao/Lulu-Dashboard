interface IconProps {
  name: string;
  size?: number;
  style?: React.CSSProperties;
}

const Icon: React.FC<IconProps> = ({ name, size = 24, style }) => {
  return <i className={`material-icons`} style={{ fontSize: size, ...style }}>{name}</i>;
};

export default Icon;