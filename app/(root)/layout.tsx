import React from 'react';
import Link from "next/link";
import Image from "next/image";

interface ILayout {
    children: React.ReactNode;
}

const Layout: React.FC<ILayout> = ({children}) => {
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

export default Layout;