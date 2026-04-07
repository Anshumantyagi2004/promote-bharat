import AdminSidebar from '@/components/Admin/AdminSidebar'
import React from 'react'
import Help from './Help'

export default function page() {
    return (<div className='flex'>
        <AdminSidebar />
        <Help />
    </div>)
}
