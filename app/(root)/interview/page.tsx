import React, { use } from 'react';
import Agent from "@/components/Agent";
import { getCurrentUser } from '@/lib/actions/auth.action';

interface IPage {

}

const Page: React.FC<IPage> = () => {
    const user = use(getCurrentUser());
    return (
        <>
            <h3></h3>
            {
                user && <Agent userName={user?.name} userId={user?.id} type={"generate"}/>
            }
        </>
    );
};

export default Page;