type Props = Readonly<{
  label: string;
  placeholder?: string;
  value?: string;
  rows?: number;
  cols?: number;
  onChange?: React.ChangeEventHandler<HTMLTextAreaElement>;
}>;

export function TextArea({ label, placeholder, value, rows, cols, onChange }: Props) {
  return (
    <div className="space-y-1">
      <label className="text-sm font-medium">{label}</label>
      <textarea
        rows={rows}
        cols={cols}
        className="focus:border-red-muted shadow-red-muted/40 w-full rounded-xl border border-neutral-200 bg-white px-4 py-3 transition outline-none focus:shadow-xs"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </div>
  );
}
