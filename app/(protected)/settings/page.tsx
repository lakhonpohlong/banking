'use client'
import { logout } from '@/actions/logout';
import { auth, signOut } from '@/auth'
import { Button } from '@/components/ui/button';
import { useCurrentUser } from '@/hooks/use-current-user';
import { SessionProvider } from 'next-auth/react';
import React from 'react'

const settings = () => {
    const user = useCurrentUser()

    const onClick = () => {
        logout();
    }
    return (
        <div>
            {JSON.stringify(user)}

            <Button onClick={onClick} className='form-btn' variant={'outline'} type='submit'>SignOut</Button>
        </div>
    )
}

export default settings
