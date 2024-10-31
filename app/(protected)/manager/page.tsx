'use client'
import RoleGate from '@/components/auth/role-gate';
import { FormSuccess } from '@/components/FormSuccess';
import { useCurrentRole } from '@/hooks/use-current-role'
import { UserRole } from '@prisma/client';
import React from 'react'

const ManagerPage = () => {
    const userRole = useCurrentRole()
    return (
        <div className='flex flex-col justify-center items-center'>
            <h2>Manager Page</h2>
            Cutrrent Role: {userRole}
            <FormSuccess message='You are allowed to view this content!' />
        </div>
    )
}

export default ManagerPage
