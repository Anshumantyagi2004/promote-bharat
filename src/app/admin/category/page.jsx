import AdminSidebar from '@/components/Admin/AdminSidebar'
import React from 'react'
import Category from './Category'

export default function page() {
    return (<div className='flex'>
        <AdminSidebar />
        <Category />
    </div>)
}
