import React from 'react';
import Agent from "@/components/Agent";

interface IPage {

}

const Page: React.FC<IPage> = () => {
    return (
        <>
            <h3></h3>
            <Agent username={"You"} userId={"user1"} type={"Generate"}/>
        </>
    );
};

export default Page;