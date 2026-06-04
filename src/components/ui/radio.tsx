type Props = Readonly<{
  label: string;
  name: string;
  value: string;
  checked: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
}>;

export function Radio({ label, name, checked, value, onChange }: Props) {
  return (
    <label className="group flex cursor-pointer items-center gap-3">
      <input
        type="radio"
        className="sr-only"
        name={name}
        value={value}
        checked={checked === value}
        onChange={onChange}
      />
      <div className="border-red-muted flex h-4 w-4 items-center justify-center rounded-full border-2">
        <div className="bg-red-muted h-2 w-2 rounded-full opacity-0 transition-opacity group-has-checked:opacity-100" />
      </div>
      <span className="font-medium">{label}</span>
    </label>
  );
}
