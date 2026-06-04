type Props = Readonly<{
  label: string;
  name?: string;
  placeholder?: string;
  value?: string;
  rows?: number;
  cols?: number;
  onChange?: React.ChangeEventHandler<HTMLTextAreaElement>;
}>;

export function TextArea({ label, name, placeholder, value, rows, cols, onChange }: Props) {
  return (
    <label className="block space-y-1">
      <span className="text-sm font-medium">{label}</span>
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
    </label>
  );
}
