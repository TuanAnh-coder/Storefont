import Image from "next/image";
import Link from "next/link";
import { FiAlignJustify } from "react-icons/fi";
import { Search } from "../header/Search";
import { api } from "@/utils/api";
import { useState } from "react";
import Sidebar from "../header/SideBar";

const HeaderBlog = () => {
    const {data} = api.blog.getCategories.useQuery();
    const [sidebar, setSibar] = useState(false)
    return (
        <header className="w-full h-16 bg-white shadow-md flex items-center justify-between">
            <Sidebar open={sidebar} onClose={() => setSibar(false)} />
            <div className="flex items-center gap-2 justify-between w-full px-4 lg:px-8">
                <div className="flex gap-1 items-center justify-between flex-row-reverse w-full lg:w-auto">
                    <FiAlignJustify
                        color='#000000ff'
                        size={28}
                        className="cursor-pointer lg:hidden"
                        onClick={() => setSibar(true)}
                    />
                    <Link href="/">
                        <Image
                            className='bg-none w-24 md:20 lg:w-24 xl:w-32'
                            priority
                            src="/logo.png"
                            alt="logo"
                            width={120}
                            height={28}
                            quality={100}
                        />
                    </Link>
                </div>
                <ul className="w-full flex gap-6 justify-end items-center hidden lg:flex">
                    {(data as unknown as { id: number; Title: string }[] | undefined)?.map((item, index) => (
                        <li key={index} className="flex mx-4">
                            <Link href={`/blog/category/${item.id}`}>
                                <span className="font-medium hover:text-orange-500 transition-colors">{item.Title}</span>
                            </Link>
                        </li>
                    ))}
                </ul>
                <div className='hidden lg:block w-48 rounded-xl'>
                    <Search onSearch={value => console.log(value)} />
                </div>

            </div>
        </header>
    );
}
export default HeaderBlog;