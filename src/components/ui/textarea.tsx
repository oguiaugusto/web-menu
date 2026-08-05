import { ERROR_MESSAGES } from '@/constants/text';
import RequiredStar from '../required-star';

type Props = Readonly<{
  label: string;
  name?: string;
  placeholder?: string;
  value?: string;
  rows?: number;
  cols?: number;
  onChange?: React.ChangeEventHandler<HTMLTextAreaElement>;
  error?: string;
  errorLabel?: string;
  required?: boolean;
  showRequired?: boolean;
}>;

export function TextArea({
  label,
  name,
  placeholder,
  value,
  rows,
  cols,
  onChange,
  error,
  errorLabel,
  required,
  showRequired,
}: Props) {
  return (
    <label className="block space-y-1">
      <span className="text-sm font-medium">
        {label}
        <RequiredStar required={required && showRequired} />
      </span>
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
      {error ? <p className="mt-1 text-sm text-red-600">{`${errorLabel ?? label} ${ERROR_MESSAGES[error]}`}</p> : null}
    </label>
  );
}
