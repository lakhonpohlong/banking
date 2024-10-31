'use client'
import Social from '@/components/AuthSocial'
import HeaderBox from '@/components/HeaderBox'
import RightSideBar from '@/components/RightSideBar'
import TotalBalanceBox from '@/components/TotalBalanceBox'
import { useCurrentUser } from '@/hooks/use-current-user'
import React from 'react'

const Home = () => {
    const loggedIn = useCurrentUser()
    return (
        <section className='home'>
            <div className="home-content">
                <header className="home-header">
                    <HeaderBox
                        type="greeting"
                        title="welcome"
                        user={loggedIn?.name?.split(" ")[0] || 'Guest'}
                        subtext="Access and manage your account and transactions efficiency."
                    />
                    <TotalBalanceBox
                        accounts={[]}
                        totalBanks={1}
                        totalCurrentBalance={34500.45}
                    />
                </header>
            </div>
            <RightSideBar user={loggedIn}
                transactions={[]}
                banks={[
                    {
                        name: 'State Bank of India',
                        currentBalance: 34025
                    },
                    {
                        name: 'Axis Bank',
                    }
                ]}
            />
        </section>
    )
}

export default Home
