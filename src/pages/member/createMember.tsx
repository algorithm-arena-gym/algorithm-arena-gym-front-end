import { useEffect, useState } from "react";
import 'src/app/globals.css';
import TabNavbar from "src/app/navbar/navbar.js";
import { Formik, Form, Field, ErrorMessage } from 'formik';


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
interface Rank {
    rankID: number,
    rankName: string,
}

interface Trainer {
    trainerID: number;
    nameEng: string;
}

interface Course {
    courseID: number,
    courseName: string,
}

let cnt_td = 0;
let cnt_tt = 0;

const changeCntT = () => {
    cnt_td = cnt_td + 1;
    cnt_tt = cnt_tt + 1;
    console.log("t" + cnt_td, cnt_tt);
}

let cnt_cd = 0;
let cnt_ct = 0;

const changeCntC = () => {
    cnt_cd = cnt_cd + 1;
    cnt_ct = cnt_ct + 1;
    console.log("c" + cnt_cd, cnt_ct);
}




const initialValues = {
    nameEng: '',
    nameTh: '',
    rankID: '',
    point: '',
    cID: '',
    phone: '',
    email: '',
    address: '',

    profilePic: '',

    drugAllergy: 'None',
    congenitalDisease: 'None',
    emergencyContact: '',

    trainerID: '',
    day_t: '',
    time_t: '',

    courseID: '',
    day_c: '',
    time_c: '',

}

export default function createMember() {
    const [memberData, setMemberData] = useState<Member | null>(null);

    const [rankData, setRankData] = useState<Rank | null>(null);

    const [trainerData, setTrainerData] = useState<Trainer | null>(null);
    const [courseData, setCourseData] = useState<Course | null>(null);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

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

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    if (!rankData) {
        return <div>No data to display.</div>;
    }



    const ranks = JSON.parse(JSON.stringify(rankData));
    const trainers = JSON.parse(JSON.stringify(trainerData));
    const courses = JSON.parse(JSON.stringify(courseData));




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
                        <div className=" bg-black w-full h-full">
                            <div className="grid place-items-center  font-AzeretMono">
                                <div className="rounded-3xl m-6 w-9/12 pb-6 text-black bg-[#D9D9D9]">
                                    <div className="rounded-3xl rounded-b-none  w-full h-[95px] text-black bg-[#FFFFFF]">
                                        {/* ก้อน1 */}
                                        <div className="flex flex-row ">
                                            <div className="basis-5/6 flex justify-start ... ">
                                                <img className=" rounded-full w-36 h-36 m-6 border-8 border-[#FFFFFF] " />
                                                <div>
                                                    <div className="grid pt-24 ">
                                                        <span className="font-semibold text-4xl mt-2 w-full">
                                                            <Field type="string" name="profilePic"
                                                                className="font-semibold text-xl rounded-md block w-full" required
                                                                placeholder="www.memberPicture.com"
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

                                    {/* ก้อน2 */}
                                    <p className="ml-32  mt-28 text-base">Member information</p>
                                    <hr className="ml-20 mr-20 my-3 bg-[#000000]  " />
                                    <div className="flex flex-row mb-6">
                                        <div className="basis-1/2 mr-10">
                                            <div className="grid ml-32 ">

                                                <label htmlFor="first-name" className="font-light text-base">Name(Eng)</label>
                                                <div className="mt-2">
                                                    <Field type="string" name="nameEng"
                                                        className="font-semibold text-xl rounded-md block w-full" required
                                                    />
                                                </div>


                                                <label htmlFor="first-name" className="font-light text-base mt-2">Name(TH)</label>
                                                <div className="mt-2">
                                                    <Field type="string" name="nameTh"
                                                        className="font-semibold text-xl rounded-md block w-full" required
                                                    />
                                                </div>


                                                <label htmlFor="first-name" className="font-light text-base mt-2">Rank</label>
                                                <div className="mt-2">
                                                    <Field type="string" name="rank" as="select" className="font-semibold text-xl rounded-md block w-full" required>
                                                        {ranks.map((rank: Rank) => (
                                                            <option value={rank.rankID}>{rank.rankName}</option>
                                                        ))}
                                                    </Field>
                                                </div>

                                                <label htmlFor="first-name" className="font-light text-base mt-2">Point</label>
                                                <div className="mt-2">
                                                    <Field type="number" name="point"
                                                        className="font-semibold text-xl rounded-md block w-full" required
                                                    />
                                                </div>

                                            </div>
                                        </div>

                                        <div className="basis-1/2 ">
                                            <div className="grid mr-32">

                                                <label htmlFor="first-name" className="font-light text-base ">Citizen ID</label>
                                                <div className="mt-2">
                                                    <Field type="string" name="cID"
                                                        className="font-semibold text-xl rounded-md block w-full " required
                                                    />
                                                </div>

                                                <label htmlFor="first-name" className="font-light text-base mt-2">Phone number</label>
                                                <div className="mt-2">
                                                    <Field type="string" name="phone"
                                                        className="font-semibold text-xl rounded-md block w-full" required
                                                    />
                                                </div>

                                                <label htmlFor="first-name" className="font-light text-base mt-2">Email</label>
                                                <div className="mt-2">
                                                    <Field type="email" name="email"
                                                        className="font-semibold text-xl rounded-md block w-full" required
                                                    />
                                                </div>

                                                <label htmlFor="first-name" className="font-light text-base mt-2">Address</label>
                                                <div className="mt-2">
                                                    <Field type="string" name="address" as="textarea"
                                                        rows={2}
                                                        className="font-semibold text-xl rounded-md block w-full" required
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
                                                            <Field type="string" name="drugAllergy"
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
                                                            <Field type="string" name="congenitalDisease"
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
                                                            <Field type="string" name="emergencyContact"
                                                                className="font-semibold text-xl rounded-md block w-full" required
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
                                                    <div className="basis-1/2 ">
                                                        <div>
                                                            <div className="grid ml-20">
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
                                                    <div className="basis-1/4 flex justify-center ... ">
                                                        <div>
                                                            <div className="grid  ">
                                                                <label htmlFor="first-name" className="font-light text-base ">Days</label>
                                                                <div className="mt-2 ">
                                                                    <Field type="string" name={`day_t[${cnt_td}]`} as="select" className="font-semibold text-xl rounded-md block w-full" required>

                                                                        <option value="Sunday" className="font-semibold text-xl w-full">Sunday</option>
                                                                        <option value="Monday" className="font-semibold text-xl w-full">Monday</option>
                                                                        <option value="Tuesday" className="font-semibold text-xl w-full">Tuesday</option>
                                                                        <option value="Wednesday" className="font-semibold text-xl w-full">Wednesday</option>
                                                                        <option value="Thrusday" className="font-semibold text-xl w-full">Thrusday</option>
                                                                        <option value="Friday" className="font-semibold text-xl w-full">Friday</option>
                                                                        <option value="Saturday" className="font-semibold text-xl w-full">Saturday</option>
                                                                    </Field>

                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="basis-1/4 flex justify-center ...">
                                                        <div>
                                                            <div className="grid ">
                                                                <label htmlFor="first-name" className="font-light text-base ">Time</label>
                                                                <div className="mt-2 mr-5">
                                                                    <Field type="string" name={`time_t[${cnt_tt}]`} as="select" className="font-semibold text-xl rounded-md block w-full" required>

                                                                        <option value="10-11" className="font-semibold text-xl w-full">10-11</option>
                                                                        <option value="11-12" className="font-semibold text-xl w-full">11-12</option>
                                                                        <option value="12-13" className="font-semibold text-xl w-full">12-13</option>
                                                                        <option value="13-14" className="font-semibold text-xl w-full">13-14</option>
                                                                        <option value="14-15" className="font-semibold text-xl w-full">14-15</option>
                                                                        <option value="15-16" className="font-semibold text-xl w-full">15-16</option>
                                                                        <option value="16-17" className="font-semibold text-xl w-full">16-17</option>
                                                                        <option value="17-18" className="font-semibold text-xl w-full">17-18</option>
                                                                        <option value="18-19" className="font-semibold text-xl w-full">18-19</option>
                                                                        <option value="19-20" className="font-semibold text-xl w-full">19-20</option>
                                                                    </Field>

                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="flex flex-row  ">
                                                    <div className="basis-1/2 " />
                                                    <div className="basis-1/2  " >
                                                        <div className=" mt-3 mr-5">
                                                            <button type="submit" onClick={changeCntT} className=" text-black bg-[#FFFFFF]  rounded-md  w-full flex justify-center " >+</button>
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
                                                                 <label htmlFor="first-name" className="font-light text-base ">Name</label>
                                                                <div className="mt-2 ">
                                                                    <Field type="number" name="courseID" as="select" className="font-semibold text-xl rounded-md block w-full" required>
                                                                        {courses?.map((co: Course) => (
                                                                            <option value={co.courseID}>{co.courseName}</option>
                                                                        ))}
                                                                    </Field>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="basis-1/3 flex justify-start ... ">
                                                        <div>
                                                            <div className="grid  ">
                                                                <label htmlFor="first-name" className="font-light text-base ">Days</label>
                                                                <div className="mt-2">
                                                                    <Field type="string" name={`day_c[${cnt_cd}]`} as="select" className="font-semibold text-xl rounded-md block w-full" required>

                                                                        <option value="Sunday" className="font-semibold text-xl w-full">Sunday</option>
                                                                        <option value="Monday" className="font-semibold text-xl w-full">Monday</option>
                                                                        <option value="Tuesday" className="font-semibold text-xl w-full">Tuesday</option>
                                                                        <option value="Wednesday" className="font-semibold text-xl w-full">Wednesday</option>
                                                                        <option value="Thrusday" className="font-semibold text-xl w-full">Thrusday</option>
                                                                        <option value="Friday" className="font-semibold text-xl w-full">Friday</option>
                                                                        <option value="Saturday" className="font-semibold text-xl w-full">Saturday</option>
                                                                    </Field>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="basis-1/3 ">
                                                        <div>
                                                            <div className="grid ">
                                                                <label htmlFor="first-name" className="font-light text-base ">Time</label>
                                                                <div className="mt-2 mr-14">
                                                                    <Field type="string" name={`time_c[${cnt_ct}]`} as="select" className="font-semibold text-xl rounded-md block w-full" required>

                                                                        <option value="10-11" className="font-semibold text-xl w-full">10-11</option>
                                                                        <option value="11-12" className="font-semibold text-xl w-full">11-12</option>
                                                                        <option value="12-13" className="font-semibold text-xl w-full">12-13</option>
                                                                        <option value="13-14" className="font-semibold text-xl w-full">13-14</option>
                                                                        <option value="14-15" className="font-semibold text-xl w-full">14-15</option>
                                                                        <option value="15-16" className="font-semibold text-xl w-full">15-16</option>
                                                                        <option value="16-17" className="font-semibold text-xl w-full">16-17</option>
                                                                        <option value="17-18" className="font-semibold text-xl w-full">17-18</option>
                                                                        <option value="18-19" className="font-semibold text-xl w-full">18-19</option>
                                                                        <option value="19-20" className="font-semibold text-xl w-full">19-20</option>
                                                                    </Field>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="flex flex-row  ">
                                                    <div className="basis-1/3 " />
                                                    <div className="basis-2/3  " >
                                                        <div className=" mt-3 mr-14">
                                                            <button type="submit" onClick={changeCntC} className=" text-black bg-[#FFFFFF]  rounded-md  w-full flex justify-center " >+</button>
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
