import React from 'react';
import AuthForm from "@/components/AuthForm";

interface IPage {

}

const Page: React.FC<IPage> = () => {
    return (
        <div>
            <AuthForm type={"sign-in"}></AuthForm>
        </div>
    );
};

export default Page;