'use client'
import React from 'react'
import { Sheet, SheetContent, SheetTrigger, SheetClose } from '@/components/ui/sheet'
import Image from 'next/image'
import Link from 'next/link'
import { sidebarLinks } from '@/constants'
import { cn } from '@/lib/utils'
import { usePathname } from 'next/navigation'
import Footer from './Footer'

const MobileNav = ({ user }: MobileNavProps) => {
    const pathName = usePathname();
    return (
        <div><Sheet>
            <SheetTrigger>
                <Image src='/icons/hamburger.svg'
                    width={30}
                    height={30}
                    className='cursor-pointer'

                    alt='menu' /></SheetTrigger>
            <SheetContent side='left' className='border-none bg-white'>
                <Link href="/"
                    className='flex cursor-pointer items -center gap-1 px-4'>
                    <Image
                        src='/icons/logo.svg'
                        width={34}
                        height={34}
                        alt='Logo'
                    />
                    <h1 className='text-26 font-ibm-flex-serif font-bold text-black-1'>AnyPay</h1>
                </Link>
                <div className="mobilenav-sheet">

                    <SheetClose asChild>
                        <nav className="flex full flex-col gap-6 pt-16 text-white">

                            {sidebarLinks.map((link) => {
                                const isActive = pathName === link.route || pathName.startsWith(`${link.route}/`);



                                return (
                                    <SheetClose asChild key={link.route}>

                                        <Link href={link.route}
                                            key={link.label}
                                            className={cn("mobilenav-sheet_close w-full", { "bg-bank-gradient": isActive })}
                                        >
                                                <Image
                                                    src={link.imgURL}
                                                    alt={link.label} 
                                                    width={20}
                                                    height={20}
                                                    className={cn({ "brightness-[3] invert-0": isActive })}

                                                />

                                            
                                            <div className={cn('text-16 font-semibold text-black-2', { 'text-white': isActive })}>
                                                {link.label}
                                            </div>


                                        </Link>
                                    </SheetClose>


                                )
                            })}
                            User
                        </nav>


                    </SheetClose>
                    <Footer user={user} type={'mobile'}/>
                </div>

            </SheetContent>
        </Sheet></div>
    )
}

export default MobileNav