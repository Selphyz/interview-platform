import React from 'react';
import {isAuthenticated} from "@/lib/actions/auth.action";
import {redirect} from "next/navigation";

interface ILayout {
    children: React.ReactNode;
}

const AuthLayout: React.FC<ILayout> = async ({children}) => {
    const isUserAuthenticated = await isAuthenticated();
    if (isUserAuthenticated) redirect("/");
    return (
        <div className="auth-layout">
            {children}
        </div>
    );
};

export default AuthLayout;