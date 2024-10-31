'use client'
import Link from 'next/link'
import React, { useState } from 'react'
import Image from "next/image"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import {
    Form
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import CustomInput from '@/components/CustomInput'
import { authFormSchema, authResetSchema } from '@/lib/utils'
import { useTransition } from 'react'
import { Loader2 } from 'lucide-react'
import { FormError } from '../FormError'
import { FormSuccess } from '../FormSuccess'
import { resetPassword } from '@/actions/reset-password'

const ResetForm = () => {
    const [error, setError] = useState<string | undefined>("")
    const [success, setSuccess] = useState<string | undefined>("")
    const [isPending, startTransition] = useTransition()
    const [user, setUser] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    // const router = useRouter()
    const formSchema = authResetSchema()

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
        },
    })

    // 2. Define a submit handler.
    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        setError("")
        setSuccess("")
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        try {
            setIsLoading(true)
            startTransition(() => {
                resetPassword(values)
                    .then((data) => {
                        if (data.ok) {
                            setSuccess(data?.success)
                        } else {
                            setError(data?.error);
                        }
                    })
            })
        } catch (error) {
            console.log(error);
        }
        finally {
            setIsLoading(false)
        }
    }
    return (
        <section className="auth-form">
            <header className="flex flex-col gap-5 md:gap-8">
                <Link href='/' className=" flex cursor-pointer item-center gap-1 px-4">
                    <Image
                        src={'/icons/logo.svg'}
                        width={34}
                        height={34}
                        alt='Horizon logo' />
                    <h1 className='text-24 font-ibm-plex-serif font-bold text-black-1'>Horizon</h1>
                </Link>
                <div className="flex flex-col gap-1 md:gap-3">
                    <h1 className="text-24 lg:text-36 font-semibold text-gray-900">

                        Reset your password

                        <p className="text-16 font-normal text-gray-600">
                            Please enter your email
                        </p>
                    </h1>
                </div>
            </header>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
                    <CustomInput
                        control={form.control}
                        name='email'
                        label={'Email'}
                        placeholder={'Enter your email'}
                        type='text'
                    />
                    <FormError message={error} />
                    <FormSuccess message={success} />
                    <div className="flex flex-col gap-4 py-4">
                        <Button type="submit" className='form-btn' disabled={isPending}>
                            {isPending ? (
                                <>
                                    <Loader2 size={20}
                                        className='animate-spin' /> &nbsp;
                                    Loading...
                                </>
                            ) :
                                'Send Confirmation Email'}
                        </Button>
                    </div>

                </form>
            </Form>
        </section >
    )
}

export default ResetForm
