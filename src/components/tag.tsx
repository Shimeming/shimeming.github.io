const Tag = ({
  className,
  children,
}: {
  className?: string;
  children: string;
}) => {
  return (
    <span className={`rounded-sm py-0.5 px-2.5 border font-medium text-xs border-foreground ${className}`}>
      {children}
    </span>
  );
};

export default Tag;
