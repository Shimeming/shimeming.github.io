import SectionLabel from '@/components/ui/section-label';
import { SkillGroup } from '@/types/about';

const Skills = ({ groups }: { groups: SkillGroup[] }) => (
  <section>
    <SectionLabel en='Skills' zh='技能' />
    <div className='flex flex-col gap-3'>
      {groups.map((group) => (
        <div
          key={group.category}
          className='flex flex-col gap-1.5 sm:flex-row sm:items-baseline sm:gap-3'
        >
          <span className='shrink-0 font-mono text-[11px] font-bold uppercase tracking-[0.08em] text-primary sm:w-[110px]'>
            {group.category}
          </span>
          <div className='flex flex-wrap gap-1.5'>
            {group.items.map((item) => (
              <span
                key={item}
                className='rounded-[5px] border border-primary/25 bg-surface px-2 py-1 font-mono text-[11px] text-body'
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  </section>
);

export default Skills;
