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
import CustomInput from './CustomInput'
import { authFormSchema } from '@/lib/utils'
import { Icon, Loader2, EyeOff, Eye } from 'lucide-react'
// import { eyeOff } from 'react-icons-kit/feather/eyeOff';
// import { eye } from 'react-icons-kit/feather/eye'
import { useRouter } from 'next/navigation'
import { signIn } from 'next-auth/react'
import { FormError } from './FormError'
import { FormSuccess } from './FormSuccess'
import { login } from '@/actions/login'
import { useTransition } from 'react'
import { register } from '@/actions/register'
import Social from './AuthSocial'
import { useSearchParams } from 'next/navigation'

const AuthForm = ({ type }: { type: string }) => {
    const searchParams = useSearchParams();
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const urlError = searchParams.get('error') === 'OAuthAccountNotLinked'
        ? "Email already used with different provider!"
        : "";
    const [error, setError] = useState<string | undefined>("")
    const [success, setSuccess] = useState<string | undefined>("")
    const [isPending, startTransition] = useTransition()
    const [user, setUser] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter()
    const formSchema = authFormSchema(type)

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
            firstName: "",
            lastName: "",
            address: "",
            state: "",
            city: "",
            pincode: "",
            dateOfBirth: ""
        },
    })

    // 2. Define a submit handler.
    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        console.log(type);

        setError("")
        setSuccess("")
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        try {
            setIsLoading(true)
            if (type === 'sign-up') {
                startTransition(() => {
                    register(values)
                        .then((data) => {
                            setError(data.error);
                            setSuccess(data.success);
                            if (data.ok) {
                                // router.push('/sign-in')
                            }
                        })
                })



            }
            if (type === 'sign-in') {
                startTransition(() => {
                    login(values)
                        .then((data) => {
                            if (!data?.ok) {
                                setError(data?.error);
                            }
                        })
                })
            }
            if (type === 'reset') {
                console.log(values);

            }
        } catch (error) {
            console.log(error);

        }
        finally {
            setIsLoading(false)
        }
    }
    function togglePasswordVisibility() {
        setIsPasswordVisible((prevState) => !prevState);
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
                        {user ?
                            'Link Account'
                            : type === 'sign-in'
                                ? 'Sign In'
                                : type === 'sign-up'
                                    ? 'Sign Up' :
                                    'Reset your password'
                        }
                        <p className="text-16 font-normal text-gray-600">
                            {
                                user ? '' :
                                    type === 'sign-in' ? 'Please enter your credentials' :
                                        'Please fill up your deatails'
                            }
                        </p>
                    </h1>
                </div>
            </header>
            {user ? (
                <div className="flex flex-col gap-4">
                    {/*Plaidlink */}
                </div>
            ) :
                (
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
                            {type === 'sign-up' && (
                                <>
                                    <div className='flex gap-4'>
                                        <CustomInput
                                            control={form.control}
                                            name='firstName'
                                            label={'First Name'}
                                            placeholder={'Enter your first name'}
                                            type='text'
                                        />
                                        <CustomInput
                                            control={form.control}
                                            name='lastName'
                                            label={'Last Name'}
                                            placeholder={'Enter your Last name'}
                                            type='text'
                                        />
                                    </div>
                                    <CustomInput
                                        control={form.control}
                                        name='address'
                                        label={'Address'}
                                        placeholder={'Enter your address'}
                                        type='text'
                                    />
                                    <div className='flex gap-4'>
                                        <CustomInput
                                            control={form.control}
                                            name='city'
                                            label={'City'}
                                            placeholder={'Enter your city'}
                                            type='text'
                                        />
                                        <CustomInput
                                            control={form.control}
                                            name='state'
                                            label={'State'}
                                            placeholder={'Enter your state'}
                                            type='text'
                                        />
                                    </div>
                                    <div className='flex gap-4'>
                                        <CustomInput
                                            control={form.control}
                                            name='pincode'
                                            label={'Pin Code'}
                                            placeholder={'Enter your first name'}
                                            type='text'
                                        />
                                        <CustomInput
                                            control={form.control}
                                            name='dateOfBirth'
                                            label={'Date of Birth'}
                                            placeholder={'dd/mm/yyyy'}
                                            type='text'
                                        />
                                    </div>
                                </>
                            )}
                            <div>
                                <CustomInput
                                    control={form.control}
                                    name='email'
                                    label={'Email'}
                                    placeholder={'Enter your email'}
                                    type='text'
                                />

                                <div className='flex flex-col w-full'>
                                    <CustomInput
                                        control={form.control}
                                        name='password'
                                        label='Password'
                                        placeholder='Enter your password'
                                        type={isPasswordVisible ? 'text' : 'password'}
                                    />
                                    <span className=" btn flex justify-end items-center" onClick={togglePasswordVisibility}>
                                        <Eye className="absolute -mt-10 mr-3" size={20} />
                                    </span>
                                    {type === 'sign-in' && (
                                        <div className='-mt-1.5 items-start'>
                                            <Button size='sm' variant={'link'} asChild className='px-0 font-normal'>
                                                <Link href={'/auth/reset'}>
                                                    Forgot Password?
                                                </Link>
                                            </Button>
                                        </div>
                                    )}
                                </div>
                            </div>

                            <FormError message={error || urlError} />
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
                                        type === 'sign-in' ? 'Sign In' : 'Sign Up'}
                                </Button>

                            </div>

                        </form>
                    </Form>

                )
            }
            <footer className="flex justify-center gap-1">
                <div className='flex flex-col w-full text-center'>
                    {type !== 'reset' ? (
                        <div>
                            <Social />
                            <div className='flex flex-col'>
                                <p className='text-14'>
                                    {type === 'sign-in' ? "Don't have an account? " : "Already have an account?"}
                                </p>
                                <Link
                                    href={type === 'sign-in' ? '/auth/sign-up' : '/auth/sign-in'} className='form-link'>
                                    {type === 'sign-in' ? 'Sign Up' : 'Sign In'}

                                </Link>
                            </div>
                        </div>
                    ) : ''}

                </div>
            </footer>
        </section >
    )
}

export default AuthForm
