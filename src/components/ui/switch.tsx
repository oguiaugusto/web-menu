import React from 'react';

type Props = Readonly<{
  name?: string;
  checked?: boolean;
  rightLabel?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
}>;

export function Switch({ name, checked, rightLabel, onChange }: Props) {
  return (
    <label className="flex w-fit cursor-pointer items-center gap-3">
      <input type="checkbox" className="peer sr-only" name={name} defaultChecked={checked} onChange={onChange} />
      <span
        aria-hidden="true"
        className="peer-checked:bg-red-muted peer-focus-visible:ring-red-muted relative h-6 w-11 rounded-full bg-neutral-300 transition-colors peer-focus-visible:ring-2 peer-focus-visible:ring-offset-2 after:absolute after:top-1 after:left-1 after:size-4 after:rounded-full after:bg-white after:transition-transform peer-checked:after:translate-x-5"
      />
      {rightLabel ? <span className="text-sm text-neutral-700">{rightLabel}</span> : null}
    </label>
  );
}
