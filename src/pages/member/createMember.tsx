import Navbar from "@/app/navbar/navbar";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import 'src/app/globals.css';
import TabNavbar from "src/app/navbar/navbar.js";
import member from "../member";

interface Member {
    memberID: number;
    nameEng: string;
    nameTh: string;
    profilePic: string;
    phone: string;
    email: string;
    cID: string;
    drugAllergy: string;
    congenitalDisease: string;
    rankID: number;
    address: string;
    emergencyContact: string;
    point: number;
    subscriptionDate: Date;
}

export default function createMember() {


    return (
        <div>
            <div>
                <TabNavbar />
            </div>
            <div className=" bg-black w-full h-full">
                <div className="grid place-items-center  font-AzeretMono">
                    <div className="rounded-3xl m-6 w-9/12 pb-6 text-black bg-[#D9D9D9]">
                        <div className="rounded-3xl rounded-b-none  w-full h-[95px] text-black bg-[#FFFFFF]">
                            {/* ก้อน1 */}
                            <div className="flex flex-row ">
                                <div className="basis-5/6 flex justify-start ...">
                                    <img className=" rounded-full w-36 h-36 m-6 border-8 border-[#FFFFFF] " />
                                    <div>
                                        <div className="grid pt-24 ">
                                            <span className="font-semibold text-4xl">Untitled</span>
                                            <span className="font-light text-3xl pb-24" >ID : XXX</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="basis-1/6 flex justify-end ...mr-10">
                                    <button className="bg-[#1CDF99]  rounded-md h-10 p-2 mt-5 mr-5 font-semibold text-white-base" >SAVE</button>
                                </div>
                            </div>
                        </div>



                        {/* ก้อน2 */}
                        <p className="ml-32  mt-28 text-base">Member information</p>
                        <hr className="ml-20 mr-20 my-3 bg-[#000000]  " />
                        <div className="flex flex-row mb-6">
                            <div className="basis-1/2 flex justify-start ...">
                                <div className="grid ml-32 ">

                                    <label htmlFor="first-name" className="font-light text-base">Name(Eng)</label>
                                    <div className="mt-2">
                                        <input
                                            type="text"
                                            name="first-name"
                                            id="first-name"
                                            autoComplete="off"
                                            className="font-semibold text-xl rounded-md block w-full"
                                        />
                                    </div>

                                    {/* <span font-light text-base>Name(TH)</span>
                                    <span className="font-semibold text-xl ">{memberData.nameTh}</span>

                                    <span font-light text-base>Rank</span>
                                    <p className="font-semibold text-xl">ID : เด๋วโยง{memberData.rankID}</p>

                                    <span font-light text-base>Point</span>
                                    <span className="font-semibold text-xl">{memberData.point}</span> */}
                                </div>
                            </div>

                            <div className="basis-1/2 flex justify-start ...">
                                <div className="grid  ">

                                    {/* <span font-light text-base>Citizen ID</span>
                                    <span className="font-semibold text-xl ">{memberData.cID}</span>

                                    <span font-light text-base>Phone number</span>
                                    <span className="font-semibold text-xl ">{memberData.phone}</span>

                                    <span font-light text-base>Email</span>
                                    <span className="font-semibold text-xl ">{memberData.email}</span>

                                    <span font-light text-base>Address</span>
                                    <span className="font-semibold text-xl ">{memberData.address}</span> */}
                                </div>
                            </div>

                        </div>


                        {/* ก้อน3 */}
                        <div>
                            <p className="ml-32">Medical information</p>
                            <hr className="ml-20 mr-20 my-3 bg-[#000000]  " />

                            {/* <div className="flex flex-row ">
                                <div className="basis-1/3 ">
                                    <div>
                                        <div className="grid ml-32">
                                            <span className="font-light text-base ">Drug Allergy</span>
                                            <span className="font-semibold text-xl ">{memberData.drugAllergy}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="basis-1/3 flex justify-center ...">
                                    <div >
                                        <div className="grid ">
                                            <span className="font-light text-base ">Congenital Disease</span>
                                            <span className="font-semibold text-xl ">{memberData.congenitalDisease}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="basis-1/3 flex justify-start ...">
                                    <div>
                                        <div className="grid ">
                                            <span className="font-light text-base ">Emergency Contact</span>
                                            <span className="font-semibold text-xl ">{memberData.emergencyContact}</span>
                                        </div>
                                    </div>
                                </div>
                            </div> */}

                        </div>

                        {/* ก้อน4 */}

                        <div>
                            {/* <div className="flex flex-row mb-6 ">
                                <div className="basis-1/2 ">
                                    <p className="ml-32  mt-8 text-base">Trainer Information</p>
                                    <hr className="ml-20 mr-5 my-3 bg-[#000000]" />
                                    <div className="flex flex-row ">
                                        <div className="basis-1/3 ">
                                            <div>
                                                <div className="grid ml-20">
                                                    <span className="font-light text-base ">Name</span>
                                                    <span className="font-semibold text-xl ">ดึงname</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="basis-1/3 flex justify-center ...">
                                            <div>
                                                <div className="grid  ">
                                                    <span className="font-light text-base ">Days</span>
                                                    <span className="font-semibold text-xl ">ดึงDay</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="basis-1/3 flex justify-center ...">
                                            <div>
                                                <div className="grid ">
                                                    <span className="font-light text-base ">Time</span>
                                                    <span className="font-semibold text-xl ">ดึงtime</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div> 

                                 </div>
                                 <div className="basis-1/2">
                                    <p className=" ml-10 mt-8 text-base">Registered Course</p>
                                    <hr className="mr-20 my-3 bg-[#000000]" />
                                    <div className="flex flex-row ">
                                        <div className="basis-1/3 ">
                                            <div>
                                                <div className="grid ">
                                                    <span className="font-light text-base ">Name</span>
                                                    <span className="font-semibold text-xl ">ดึงname</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="basis-1/3 flex justify-start ...">
                                            <div>
                                                <div className="grid  ">
                                                    <span className="font-light text-base ">Days</span>
                                                    <span className="font-semibold text-xl ">ดึงDay</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="basis-1/3 ">
                                            <div>
                                                <div className="grid ">
                                                    <span className="font-light text-base ">Time</span>
                                                    <span className="font-semibold text-xl ">22:22</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>*/}
                        </div>
                    </div>
                </div>
            </div>



            <p>createMember</p>
        </div>


    );
}
