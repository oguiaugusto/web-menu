import { FieldErrors } from '@/types/misc';
import { Dispatch, SetStateAction } from 'react';

export function getHandleChange<T>(
  setFields: Dispatch<SetStateAction<T>>,
  setFieldErrors: Dispatch<SetStateAction<FieldErrors>>,
) {
  return (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const isCheckbox = e.target.type === 'checkbox';

    setFields((p) => ({
      ...p,
      [e.target.name]: isCheckbox ? (e as React.ChangeEvent<HTMLInputElement>).target.checked : e.target.value,
    }));
    setFieldErrors((p) => {
      const next = { ...p };
      delete next[e.target.name];
      return next;
    });
  };
}
