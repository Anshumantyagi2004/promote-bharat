import AdminSidebar from '@/components/Admin/AdminSidebar'
import React from 'react'
import Profile from './Profile'

export default function page() {
    return (<div className='flex'>
        <AdminSidebar />
        <Profile />
    </div>)
}
