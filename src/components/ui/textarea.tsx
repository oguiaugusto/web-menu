import type { ErrorMessages } from '@/i18n';
import type { ErrorCode } from '@/types/enums';
import { formatFieldError } from '@/utils/format-field-error';
import RequiredStar from '../required-star';

type Props = Readonly<{
  label: string;
  name?: string;
  placeholder?: string;
  value?: string;
  rows?: number;
  cols?: number;
  onChange?: React.ChangeEventHandler<HTMLTextAreaElement>;
  error?: ErrorCode;
  errorMessages?: ErrorMessages;
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
  errorMessages,
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
      {error && errorMessages ? (
        <p className="mt-1 text-sm text-red-600">{formatFieldError(errorLabel ?? label, error, errorMessages)}</p>
      ) : null}
    </label>
  );
}
