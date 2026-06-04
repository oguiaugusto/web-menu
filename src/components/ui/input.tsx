import { cn } from '@/utils/cn';

type Props = Readonly<{
  label: string;
  type?: HTMLInputElement['type'];
  name?: string;
  placeholder?: string;
  value?: string;
  prefix?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
}>;

export function Input({ label, name, placeholder, value, prefix, onChange }: Props) {
  return (
    <label className="block space-y-1">
      <span className="text-sm font-medium">{label}</span>
      <div className="relative">
        {prefix ? <span className="absolute top-1/2 left-4 -translate-y-1/2">{prefix}</span> : null}
        <input
          className={cn(
            'focus:border-red-muted shadow-red-muted/40 w-full rounded-lg border border-neutral-200 bg-white px-4 py-3 transition outline-none focus:shadow-xs',
            prefix ? 'ps-7' : '',
          )}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
        />
      </div>
    </label>
  );
}
