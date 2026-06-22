import { type IconType } from 'react-icons';
import { FaFilePdf, FaGamepad, FaGithub, FaUserCircle, FaLink } from 'react-icons/fa';

const iconMap: Record<string, IconType> = {
  FaFilePdf,
  FaGamepad,
  FaGithub,
  FaUserCircle,
  FaLink,
};

const LinkIcon = ({
  iconName,
}: {
  iconName: string
}) => {
  const Icon = iconMap[iconName] ?? FaLink;
  return (
    <span className='inline-block'>
      <Icon />
    </span>
  );
};

export default LinkIcon;
