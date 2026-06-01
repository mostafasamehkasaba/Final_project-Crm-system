"use client"
import { fields } from '@/data/fields';
import { Input } from '../ui/input';
import FieldDropdown from '../FieldDropdown';
import { Filters } from '@/interfaces/filters';

interface DropDownsProps {
  filters: Filters;
  setFilters: (filters: Filters) => void;
  searchText: string;
  setSearchText: (text: string) => void;
}

export default function DropDowns({ filters, setFilters, searchText, setSearchText }: DropDownsProps) {
  return (
    <div className='flex items-stretch bg-neutral-900 rounded-xl overflow-hidden min-h-[62px] w-[90%] m-auto'>
      <div className='pr-4 flex'>
        {fields.map((field) => {
          const fieldId = field.id as keyof Filters;
          return (
            <FieldDropdown
              key={field.id}
              field={field}
              value={filters[fieldId]}
              onSelect={(val) => setFilters({ ...filters, [fieldId]: val })}
            />
          );
        })}
      </div>
      <Input
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        className="border-t-0 border-x-0 border-b-2 border-zinc-200 rounded-none bg-transparent px-0 pb-3 pt-1 focus-visible:ring-0 focus-visible:border-amber-500 transition-colors duration-300 placeholder:text-white text-base text-white text-right shadow-none font-medium m-auto w-70"
        placeholder='ابحث باسم المنطقة'
      />
    </div>
  );
}