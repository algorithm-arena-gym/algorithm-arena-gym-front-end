import { useEffect, useState } from "react";
import 'src/app/globals.css';
import TabNavbar from "src/app/navbar/navbar.js";
import { Formik, Form, Field, ErrorMessage } from 'formik';

interface Course {
    courseID: number,
    createAt: Date;
    courseNAME: string,
    price: number,
    detail: string,
    profilePic: string,

}

const initialValues = {
    courseName: '',
    coursePic: '',
    detail: '',
    trainerID: '',
}

export default function CourseCreate() {


    return (
        <div>
            <div>
                <TabNavbar />
            </div>

            <Formik
                initialValues={initialValues}
                onSubmit={(values, action) => {
                    console.log(values)
                }}
            >
                {({ isSubmitting }) => (
                    <Form>
                        <div className=" bg-black w-full h-screen">
                            <div className="grid place-items-center  font-AzeretMono">
                                <div className="rounded-3xl m-12 w-9/12 pb-6 text-black bg-[#D9D9D9]">
                                    <div className="rounded-3xl rounded-b-none  w-full h-[95px] text-black bg-[#FFFFFF]">

                                        {/* ก้อน1 */}
                                        <div >
                                            <div className="flex flex-row ">
                                                <div className="basis-5/6 flex justify-start ...">
                                                    <img className=" rounded-full w-36 h-36 m-6 border-8 border-[#FFFFFF] " />
                                                    <div>
                                                        <div className="grid pt-24 ">
                                                             <span className="font-semibold text-4xl">Untitled Course</span>
                                                        <span className="font-light text-3xl pb-24" >ID : XXX</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="basis-1/6 flex justify-end ...mr-10">
                                                    <button type="submit" disabled={isSubmitting} className="bg-[#1CDF99]  rounded-md h-10 p-2 mt-5 mr-5 font-semibold text-white-base" >SAVE</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* ก้อน2 */}
                                    <div>
                                        <p className="ml-32 mt-28 ">Course Name(ENG)</p>
                                        <hr className="ml-20 mr-20 my-3 bg-[#000000]  " />
                                        <div className="mt-2 ml-32 mr-32">
                                            <Field type="string" name="nameEng"
                                                className="font-semibold text-xl rounded-md block w-full"
                                            />
                                        </div>

                                    </div>


                                    {/* ก้อน3 */}
                                    <div>
                                        <p className="ml-32 mt-5 ">Course Information</p>
                                        <hr className="ml-20 mr-20 my-3 bg-[#000000]  " />
                                        <div className="mt-2 ml-32 mr-32 ">
                                            <div className="mt-2">
                                                <Field type="string" name="rankDetail" as="textarea"

                                                    className="font-semibold text-xl rounded-md block w-full"
                                                />

                                            </div>
                                        </div>

                                    </div>

                                    {/* ก้อน4 */}
                                    <div>
                                        <p className="ml-32 mt-5">Available Days of The Week</p>
                                        <hr className="ml-20 mr-20 my-3 bg-[#000000]  " />
                                        <span className="font-light text-base ml-32">ดึงวันเวลา</span>
                                    </div>

                                    {/* ก้อน5*/}
                                    <div>
                                        <p className="ml-32 mt-5 ">Trainer</p>
                                        <hr className="ml-20 mr-20 my-3 bg-[#000000]  " />

                                       
                                                <div>
                                                    <div className="grid ml-32 mr-32">
                                                        <span className="font-light text-base ">Name</span>

                                                        <Field type="string" name="rank" as="select" className="font-semibold text-xl rounded-md block w-full">

                                                            <option value="ที่มี" className="font-semibold text-xl w-full">ที่มี</option>

                                                        </Field>
                                                    </div>
                                                


                                        </div>
                                    </div>


                                    {/* ก้อน6*/}
                                    <div>
                                        <div className="flex flex-row mb-6 ">
                                            <div className="basis-1/2 ">
                                                <p className="ml-32  mt-8 text-base">Rank Available</p>
                                                <hr className="ml-20 mr-10 my-3 bg-[#000000]" />
                                                <div>
                                                    <div className="grid ml-32 mr-10 ">
                                                        <div className="mt-2  ">
                                                            <select
                                                                id="country"
                                                                name="country"
                                                                autoComplete="off"
                                                                className="font-semibold text-xl rounded-md block w-full"
                                                            >
                                                                <option>ชื่อ</option>
                                                                <option>Monday</option>
                                                                <option>Tuesday</option>


                                                            </select>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="basis-1/2">
                                                <p className="  ml-10 mt-8 text-base">Course Member</p>
                                                <hr className="  mr-20 my-3 bg-[#000000]" />
                                                <div>
                                                    <div className="grid ml-10">
                                                        <div className="mt-2 mr-20 my-3">
                                                            <select
                                                                id="country"
                                                                name="country"
                                                                autoComplete="off"
                                                                className="font-semibold text-xl rounded-md block w-full"
                                                            >
                                                                <option>เทรนเนอร์</option>
                                                                <option>Monday</option>


                                                            </select>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>



                                        </div>
                                    </div>

                                </div>

                            </div>
                        </div>



                    </Form>
                )}
            </Formik>
        </div>

    );
}
