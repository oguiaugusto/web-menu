import { FieldErrors } from '@/types/misc';
import { Dispatch, SetStateAction } from 'react';

export function getHandleChange<T>(
  setFields: Dispatch<SetStateAction<T>>,
  setFieldErrors: Dispatch<SetStateAction<FieldErrors>>,
) {
  return (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFields((p) => ({ ...p, [e.target.name]: e.target.value }));
    setFieldErrors((p) => {
      const next = { ...p };
      delete next[e.target.name];
      return next;
    });
  };
}
