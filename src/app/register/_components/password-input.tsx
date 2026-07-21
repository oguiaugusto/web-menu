'use client';

import { Input } from '@/components/ui/input';
import { TEXT } from '@/constants/text';
import { useEffect, useState } from 'react';
import { checkPasswordStrength } from '../_helpers/checkPasswordStrength';
import { cn } from '@/utils/cn';

type Props = Readonly<{
  value: string;
  error?: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  setIsValid: React.Dispatch<React.SetStateAction<boolean>>;
}>;

export function PasswordInput({ value, error, onChange, setIsValid }: Props) {
  const [score, setScore] = useState(0);

  const getStrengthColor = (score: number) => {
    if (score < 3) return 'bg-red-500';
    if (score < 5) return 'bg-amber-500';
    return 'bg-green-600';
  };

  useEffect(() => {
    const [isValid, score] = checkPasswordStrength(value);

    setScore(score);
    setIsValid(isValid);
  }, [setIsValid, value]);

  return (
    <div className="flex flex-col items-stretch">
      <Input
        name="password"
        label={TEXT.password}
        placeholder="••••••••"
        type="password"
        value={value}
        error={error}
        onChange={onChange}
        tooltip={
          <div>
            <p className="font-bold">{TEXT.passwordMust}</p>
            <ul className="list-disc pl-4">
              <li>{TEXT.passwordCharacters}</li>
              <li>{TEXT.passwordIncludeLetter}</li>
              <li>{TEXT.passwordIncludeNumber}</li>
            </ul>
            <p className="mt-1 font-bold">{TEXT.passwordStronger}</p>
            <ul className="list-disc pl-4">
              <li>{TEXT.passwordMixCases}</li>
              <li>{TEXT.passwordSpecialCharacters}</li>
            </ul>
          </div>
        }
        required
      />
      <div className="mx-1 mt-3 grid grid-cols-5 gap-2">
        {Array.from({ length: 5 }).map((_, i) => (
          <div
            key={`password-strength-step-${i}`}
            className={cn('h-[5px]', i < score ? getStrengthColor(score) : 'bg-neutral-300/80')}
          ></div>
        ))}
      </div>
    </div>
  );
}
