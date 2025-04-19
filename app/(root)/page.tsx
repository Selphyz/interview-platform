import React from 'react';
import {Button} from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import {dummyInterviews} from "@/constants";
import InterviewCard from "@/components/InterviewCard";
import {getCurrentUser, getInterviewsByUserId, getLatestInterviews} from "@/lib/actions/auth.action";

interface IPage {

}

const Page: React.FC<IPage> = async () => {
    const user = await getCurrentUser();
    const [userInterviews, latestInterviews] = await Promise.all([
        await getInterviewsByUserId(user!.id),
        await getLatestInterviews({userId: user!.id}),
    ])
    const hasPastInterviews = userInterviews && userInterviews?.length > 0;
    const hasUpcomingInterviews = latestInterviews && latestInterviews?.length > 0;
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
                    {hasPastInterviews ? (dummyInterviews.map((interview) => (
                        <InterviewCard key={interview.id} {...interview} type={'Technical'}/>
                    ))): (
                        <p>You haven&apos;t taken any interviews yet</p>
                    )}
                </div>
            </section>
            <section className="flex flex-col gap-6 mt-8">
                <h2>Take an interview</h2>
                <div className={"interviews-section"}>
                    {hasUpcomingInterviews ? (latestInterviews.map((interview) => (
                        <InterviewCard key={interview.id} {...interview} type={'Technical'}/>
                    ))): (
                        <p>No new interviews available</p>
                    )}
                </div>
            </section>
        </>
    );
};

export default Page;