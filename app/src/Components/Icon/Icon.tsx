interface IconProps {
  name: string;
  size?: number;
}

const Icon: React.FC<IconProps> = ({ name, size = 24 }) => {
  return <i className={`material-icons`} style={{ fontSize: size }}>{name}</i>;
};

export default Icon;