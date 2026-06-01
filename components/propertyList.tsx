import React from 'react'
import { Property } from '@/types/properites'
import PropertyCard from "./PropertyCard";

export default function PropertyList({properties} :{properties : Property[] }) {
    if(properties.length === 0){
        return (
            <div className='col-span-3 flex flex-col items-center justify-center  mt-20 gap-3'>
                <p className="text-neutral-400 text-lg">لا توجد نتائج</p>
            </div>
        )
    }
  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 px-6 mt-10 mb-10 items-center'>
        {properties.map((p) =>(
            <PropertyCard  key={p.id} property={p}/>
        ))}
    </div>
  )
}
