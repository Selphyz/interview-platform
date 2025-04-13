import React from 'react';
import Link from "next/link";
import Image from "next/image";
import {isAuthenticated} from "@/lib/actions/auth.action";
import {redirect} from "next/navigation";

interface ILayout {
    children: React.ReactNode;
}

const RootLayout: React.FC<ILayout> = async ({children}) => {
    const isUserAuthenticated = await isAuthenticated();
    if(!isUserAuthenticated) redirect("/sign-in");
    return (
        <div className={"root-layout"}>
            <nav>
                <Link href="/" className="flex items-center gap-2">
                    <Image src="/logo.svg" alt="Logo" width={38} height={32}></Image>
                    <h2 className="text-primary-100"></h2>
                </Link>
            </nav>
            {children}
        </div>
    );
};

export default RootLayout;