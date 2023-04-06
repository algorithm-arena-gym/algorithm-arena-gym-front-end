import Navbar from "@/app/navbar/navbar";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import 'src/app/globals.css';
import TabNavbar from "src/app/navbar/navbar.js";
import member from "../member";

interface Trainer {
    trainerID: number;
    nameEng: string;
    nameTh: string;
    profilePic: string;
    phone: string;
    email: string;
    cID: string;
    drugAllergy: string;
    congenitalDisease: string;
    address: string;
    emergencyContact: string;
    hireDate: Date;
}

export default function TrainerCreate() {


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
                                            <span className="font-semibold text-4xl">Untitled Trainer</span>
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

                                    <label htmlFor="first-name" className="font-light text-base ">Name(TH)</label>
                                    <div className="mt-2">
                                        <input
                                            type="text"
                                            name="first-name"
                                            id="first-name"
                                            autoComplete="off"
                                            className="font-semibold text-xl rounded-md block w-full"
                                        />
                                    </div>

                                    <label htmlFor="first-name" className="font-light text-base  ">Citizen ID</label>
                                    <div className="mt-2">
                                        <input
                                            type="text"
                                            name="first-name"
                                            id="first-name"
                                            autoComplete="off"
                                            className="font-semibold text-xl rounded-md block w-full"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="basis-1/2 flex justify-start ...">
                                <div className="grid ">


                                    <label htmlFor="first-name" className="font-light text-base ">Phone number</label>
                                    <div className="mt-8">
                                        <input
                                            type="text"
                                            name="first-name"
                                            id="first-name"
                                            autoComplete="off"
                                            className="font-semibold text-xl rounded-md block w-full"
                                        />
                                    </div>

                                    <label htmlFor="first-name" className="font-light text-base mt-6">Email</label>
                                    <div className="mt-8">
                                        <input
                                            type="text"
                                            name="first-name"
                                            id="first-name"
                                            autoComplete="off"
                                            className="font-semibold text-xl rounded-md block w-full"
                                        />
                                    </div>

                                    <label htmlFor="first-name" className="font-light text-base mt-6">Address</label>
                                    <div className="mt-8">
                                        <textarea
                                            name="first-name"
                                            id="first-name"
                                            autoComplete="off"
                                            rows={2}
                                            className="font-semibold text-xl rounded-md block w-full"
                                        />
                                    </div>
                                </div>
                            </div>

                        </div>


                        {/* ก้อน3 */}
                        <div>
                            <p className="ml-32">Medical information</p>
                            <hr className="ml-20 mr-20 my-3 bg-[#000000]  " />
                            <div className="flex flex-row ">
                                <div className="basis-1/3 ">
                                    <div>
                                        <div className="grid ml-32">
                                            <label htmlFor="first-name" className="font-light text-base ">Drug Allergy</label>
                                            <div className="mt-2">
                                                <input
                                                    type="text"
                                                    name="first-name"
                                                    id="first-name"
                                                    autoComplete="off"
                                                    className="font-semibold text-xl rounded-md block w-full"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="basis-1/3 flex justify-center ...">
                                    <div >
                                        <div className="grid ">
                                            <label htmlFor="first-name" className="font-light text-base ">Congenital Disease</label>
                                            <div className="mt-2">
                                                <input
                                                    type="number"
                                                    name="first-name"
                                                    id="first-name"
                                                    autoComplete="off"
                                                    className="font-semibold text-xl rounded-md block w-full"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="basis-1/3 flex justify-start ...">
                                    <div>
                                        <div className="grid mr-20">
                                            <label htmlFor="first-name" className="font-light text-base ">Emergency Contact</label>
                                            <div className="mt-2">
                                                <input
                                                    type="number"
                                                    name="first-name"
                                                    id="first-name"
                                                    autoComplete="off"
                                                    className="font-semibold text-xl rounded-md block w-full "
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>



                        </div>

                        {/* ก้อน4 */}

                        <div>
                            <div className="flex flex-row mb-6 ">
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
                                        <div className="basis-1/3 flex justify-center ... ">
                                            <div>
                                                <div className="grid  ">
                                                    <label htmlFor="first-name" className="font-light text-base ">Days</label>
                                                    <div className="mt-2">
                                                        <select
                                                            id="country"
                                                            name="country"
                                                            autoComplete="off"
                                                            className="font-semibold text-xl rounded-md block w-full"
                                                        >
                                                            <option>Sunday</option>
                                                            <option>Monday</option>
                                                            <option>Tuesday</option>
                                                            <option>Wednesday</option>
                                                            <option>Thrusday</option>
                                                            <option>Friday</option>
                                                            <option>Saturday</option>

                                                        </select>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="basis-1/3 flex justify-center ...">
                                            <div>
                                                <div className="grid ">
                                                    <label htmlFor="first-name" className="font-light text-base ">Time</label>
                                                    <div className="mt-2 ">
                                                        <select
                                                            id="country"
                                                            name="country"
                                                            autoComplete="off"
                                                            className="font-semibold text-xl rounded-md block w-full "
                                                        >
                                                            <option>10-11</option>
                                                            <option>11-12</option>
                                                            <option>12-13</option>
                                                            <option>13-14</option>
                                                            <option>14-15</option>
                                                            <option>15-16</option>
                                                            <option>16-17</option>
                                                            <option>17-18</option>
                                                            <option>18-19</option>
                                                            <option>19-20</option>
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>



                                    </div>
                                    <div className=" text-black bg-[#FFFFFF] text-xl rounded-md  ml-20 mr-5 mt-3  flex justify-center">+</div>


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
                                        <div className="basis-1/3 flex justify-start ... ">
                                            <div>
                                                <div className="grid  ">
                                                    <label htmlFor="first-name" className="font-light text-base ">Days</label>
                                                    <div className="mt-2">
                                                        <select
                                                            id="country"
                                                            name="country"
                                                            autoComplete="off"
                                                            className="font-semibold text-xl rounded-md block w-full"
                                                        >
                                                            <option>Sunday</option>
                                                            <option>Monday</option>
                                                            <option>Tuesday</option>
                                                            <option>Wednesday</option>
                                                            <option>Thrusday</option>
                                                            <option>Friday</option>
                                                            <option>Saturday</option>

                                                        </select>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="basis-1/3 ">
                                            <div>
                                                <div className="grid ">
                                                    <label htmlFor="first-name" className="font-light text-base ">Time</label>
                                                    <div className="mt-2 mr-20">
                                                        <select
                                                            id="country"
                                                            name="country"
                                                            autoComplete="off"
                                                            className="font-semibold text-xl rounded-md block w-full "
                                                        >
                                                            <option>10-11</option>
                                                            <option>11-12</option>
                                                            <option>12-13</option>
                                                            <option>13-14</option>
                                                            <option>14-15</option>
                                                            <option>15-16</option>
                                                            <option>16-17</option>
                                                            <option>17-18</option>
                                                            <option>18-19</option>
                                                            <option>19-20</option>
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className=" text-black bg-[#FFFFFF] text-xl rounded-md   mr-20 mt-3  flex justify-center">+</div>


                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
    );
}
