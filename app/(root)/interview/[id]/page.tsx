import React from 'react';
import {getInterviewById} from "@/lib/actions/general.action";
import {redirect} from "next/navigation";
import Image from "next/image";
import {getRandomInterviewCover} from "@/lib/utils";
import DisplayTechIcons from "@/components/DisplayTechIcons";
import {getCurrentUser} from "@/lib/actions/auth.action";
import Agent from "@/components/Agent";

interface IPage {
    params: {
        id: string;
    }
}

const Page: React.FC<IPage> = async ({params}) => {
    const {id} = params;
    const user = await getCurrentUser();
    const interview = await getInterviewById(id);
    if(!interview) redirect("/")
    return (
        <>{(user && interview) &&
            <div className={"flex flex-row gap-4 justify-between"}>
                <div className={"flex flex-row gap-4 items-center max-sm:flex-col"}>
                    <div className={"flex flex-row gap-4 items-center"}>
                        <Image src={getRandomInterviewCover()} alt={"Cover image"} width={40} height={40}
                               className={"rounded-full object-cover size-[40px]"}/>
                        <h2>{interview.role}</h2>
                    </div>
                    <DisplayTechIcons techStack={interview.techstack}/>
                </div>
                <p className={"bg-dark-200"}>{interview.type}</p>
                <Agent userName={user?.name} userId={user?.id} type={"interview"} interviewId={interview.id}/>
            </div>}
        </>
    );
};

export default Page;