"use client";
import React from 'react';
import { z } from "zod"
// Add console logs for debugging
console.log("AuthForm module loaded");
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import { Button } from "@/components/ui/button";
import {
    Form
} from "@/components/ui/form";
import {FormField} from "@/components/FormField"
import Image from "next/image";
import Link from 'next/link';
import {toast} from "sonner";
import {useRouter} from "next/navigation";
import {createUserWithEmailAndPassword, signInWithEmailAndPassword} from "firebase/auth";
import {auth} from "@/firebase/client";
import {signIn, signUp} from "@/lib/actions/auth.action";

interface IAuthForm {
    type: 'sign-in' | 'sign-up';
}
// Define FormType locally to avoid import issues
type FormType = "sign-in" | "sign-up";

const authFormSchema = (type: FormType) => {
    console.log("Creating schema for type:", type);
    return z.object({
        name: type === "sign-up" ? z.string().min(1, { message: "Name is required" }) : z.string().optional(),
        email: z.string().min(1, { message: "Email is required" }).email({ message: "Invalid email" }),
        password: z.string().min(6, { message: "Password must be at least 6 characters" }),
    });
}

export const AuthForm: React.FC<IAuthForm> = ({type}) => {
    const router = useRouter()
    console.log("AuthForm rendering with type:", type);
    const isSignIn = type === "sign-in";
    console.log("isSignIn:", isSignIn);
    const formSchema = authFormSchema(type);
    console.log("Form schema created successfully");

    // Initialize the form
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            email: "",
            password: "",
        }
    });
    console.log("useForm initialized successfully");

    // Wrap the entire component logic in a try-catch
    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            if(type === 'sign-up') {
                const { name, email, password } = values;

                const userCredentials = await createUserWithEmailAndPassword(auth, email, password);

                const result = await signUp({
                    uid: userCredentials.user.uid,
                    name: name!,
                    email,
                    password,
                })

                if(!result?.success) {
                    toast.error(result?.message);
                    return;
                }

                toast.success('Account created successfully. Please sign in.');
                router.push('/sign-in')
            } else {
                const { email, password } = values;

                const userCredential = await signInWithEmailAndPassword(auth, email, password);

                const idToken = await userCredential.user.getIdToken();

                if(!idToken) {
                    toast.error('Sign in failed')
                    return;
                }

                await signIn({
                    email, idToken
                })

                toast.success('Sign in successfully.');
                router.push('/')
            }
        } catch (error) {
            console.log(error);
            toast.error(`There was an error: ${error}`)
        }
    }

    // Render the form
    return (
        <div className="card-border lg:min-w-[566px]">
            <div className="flex flex-col gap-6 card py-14 px-10">
                <div className="flex flex-col gap-2 justify-center">
                    <Image src="/logo.svg" alt="logo" height={32} width={38} />
                    <h2 className={"text-primary-100"}>PrepWise</h2>
                </div>
                <h3>Practice your Interview</h3>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        {!isSignIn && (
                            <FormField name={"name"} control={form.control} type={"text"} label={"Name"} placeholder={"Nombre"} />
                        )}
                        <FormField name={"email"} control={form.control} type={"text"} label={"Email"} placeholder={"Tu email"} />
                        <FormField name={"password"} control={form.control} type={"password"} label={"Password"} placeholder={"Tu password"} />
                        <Button className={"btn"} type="submit">{isSignIn ? "Sign In" : "Create an Account"}</Button>
                    </form>
                    <p className={"text-center"}>
                        {isSignIn ? "Don't have an account?" : "Already have an account?"}
                        <Link href={!isSignIn ? "/sign-in":"/sign-up"} className={"font-bold text-user-primary ml-1"}>
                            {!isSignIn ? "Sign In" : "Create an Account"}
                        </Link>
                    </p>
                </Form>
            </div>
        </div>
    );
};

// Add a try-catch wrapper for the default export to catch any errors during import
const SafeAuthForm = (props: IAuthForm) => {
    try {
        return <AuthForm {...props} />;
    } catch (error) {
        console.error("Error rendering AuthForm:", error);
        return <div>Error loading authentication form. Please try again later.</div>;
    }
};

export default SafeAuthForm;
