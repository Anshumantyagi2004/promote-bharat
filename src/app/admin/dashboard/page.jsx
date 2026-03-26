import AdminSidebar from '@/components/Admin/AdminSidebar'
import React from 'react'
import Dashboard from './Dashboard'

export default function page() {
    return (<div className='flex'>
        <AdminSidebar />
        <Dashboard />
    </div>)
}
