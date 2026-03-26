import AdminSidebar from '@/components/Admin/AdminSidebar'
import React from 'react'
import Settings from './Settings'

export default function page() {
    return (<div className='flex'>
        <AdminSidebar />
        <Settings />
    </div>)
}
