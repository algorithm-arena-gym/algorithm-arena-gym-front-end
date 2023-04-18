import { useEffect, useState } from "react";
import 'src/app/globals.css';
import TabNavbar from "src/app/navbar/navbar.js";
import { Formik, Form, Field, ErrorMessage } from 'formik';



interface Rank {
    rankID: number;
    rankPic: string;
    rankName: string;
    rankDetail: string;
    rankPrice: number;

}
const initialValues = {
    rankID: '',
    rankPic: '',
    rankName: '',
    rankDetail: '',
    rankPrice: '',
}

export default function RankCreate() {


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
                                                    <img className=" rounded-3xl w-1/3 h-48 m-10 border-8 border-[#FFFFFF] " />
                                                    <div>
                                                        <div className="grid pt-24 ">
                                                            <span className="font-semibold text-5xl">Untitled Rank</span>
                                                            <span className="font-semibold text-5xl" >ID : XXX</span>
                                                            <span className="font-semibold text-5xl mb-24" >PRICE : XXX</span>
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
                                        <p className="ml-32 mt-40 ">Information</p>
                                        <hr className="ml-20 mr-20 my-3 bg-[#000000]  " />
                                        <div className="mt-2 ml-20 mr-20 ">
                                            <div className="mt-2">
                                                <Field type="string" name="rankDetail" as="textarea"
                                                        
                                                        className="font-semibold text-xl rounded-md block w-full"
                                                    />
                                                    
                                            </div>
                                        </div>
                                        
                                    </div>

                                    {/* ก้อน3*/}
                                    <div>
                                        <div className="flex flex-row mb-6 ">
                                            <div className="basis-1/2 ">
                                                <p className="ml-32  mt-8 text-base">Rank NAME (EMG)</p>
                                                <hr className="ml-20 mr-10 my-3 bg-[#000000]" />
                                                <div>
                                                    <div className="grid ml-20 mr-10">
                                                        <div className="mt-2 ">
                                                            <Field type="string" name="rankName"
                                                                className="font-semibold text-xl rounded-md block w-full"
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="basis-1/2">
                                                <p className="  ml-10 mt-8 text-base">Rank Price</p>
                                                <hr className="  my-3 mr-20 bg-[#000000]" />
                                                <div>
                                                    <div className="grid mr-20 ">
                                                        <div className="mt-2 ">
                                                            <Field type="number" name="rankPrice"
                                                                className="font-semibold text-xl rounded-md block w-full "
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>


                                    {/* ก้อน4*/}
                                    <div>
                                        <div className="flex flex-row mb-6 ">
                                            <div className="basis-1/2 ">
                                                <p className="ml-32  mt-8 text-base">Member in this rank</p>
                                                <hr className="ml-20 mr-10 my-3 bg-[#000000]" />
                                                <div>
                                                    <div className="grid ml-20 mr-10">
                                                        <div className="mt-2 ">
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
                                                <p className="  ml-10 mt-8 text-base">Course in this rank</p>
                                                <hr className=" mr-20 my-3 bg-[#000000]" />
                                                <div>
                                                    <div className="grid ">
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



            {/* <Formik
                initialValues={initialValues}
                onSubmit={(values, action) => {
                    console.log(values)
                }}
            >
                {({ isSubmitting }) => (
                    <Form>
                        <div className=" bg-black w-full h-full">
                            <div className="grid place-items-center  font-AzeretMono">
                                <div className="rounded-3xl m-6 w-9/12 pb-6 text-black bg-[#D9D9D9]">
                                    <div className="rounded-3xl rounded-b-none  w-full h-[95px] text-black bg-[#FFFFFF]">
                                        
                                    
                                </div>
                            </div>
                        </div>


                    </Form>
                )}
            </Formik> */}


        </div>


    );
}

