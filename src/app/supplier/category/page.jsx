import SupplierSidebar from '@/components/Supplier/SupplierSidebar'
import React from 'react'
import Category from './Category'

export default function page() {
    return (<div className='flex'>
        <SupplierSidebar />
        <Category />
    </div>)
}
