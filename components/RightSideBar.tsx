import Image from 'next/image.js'
import Link from 'next/link.js'
import React from 'react'
import BankCard from './BankCard'

const RightSideBar = ({ user, transactions, banks }: RightSidebarProps) => {
    return (
        <aside className="right-sidebar">
            <section className="flex flex-col pb-8">
                <div className="profile-banner">
                    <div className="profile">
                        <div className="profile-img">
                            <span className='text-5xl font-bold text-blue-500'>{user.name[0]}</span>
                        </div>
                        <div className="profile-details">
                            <h1 className='profile-name'>
                                {user.name}
                            </h1>
                            <p className="profile-email">{user.email}</p>
                        </div>
                    </div>
                </div>
            </section>
            <section className="banks">
                <div className="flex w-full justify-between">
                    <h2 className="header-2 bg-red-20">My Banks</h2>
                    <Link href="/" className="flex gap-2">
                        <Image
                            src={"icons/plus.svg"}
                            width={20}
                            height={20}
                            alt='add bank'
                        />
                        <h2 className="text-14 font-semi-bold text-gray-600">Add Bank</h2>
                    </Link>
                </div>
                {banks?.length > 0 && (
                    <div className="relative flex flex-col flex-1 justify-center item-center gap-5">
                        <div className="relative z-10">
                            <BankCard
                                key={banks[0].$id}
                                account={banks[0]}
                                userName={`${user.firstName} ${user.lastName}`}
                                showBalance={false}
                            />
                        </div>
                        {banks[1] && (
                            <div className="absolute right-0 top-8 z-0 w-[90%]">
                                <BankCard
                                    key={banks[1].$id}
                                    account={banks[1]}
                                    userName={`${user.firstName} ${user.lastName}`}
                                    showBalance={false}
                                />
                            </div>
                        )}
                    </div>
                )}
            </section>
        </aside>
    )
}

export default RightSideBar
