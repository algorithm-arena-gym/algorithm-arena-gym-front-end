import { useEffect, useState } from "react";
import 'src/app/globals.css';
import TabNavbar from "src/app/navbar/navbar.js";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

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
const validationSchema = Yup.object({

    rankPic: Yup.string().required('Required'),
    rankName: Yup.string().required('Required'),
    rankDetail: Yup.string().required('Required'),
    rankPrice: Yup.number().required('Required'),
});





const initialValues = {
    courseName: '',
    coursePic: '',
    detail: '',
    trainerID: '',

    rankID: '',

    day1: null,
    time1: '',

    day2: null,
    time2: '',

    day3: null,
    time3: '',



}

export default function CourseCreate() {
    const [courseData, setCourseData] = useState<Course | null>(null);
    const [trainerData, setTrainerData] = useState<Trainer | null>(null);
    const [memberData, setMemberData] = useState<Member | null>(null);
    const [rankData, setRankData] = useState<Rank | null>(null);

    const [successMessage, setSuccessMessage] = useState<string | null>(null);
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

                // console.error(json4);


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

    const handleSubmit = () => {
        // Your form submission logic here
        setSuccessMessage('Form submitted successfully!');
    };
   



    const onSubmit = async (values: any, { setSubmitting }: any) => {

        try {
            const response1 = await fetch(`http://localhost:4000/course`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    "courseName": values.courseName,
                    "coursePic": values.coursePic,
                    "detail": values.detail,
                    "trainerID": values.trainerID,
                }),
            });
            const data1 = await response1.json();
            console.log(values);


            const apiCourseID = data1.insertId;

            for (let j = 0; j < values.time1.length; j++) {
                const res3 = await fetch(`http://localhost:4000/course-date-time`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        "courseID": apiCourseID,
                        "courseDate": values.day1,
                        "courseTime": values.time1[j],
                    }),
                });
                const data3 = await res3.json();
                // console.log(data1);
            }

            for (let j = 0; j < values.time2.length; j++) {
                const res3 = await fetch(`http://localhost:4000/course-date-time`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        "courseID": apiCourseID,
                        "courseDate": values.day2,
                        "courseTime": values.time2[j],
                    }),
                });
                const data3 = await res3.json();
                // console.log(data1);
            }

            for (let j = 0; j < values.time3.length; j++) {
                const res3 = await fetch(`http://localhost:4000/course-date-time`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        "courseID": apiCourseID,
                        "courseDate": values.day3,
                        "courseTime": values.time3[j],
                    }),
                });
                const data3 = await res3.json();
                // console.log(data1);
            }

           

            const response3 = await fetch(`http://localhost:4000/rank-course`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    "rankID": values.rankID,
                    "courseID": apiCourseID,
                }),
            });
            const data3 = await response3.json();
            // console.log(data3);


            if (response1.ok && response3.ok)
                setSuccessMessage('Form Course submitted successfully!');
            // Do any other logic you need on successful form submission
        } catch (error) {
            console.log(error);
        } finally {
            setSubmitting(false);
        }
    };




    return (
        <div>
            <div>
                <TabNavbar />
            </div>

            {successMessage &&
                <p>{successMessage}</p>}

            <Formik
                initialValues={initialValues}
                // validationSchema={validationSchema}
                onSubmit={onSubmit}
            >

                {({ isSubmitting }) => (
                    <Form>
                        <div className=" bg-black w-full h-full">
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
                                            <Field type="string" name="courseName"
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
                                                <Field type="string" name="detail" as="textarea"

                                                    className="font-semibold text-xl rounded-md block w-full"
                                                />

                                            </div>
                                        </div>

                                    </div>

                                    {/* ก้อน4 */}
                                    <div>
                                        <p className="ml-32 mt-5">Available Days of The Week</p>
                                        <hr className="ml-20 mr-20 my-3 bg-[#000000]  " />
                                        <div className="ml-32 mr-32  ">
                                            <div className="flex flex-row ">
                                                <div className="basis-1/4 mr-2">
                                                    <div>
                                                        <div className="grid ">

                                                            <div className="mt-2 ">
                                                                <Field type="string" name="day1" as="select"
                                                                    className="font-semibold text-xl rounded-md block w-full " required>
                                                                    <option className="font-semibold text-xl w-full">Day</option>
                                                                    <option value="Sunday" className="font-semibold text-xl w-full">Sunday</option>
                                                                    <option value="Monday" className="font-semibold text-xl w-full">Monday</option>
                                                                    <option value="Tuesday" className="font-semibold text-xl w-full">Tuesday</option>
                                                                    <option value="Wednesday" className="font-semibold text-xl w-full">Wednesday</option>
                                                                    <option value="Thrusday" className="font-semibold text-xl w-full">Thrusday</option>
                                                                    <option value="Friday" className="font-semibold text-xl w-full">Friday</option>
                                                                    <option value="Saturday" className="font-semibold text-xl w-full">Saturday</option>
                                                                </Field>
                                                                <Field type="string" name="day2" as="select"
                                                                    className="font-semibold text-xl rounded-md block w-full mt-3" >
                                                                    <option className="font-semibold text-xl w-full">Day</option>
                                                                    <option value="Sunday" className="font-semibold text-xl w-full">Sunday</option>
                                                                    <option value="Monday" className="font-semibold text-xl w-full">Monday</option>
                                                                    <option value="Tuesday" className="font-semibold text-xl w-full">Tuesday</option>
                                                                    <option value="Wednesday" className="font-semibold text-xl w-full">Wednesday</option>
                                                                    <option value="Thrusday" className="font-semibold text-xl w-full">Thrusday</option>
                                                                    <option value="Friday" className="font-semibold text-xl w-full">Friday</option>
                                                                    <option value="Saturday" className="font-semibold text-xl w-full">Saturday</option>
                                                                </Field>
                                                                <Field type="string" name="day3" as="select"
                                                                    className="font-semibold text-xl rounded-md block w-full mt-3" >
                                                                    <option className="font-semibold text-xl w-full">Day</option>
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
                                                <div className="basis-1/4 mr-2">
                                                    <div>
                                                        <div className="grid  ">

                                                            <div className="mt-2 ">
                                                                <Field type="string" name={`time1[0]`} as="select"
                                                                    className="font-semibold text-xl rounded-md block w-full" required>
                                                                    <option className="font-semibold text-xl w-full">Time</option>
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
                                                                <Field type="string" name={`time2[0]`} as="select"
                                                                    className="font-semibold text-xl rounded-md block w-full mt-3" >
                                                                    <option className="font-semibold text-xl w-full">Time</option>
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
                                                                <Field type="string" name={`time3[0]`} as="select"
                                                                    className="font-semibold text-xl rounded-md block w-full mt-3" >
                                                                    <option className="font-semibold text-xl w-full">Time</option>
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
                                                <div className="basis-1/4  mr-2">
                                                    <div>
                                                        <div className="grid  ">

                                                            <div className="mt-2 ">
                                                                <Field type="string" name={`time1[1]`} as="select"
                                                                    className="font-semibold text-xl rounded-md block w-full" >
                                                                    <option className="font-semibold text-xl w-full">Time</option>
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
                                                                <Field type="string" name={`time2[1]`} as="select"
                                                                    className="font-semibold text-xl rounded-md block w-full mt-3" >
                                                                    <option className="font-semibold text-xl w-full">Time</option>
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
                                                                <Field type="string" name={`time3[1]`} as="select"
                                                                    className="font-semibold text-xl rounded-md block w-full mt-3" >
                                                                    <option className="font-semibold text-xl w-full">Time</option>
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
                                                <div className="basis-1/4  ">
                                                    <div>
                                                        <div className="grid ">
                                                            <div className="mt-2 mr-5">
                                                                <Field type="string" name={`time1[3]`} as="select"
                                                                    className="font-semibold text-xl rounded-md block w-full" >
                                                                    <option className="font-semibold text-xl w-full">Time</option>
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
                                                                <Field type="string" name={`time2[3]`} as="select"
                                                                    className="font-semibold text-xl rounded-md block w-full mt-3" >
                                                                    <option className="font-semibold text-xl w-full">Time</option>
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
                                                                <Field type="string" name={`time3[3]`} as="select"
                                                                    className="font-semibold text-xl rounded-md block w-full mt-3" >
                                                                    <option className="font-semibold text-xl w-full">Time</option>
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
                                        </div>
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
                                                        <option className="font-semibold text-xl w-full">Trainer</option>
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

                                        <p className="ml-32  mt-8 text-base">Rank Available</p>
                                        <hr className="ml-20 mr-20 my-3 bg-[#000000]" />
                                        <div>
                                            <div className="grid ml-32 mr-32 ">
                                                <div className="mt-2  ">
                                                    <Field type="number" name="rankID" as="select" className="font-semibold text-xl rounded-md block w-full" required>
                                                        <option className="font-semibold text-xl w-full">Rank</option>
                                                        {ranks?.map((rank: Rank) => (
                                                            <option value={rank.rankID}>{rank.rankName}</option>
                                                        ))}
                                                    </Field>
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