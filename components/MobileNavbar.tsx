'use client'
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { sidebarLinks } from "@/constants/index"
import { cn } from "@/lib/utils"
import Image from "next/image.js"
import Link from "next/link.js"
import { usePathname } from "next/navigation.js"


const MobileNavbar = ({ user }: MobileNavProps) => {
    const pathName = usePathname()
    return (
        <section className="w-full max-w-[264px]">
            <Sheet>
                <SheetTrigger>
                    <Image
                        src='/icons/hamburger.svg'
                        width={30}
                        height={30}
                        alt="menu"
                        className="curson-pointer" />
                </SheetTrigger>
                <SheetContent side={'left'}
                    className="border-none bg-white"
                >
                    <Link href='/' className=" flex cursor-pointer item-center gap-1 px-4">
                        <Image
                            src={'/icons/logo.svg'}
                            width={34}
                            height={34}
                            alt='Horizon logo'
                        />
                        <h1 className='text-24 font-ibm-plex-serif font-bold text-black-1'>Horizon</h1>
                    </Link>
                    <div className="mobilenav-sheet">
                        <SheetClose asChild>
                            <nav className="flex h-full flex-col gap-6 pt-14 text-white" >
                                {sidebarLinks.map((item) => {
                                    const isAtive = pathName === item.route || pathName
                                        .startsWith(`${item.route}/`)
                                    return (
                                        <SheetClose asChild key={item.route}>
                                            <Link
                                                href={item.route}
                                                key={item.label}
                                                className={cn('mobilenav-sheet_close w-full', {
                                                    'bg-bank-gradient': isAtive
                                                })}
                                            >

                                                <Image src={item.imgURL}
                                                    alt={item.label}
                                                    width={20}
                                                    height={20}
                                                    className={cn({ 'brightness-[3] invert-0': isAtive })}
                                                />

                                                <p className={cn('text-16 font-semi-bold text-black-2', {
                                                    'text-white': isAtive
                                                })}>
                                                    {item.label}
                                                </p>
                                            </Link>
                                        </SheetClose>

                                    )
                                })}
                            </nav>
                        </SheetClose>
                    </div>
                </SheetContent>
            </Sheet>
        </section>
    )
}

export default MobileNavbar
