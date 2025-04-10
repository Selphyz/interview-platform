import React from 'react';
import {Button} from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import {dummyInterviews} from "@/constants";
import InterviewCard from "@/components/InterviewCard";

interface IPage {

}

const Page: React.FC<IPage> = () => {
    return (
        <>
            <section className="card-cta">
                <div className="flex flex-col gap-6 max-w-lg">
                    <h2>Preparate tus entrevistas con AI</h2>
                    <p className="text-lg">
                        Practica y consigue feedback inmediato
                    </p>
                    <Button asChild className="btn-primary max-sm:w-full">
                        <Link href="/interview">Start the Interview</Link>
                    </Button>
                </div>
                <Image src="/robot.png" alt="robo-guy" width={400} height={400} className="max-sm:hidden"/>
            </section>
            <section className="flex flex-col gap-6 mt-8">
                <h2>Your interviews</h2>
                <div className="interviews-section">
                    {dummyInterviews.map((interview) => (
                        <InterviewCard key={interview.id} interviewId={''} user={''} role={''} type={'Technical'} techstack={[]} createdAt={''} />
                    ))}
                </div>
            </section>
            <section className="flex flex-col gap-6 mt-8">
                <h2>Take an interview</h2>
                <div className={"interviews-section"}>
                    {dummyInterviews.map((interview) => (
                        <InterviewCard key={interview.id} interviewId={''} user={''} role={''} type={'Mixed'} techstack={[]} createdAt={''} />
                    ))}
                </div>
            </section>
        </>
    );
};

export default Page;