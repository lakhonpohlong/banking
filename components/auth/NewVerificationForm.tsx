'use client'
import { useSearchParams } from 'next/navigation'
import React, { useCallback, useEffect, useState } from 'react'
import { CardWrapper } from './ui/card-wrapper';
import { BeatLoader } from 'react-spinners'
import Link from 'next/link';
import { newVerification } from '@/actions/new-verification';
import { FormSuccess } from '../FormSuccess';
import { FormError } from '../FormError';

const NewVerificationForm = () => {
    const [error, setError] = useState<string | undefined>()
    const [success, setSuccess] = useState<string | undefined>()
    const searchParam = useSearchParams();
    const token = searchParam.get('token')
    const onSubmit = useCallback(() => {
        if (success || error) return;
        if (!token) {
            setError('Missing token!')
            return;
        }
        newVerification(token).then((data) => {
            if (data.ok) {
                setSuccess(data.success)
            } else {
                setError(data.error)
            }
        }).catch(() => {
            setError('Someting went wrong!')
        })

    }, [token, success, error])
    useEffect(() => {
        onSubmit()
    }, [])
    return (
        <CardWrapper
            headerLabel='Confirming your token...'
            backButtonLabel='Back to Login'
        >
            <div className='flex flex-col items-center justify-center'>
                {!success && !error && (
                    <BeatLoader />
                )}

                <FormSuccess message={success} />
                {!success && (
                    <FormError message={error} />
                )}
                <Link className='pt-4' href={'/auth/sign-in'}>Back to Login</Link>

            </div>

        </CardWrapper>
    )
}

export default NewVerificationForm
