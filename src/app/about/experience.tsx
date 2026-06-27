import OrgLogo from '@/components/ui/org-logo';
import SectionLabel from '@/components/ui/section-label';
import { RoleData } from '@/types/about';
import { Timeline, TimelineNode } from './timeline';

const RoleNode = ({ role }: { role: RoleData }) => (
  <TimelineNode
    marker={
      role.logo ? (
        <OrgLogo src={role.logo} alt={role.org} bg={role.logoBg} />
      ) : undefined
    }
  >
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
            className='relative pl-4 font-sans text-[13px] leading-normal text-body before:absolute before:left-0 before:text-primary before:content-["▹"]'
          >
            {bullet}
          </li>
        ))}
      </ul>
    )}
  </TimelineNode>
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
    <Timeline>
      {roles.map((role) => (
        <RoleNode key={`${role.period}-${role.role}`} role={role} />
      ))}
    </Timeline>
  </section>
);

export default RoleTimeline;
