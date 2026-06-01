"use client"
import DropDowns from './Residential apartments/dropDowns';
import { Filters } from '@/interfaces/filters';  

interface SearchBarProps {
  filters: Filters;
  setFilters: (filters: Filters) => void;
  searchText: string;
  setSearchText: (text: string) => void;
}

export default function SearchBar({ filters, setFilters, searchText, setSearchText }: SearchBarProps) {
  return (
    <div className='w-full py-6'>
      <DropDowns
        filters={filters}
        setFilters={setFilters}
        searchText={searchText}
        setSearchText={setSearchText}
      />
    </div>
  );
}