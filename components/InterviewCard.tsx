import React from 'react';
import Image from "next/image"
import dayjs from "dayjs";
import {getRandomInterviewCover} from "@/lib/utils";

interface InterviewCard {
    interviewId: string,
    user: string,
    role: string,
    type: string,
    techstack: string[],
    createdAt: string,
}

export const InterviewCard: React.FC<InterviewCard> = ({interviewId, createdAt, techstack, role, type, user}) => {
    const feedback = null as Feedback | null;
    const normalizedType = /mix/gi.test(type) ? "Mixed" : type;
    const formattedDate = dayjs(feedback?.createdAt || createdAt || Date.now()).format('MMM D, YYYY');

    return (
        <div className={"card-border w-[360px] max-sm:w-full min-h-96"}>
            <div className={"card-interview"}>
                <div>
                    <div className={"absolute top-0 right-0 w-fit px-4 py-2 rounded-bl-md bg-light-600"}>
                        <p className={"badge-text"}>{normalizedType}</p>
                    </div>
                    <Image className={"rounded-full object-fit size-[90]"} src={getRandomInterviewCover()} alt={"cover imagen"}
                        width={90} height={90}/>
                    <h3 className={"mt-5 capitalize"}>
                        {role} Interview
                    </h3>
                    <div className={"flex flex-row gap-5 mt-3"}>
                        <div className={"flex flex-row gap-2"}>
                            <Image src={"/calendar"} alt={"calendar"} />
                            <p>{formattedDate}</p>
                        </div>
                        <div className={"flex flex-row gap-2 items-center"}>
                            <Image src={"/star.svg"} alt={"star"} width={30} height={30}/>
                            <p>{feedback?.totalScore || "---"}/100</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InterviewCard;