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

interface Rank {
    rankID: number,
    rankName: string,
}

interface Member {
    memberID: number;
    nameEng: string;

}


const initialValues = {
    courseName: '',
    coursePic: '',
    detail: '',
    trainerID: '',

    rankID: '',
    memberID: ''

   
}

export default function CourseCreate() {
    const [courseData, setCourseData] = useState<Course | null>(null);
    const [trainerData, setTrainerData] = useState<Trainer | null>(null);
    const [memberData, setMemberData] = useState<Member | null>(null);
    const [rankData, setRankData] = useState<Rank | null>(null);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    

    useEffect(() => {
        async function fetchRankData() {
            setLoading(true);
            try {
                const res = await fetch('http://localhost:4000/rank');
                const json = await res.json();
                setRankData(json);
                setError(null);

                console.error(json);


            } catch (error) {
                console.error(error);
                setError('An error occurred while fetching the rank data.');
                setRankData(null);
            }

            setLoading(false);
        }

        fetchRankData();
    }, []);

    useEffect(() => {
        async function fetchTrainerData() {
            setLoading(true);
            try {
                const res2 = await fetch('http://localhost:4000/trainer');
                const json2 = await res2.json();
                setTrainerData(json2);
                setError(null);

                // console.error(json2);

            } catch (error) {
                console.error(error);
                setError('An error occurred while fetching the trainer data.');
                setTrainerData(null);
            }
            setLoading(false);
        }

        fetchTrainerData();
    }, []);

    useEffect(() => {
        async function fetchCourseData() {
            setLoading(true);
            try {
                const res3 = await fetch('http://localhost:4000/course');
                const json3 = await res3.json();
                setCourseData(json3);
                setError(null);

                // console.error(json3);

            } catch (error) {
                console.error(error);
                setError('An error occurred while fetching the course data.');
                setCourseData(null);
            }
            setLoading(false);
        }
        fetchCourseData();
    }, []);

    useEffect(() => {
        async function fetchMemberData() {
            setLoading(true);
            try {
                
                const res4 = await fetch('http://localhost:4000/member');
                const json4 = await res4.json();
                setMemberData(json4);
                setError(null);

                console.error(json4);


            } catch (error) {
                console.error(error);
                setError('An error occurred while fetching the member data.');
                setMemberData(null);
            }

            setLoading(false);
        }

        fetchMemberData();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    if (!courseData) {
        return <div>No data to display.</div>;
    }

    
    const trainers = JSON.parse(JSON.stringify(trainerData));
    const ranks = JSON.parse(JSON.stringify(rankData));
    const members = JSON.parse(JSON.stringify(memberData));



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
                                                            <span className="font-semibold text-4xl mt-2 w-full">
                                                                <Field type="string" name="coursePic"
                                                                    className="font-semibold text-xl rounded-md block w-full" required
                                                                    placeholder="www.coursePicture.com"
                                                                />
                                                            </span>
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
                                                <label htmlFor="first-name" className="font-light text-base ">Name</label>
                                                                <div className="mt-2 ">
                                                                    <Field type="number" name="trainerID" as="select" className="font-semibold text-xl rounded-md block w-full" required>
                                                                        {trainers?.map((tr: Trainer) => (
                                                                            <option value={tr.trainerID}>{tr.nameEng}</option>
                                                                        ))}
                                                                    </Field>
                                                                </div>
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
                                                            <Field type="number" name="rankID" as="select" className="font-semibold text-xl rounded-md block w-full" required>
                                                                        {ranks?.map((rank: Rank) => (
                                                                            <option value={rank.rankID}>{rank.rankName}</option>
                                                                        ))}
                                                                    </Field>
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
