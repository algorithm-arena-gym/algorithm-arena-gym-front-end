import Link from "next/link";
import Head from "../app/head";
import { useState, useEffect } from "react";


export default function login() {


    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const handleLogin = () => {
        // Replace this with actual login validation
        if (username === "admin" && password === "password") {
            setErrorMessage("");
            console.log("Login successful");
            setIsLoggedIn(true);

        } else {
            setErrorMessage("Incorrect username or password");
        }
    };

    return (
        <div>
            <div className="bg-black  ">


                <div className="h-60 pt-28">
                    <img src="/image/logo1.svg" className="mx-auto w-64 h-64 " alt="Logo" />
                </div>


                <div className="flex  justify-center min-h-screen pt-28 pb-32">
                    <div className="absolute bg-white rounded-3xl w-96 h-60    "> {/* center white box*/}

                        <h1 className="text-black text-3xl text-center  font-autiowide  mt-4">
                            Algorithm Arena
                        </h1>

                        <div className=" justify-items-stretch flex flex-col space-y-8 pt-6 "> {/* username & password box */}
                            <div className="flex flex-row space-x-4 flex-1 ">
                                <div><label className="username mb-2 ps-10 font-azeretmono font-bold text-sm">Username</label></div>
                                <div><input type="text " value={username}
                                    onChange={(e) => setUsername(e.target.value)} className="absolute w-289 h-35 left-614 top-596 bg-gray-300 rounded-full px-2 py-1 focus:outline-none focus:ring-0  text-gray-900 text-sm font-azeretmono" placeholder="username">
                                </input></div>
                            </div>
                            <div className="flex flex-row space-x-4 flex-1 ">
                                <div><label className="password ps-10 font-azeretmono font-bold text-sm "> Password</label></div>
                                <div><input type="password" value={password}
                                    onChange={(e) => setPassword(e.target.value)} className="absolute w-289 h-35 left-614 top-596 bg-gray-300 rounded-full px-2 py-1 focus:outline-none focus:ring-0  text-gray-900 text-sm font-azeretmono" placeholder="password">
                                </input></div>
                            </div>






                            <div className="place-self-center ">
                                {errorMessage && (
                                    <div className="text-red-500 text-center">{errorMessage}</div>
                                )}
                                <button
                                    className="bg-lime-200 rounded-lg w-24 outline outline-offset-2 outline-black hover:bg-lime-400 "
                                    onClick={handleLogin}
                                >
                                    <div className="shadow-2xl "></div>
                                    {errorMessage ? (
                                        <h2 className="text-black px-2 font-autiowide text-center">
                                            TRY AGAIN
                                        </h2>
                                    ) : (
                                        <Link href="/main">
                                            <h2 className="text-black px-2 font-autiowide text-center">LOG IN</h2>
                                        </Link>
                                    )}
                                </button>
                            </div>



                        </div >






                    </div >

                </div >
            </div >
        </div >
    )
}

