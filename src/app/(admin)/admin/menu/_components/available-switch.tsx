'use client';

import { updateMenuItemAvailability } from '@/actions/menu-item';
import { Switch } from '@/components/ui/switch';
import { useState } from 'react';

type Props = Readonly<{
  itemId: string;
  available: boolean;
}>;

export function AvailableSwitch({ itemId, available }: Props) {
  const [checked, setChecked] = useState(available);

  const handleChange = async (checked: boolean) => {
    setChecked(checked);

    try {
      await updateMenuItemAvailability(itemId, checked);
    } catch {
      setChecked(!checked);
    }
  };

  return <Switch checked={checked} onChange={(e) => handleChange(e.target.checked)} />;
}
