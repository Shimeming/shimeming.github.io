'use client';
import { useState, useEffect } from 'react';
import { iconNameToFaIcon } from '@/lib/utils';

const LinkIcon = ({
  iconName,
}: {
  iconName: string
}) => {
  const [IconComponent, setIconComponent] = useState<React.ComponentType>();
  useEffect(() => {
    (async () => {
      const Icon = await iconNameToFaIcon(iconName);
      setIconComponent(() => Icon);
    })();
  }, [iconName]);
  return (
    <span className='inline-block'>
      {IconComponent ? <IconComponent /> : 'link'}
    </span>
  );
};

export default LinkIcon;
