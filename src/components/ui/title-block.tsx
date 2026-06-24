import site from '@/data/site';
import Seal from './seal';

const rows: { label: string; value: string }[] = [
  { label: 'Role',  value: site.profile.role },
  { label: 'Based', value: site.profile.based },
  { label: 'Focus', value: site.profile.focus },
  { label: 'GPA',   value: site.profile.gpa },
  { label: 'Lang',  value: site.profile.lang },
];

/**
 * Engineering title block — name, seal, and a mono data grid.
 * No portrait; designed for the About page right column.
 */
const TitleBlock = () => {
  return (
    <div className='overflow-hidden rounded-lg border border-primary bg-surface font-mono'>
      {/* Top row: seal + name */}
      <div className='flex items-center gap-2.5 border-b border-primary bg-primary/5 px-3 py-2.5'>
        <Seal as='span' size={30} />
        <div>
          <p className='font-display text-[15px] font-semibold leading-tight text-foreground'>
            {site.name}
          </p>
          <small className='block font-mono text-[9px] tracking-[0.04em] text-muted mt-0.5'>
            銘 · to inscribe
          </small>
        </div>
      </div>

      {/* Data grid */}
      <dl>
        {rows.map(({ label, value }) => (
          <div key={label} className='flex border-b border-surface last:border-b-0'>
            <dt className='w-[70px] shrink-0 border-r border-surface bg-surfaceFlat px-2.5 py-[7px] text-[8px] font-bold uppercase tracking-[0.08em] text-primary'>
              {label}
            </dt>
            <dd className='m-0 px-2.5 py-[7px] text-[11px] font-semibold text-foreground'>
              {value}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
};

export default TitleBlock;
