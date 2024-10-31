import NewVerificationForm from '@/components/auth/NewVerificationForm'
import { CardWrapper } from '@/components/auth/ui/card-wrapper'
import React from 'react'

interface NewVerificationProps {
    token: string
}
const NewVerificationPage = () => {
    return (

        <div className='flex flex-col h-full items-center justify-center'>
            <NewVerificationForm />
        </div>

    )
}

export default NewVerificationPage
