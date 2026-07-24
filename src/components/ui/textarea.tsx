import { ERROR_MESSAGES } from '@/constants/text';

type Props = Readonly<{
  label: string;
  addLabel?: string;
  name?: string;
  placeholder?: string;
  value?: string;
  rows?: number;
  cols?: number;
  onChange?: React.ChangeEventHandler<HTMLTextAreaElement>;
  error?: string;
}>;

export function TextArea({ label, addLabel, name, placeholder, value, rows, cols, onChange, error }: Props) {
  const fullLabel = addLabel ? `${label} (${addLabel})` : label;

  return (
    <label className="block space-y-1">
      <span className="text-sm font-medium">{fullLabel}</span>
      <textarea
        id={name}
        name={name}
        rows={rows}
        cols={cols}
        className="focus:border-red-muted shadow-red-muted/40 w-full rounded-lg border border-neutral-200 bg-white px-4 py-3 transition outline-none focus:shadow-xs"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
      {error ? <p className="mt-1 text-sm text-red-600">{`${label} ${ERROR_MESSAGES[error]}`}</p> : null}
    </label>
  );
}
