export const Tag = ({
  className = '',
  children,
}: {
  className?: string;
  children: string;
}) => {
  return (
    <span className={`rounded-xs border border-foreground px-2.5 py-0.5 text-xs font-medium ${className}`}>
      {children}
    </span>
  );
};

export default Tag;
