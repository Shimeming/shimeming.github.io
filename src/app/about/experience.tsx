import SectionLabel from '@/components/ui/section-label';
import { RoleData } from '@/types/about';

const RoleNode = ({ role }: { role: RoleData }) => (
  <div className='relative mb-6 pl-6'>
    {/* Timeline node dot */}
    <span
      className='absolute -left-[17px] top-[5px] h-3 w-3 rounded-full bg-primary ring-4 ring-background'
      aria-hidden='true'
    />

    <p className='font-mono text-[11px] font-bold text-primary'>{role.period}</p>

    <h3 className='mt-0.5 font-display text-[17px] font-semibold leading-snug tracking-[-0.01em] text-foreground'>
      {role.role}
    </h3>

    <p className='font-sans text-[13px] text-muted'>
      {role.org}
      {role.location ? ` · ${role.location}` : ''}
    </p>

    {role.bullets && role.bullets.length > 0 && (
      <ul className='mt-2 flex flex-col gap-1'>
        {role.bullets.map((bullet, i) => (
          <li
            key={i}
            className='relative pl-4 font-sans text-[13px] leading-[1.5] text-body before:absolute before:left-0 before:text-primary before:content-["▹"]'
          >
            {bullet}
          </li>
        ))}
      </ul>
    )}
  </div>
);

const RoleTimeline = ({
  en,
  zh,
  roles,
}: {
  en: string;
  zh: string;
  roles: RoleData[];
}) => (
  <section>
    <SectionLabel en={en} zh={zh} />
    <div className='relative border-l-2 border-primary/20 pl-0'>
      {roles.map((role, i) => (
        <RoleNode key={i} role={role} />
      ))}
    </div>
  </section>
);

export default RoleTimeline;
