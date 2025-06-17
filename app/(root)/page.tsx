import React from 'react'
import HeaderBox from '@/components/HeaderBox'
import TotalBalanceBox from '@/components/TotalBalanceBox';
import RightSidebar from '@/components/RightSidebar';
import Link from 'next/link';
import Image from 'next/image';
import { getLoggedInUser } from '@/lib/actions/user.actions';
import { redirect } from 'next/navigation';

const Home = async () => {
  const loggedIn = await getLoggedInUser();
  if(!loggedIn) redirect('/sign-in');
  
  return (
    <div>
      <section className="home">
        <div className="home-content">
          <header className="home-header">
            < HeaderBox
              type="greeting"
              title="Welcome"
              user={loggedIn?.name || 'Guest'}
              subtext="Access and Manage your account and transaction efficiently."
            />
            < TotalBalanceBox

              accounts={[]}
              totalBanks={1}
              totalCurrentBalance={12349.35}
            />
          </header>

          RECENT TRANSACTION
        </div>
        <RightSidebar
          user={loggedIn}
          transactions={[]}
          banks={[{currentBalance: 1924},{currentBalance: 2005}]}
        />
      </section>

    </div>
  )
}

export default Home