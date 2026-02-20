"use client";

import { authenticate } from "@/services/auth.service";
import {useState} from "react";
import { useRouter } from "next/navigation";


export default function SignInPage(){
    const [email,setEmail]=useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        setLoading(true);
        setError(null);

        try {
            const response = await authenticate({
            email,
            password,
            });

            const { access_token, refresh_token } = response.data;

            localStorage.setItem("access_token", access_token);
            localStorage.setItem("refresh_token", refresh_token);

            console.log("Tokens stored successfully");

            router.push("/dashboard");



            // For now we just log it
            // Next step: store tokens
        } catch (err) {
            setError("Invalid email or password");
        } finally {
            setLoading(false);
        }
    };


    return(
        <main className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4  space-y-4">

            <section className="w-full max-w-md bg-white p-8 rounded-xl shadow-md ">
                <h1>
                    Log in to your Medicare Account Here
                </h1>
            </section>

            <section className="w-full max-w-md bg-white p-8 rounded-xl shadow-md">

                <h1 className="text-2xl font-semibold text-center mb-6">
                    Sign In
                </h1>


                <form onSubmit={handleSubmit} className="space-y-4">                                {/* It adds vertical spacing between all direct children inside the form.*/}

                    <div className="flex flex-col">
                        <label htmlFor="email" className="mb-1 text-sm font-medium">
                            Email
                        </label>

                        <input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue"/>       
                    </div>



                    <div className="flex flex-col">
                        <label htmlFor="password" className="mb-1 text-sm font-medium">
                            Password
                        </label>

                        <input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required className="border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue"/>       
                    </div>

                    {error && (
                        <p className="text-red-600 text-sm text-center">
                            {error}
                        </p>
                    )}


                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-black text-white py-2 rounded-md hover:opacity-90 transition disabled:opacity-50"
                    >
                        {loading ? "Logging in..." : "Login"}
                    </button>


                </form>

            </section>
        </main>
    );

}