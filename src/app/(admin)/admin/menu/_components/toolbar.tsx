import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select } from '@/components/ui/select';
import { TEXT } from '@/constants/text';
import { Plus, Search } from 'lucide-react';

export function Toolbar() {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-end">
      <div className="grid flex-1 gap-3 sm:grid-cols-[minmax(0,1fr)_10rem]">
        <Input
          label=""
          placeholder={TEXT.searchMenuItems}
          suffix={{ value: <Search className="text-neutral-400" size={18} /> }}
        />
        <Select
          name="sortBy"
          value="name"
          options={[
            { value: 'name', label: TEXT.name },
            { value: 'category', label: TEXT.category },
            { value: 'price', label: TEXT.price },
          ]}
        />
      </div>
      <Button variant="primary" className="flex items-center justify-center gap-2 whitespace-nowrap">
        <Plus size={18} aria-hidden="true" />
        {TEXT.newItem}
      </Button>
    </div>
  );
}
