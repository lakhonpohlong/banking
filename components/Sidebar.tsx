'use client'
import { sidebarLinks } from '@/constants/index'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

const Sidebar = ({ user }: SiderbarProps) => {
    const pathName = usePathname()
    return (
        <section className="sidebar">
            <nav className="flex flex-col gap-4">
                <Link href='/' className="flex mb-12 cursor-pointer item-center gap-2">
                    <Image
                        src={'/icons/logo.svg'}
                        width={34}
                        height={34}
                        alt='Horizon logo'
                        className='size-[24px] max-xl:size-14' />
                    <h1 className='sidebar-logo'>Horizon</h1>
                </Link>
                {sidebarLinks.map((item) => {
                    const isAtive = pathName === item.route || pathName
                        .startsWith(`${item.route}/`)
                    return (
                        <Link
                            href={item.route}
                            key={item.label}
                            className={cn('sidebar-link', {
                                'bg-bank-gradient': isAtive
                            })}
                        >
                            <div className="relative size-6">
                                <Image src={item.imgURL}
                                    alt={item.label}
                                    fill
                                    className={cn({ 'brightness-[3] invert-0': isAtive })}
                                />
                            </div>
                            <p className={cn('sidebar-label', {
                                '!text-white': isAtive
                            })}>
                                {item.label}
                            </p>
                        </Link>
                    )
                })}
            </nav>
        </section>
    )
}

export default Sidebar
