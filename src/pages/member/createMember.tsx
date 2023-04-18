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

    drugAllergy: '',
    congenitalDisease: '',
    emergencyContact: '',

    trainerID: '',
    day: '',
    time: '',

    courseID: '',

}

export default function createMember() {
    const [rankData, setRankData] = useState<Rank | null>(null);
    const [trainerData, setTrainerData] = useState<Trainer | null>(null);
    const [courseData, setCourseData] = useState<Course | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchRankData() {
            setLoading(true);
            try {
                const res = await fetch('http://localhost:4000/rank');
                const json = await res.json();
                setRankData(json[0]);
                setError(null);

                // console.error(json);


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
                setTrainerData(json2[0]);
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
                const res3 = await fetch('http://localhost:4000/rank');
                const json3 = await res3.json();
                setCourseData(json3[0]);
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

    // const ranks = JSON.parse(JSON.stringify(rankData));


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
                                            <div className="basis-5/6 flex justify-start ...">
                                                <img className=" rounded-full w-36 h-36 m-6 border-8 border-[#FFFFFF] " />
                                                <div>
                                                    <div className="grid pt-24 ">
                                                        <span className="font-semibold text-4xl">Untitled Member</span>
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
                                                        className="font-semibold text-xl rounded-md block w-full"  required
                                                    />
                                                </div>


                                                <label htmlFor="first-name" className="font-light text-base mt-2">Name(TH)</label>
                                                <div className="mt-2">
                                                    <Field type="string" name="nameTh"
                                                        className="font-semibold text-xl rounded-md block w-full"  required
                                                    />
                                                </div>


                                                <label htmlFor="first-name" className="font-light text-base mt-2">Rank</label>
                                                <div className="mt-2">
                                                    <Field type="string" name="rank" as="select"  className="font-semibold text-xl rounded-md block w-full"  required>

                                                    <option value="ที่มี"  className="font-semibold text-xl w-full">ที่มี</option>
                                                    <option value={rankData?.rankName}>{rankData?.rankName}</option>
                                                    </Field>




                                                </div>

                                                <label htmlFor="first-name" className="font-light text-base mt-2">Point</label>
                                                <div className="mt-2">
                                                    <Field type="number" name="point"
                                                        className="font-semibold text-xl rounded-md block w-full"  required
                                                    />
                                                </div>

                                            </div>
                                        </div>

                                        <div className="basis-1/2 ">
                                            <div className="grid mr-32">

                                                <label htmlFor="first-name" className="font-light text-base ">Citizen ID</label>
                                                <div className="mt-2">
                                                    <Field type="string" name="cID"
                                                        className="font-semibold text-xl rounded-md block w-full "  required
                                                    />
                                                </div>

                                                <label htmlFor="first-name" className="font-light text-base mt-2">Phone number</label>
                                                <div className="mt-2">
                                                    <Field type="string" name="phone"
                                                        className="font-semibold text-xl rounded-md block w-full"  required
                                                    />
                                                </div>

                                                <label htmlFor="first-name" className="font-light text-base mt-2">Email</label>
                                                <div className="mt-2">
                                                    <Field type="email" name="email"
                                                        className="font-semibold text-xl rounded-md block w-full"  required
                                                    />
                                                </div>

                                                <label htmlFor="first-name" className="font-light text-base mt-2">Address</label>
                                                <div className="mt-2">
                                                    <Field type="string" name="address" as="textarea"
                                                        rows={2}
                                                        className="font-semibold text-xl rounded-md block w-full"  required
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
                                                                className="font-semibold text-xl rounded-md block w-full"
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


                    </Form>
                )}
            </Formik>

        </div>


    );
}
