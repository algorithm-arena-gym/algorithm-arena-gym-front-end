import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import 'src/app/globals.css';
import TabNavbar from "src/app/navbar/navbar.js";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

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

interface Member {
    memberID: number;
    nameEng: string;

}

interface Course {
    courseID: number,
    courseName: string,
}

interface TrainerMember {
    memberID: number;
    nameEng: string;

    trainerMemberID: number;


    trainerID: number;
    trainingDate: string;
    trainingTime: string;


}

const validationSchema = Yup.object({
    nameEng: Yup.string().required('Required'),
    nameTh: Yup.string().required('Required'),

    cID: Yup.string().required('Required'),
    phone: Yup.string().required('Required'),
    email: Yup.string().email('Invalid email').required('Required'),
    address: Yup.string().required('Required'),

    profilePic: Yup.string().required('Required'),

    emergencyContact: Yup.string().required('Required'),
});


const updateValues = {
    nameEng: null,
    nameTh: null,
    cID: null,
    phone: null,
    email: null,
    address: null,

    profilePic: null,

    drugAllergy: null,
    congenitalDisease: null,
    emergencyContact: null,

    memberID: null,
    day_m1: null,
    day_m2: null,
    day_m3: null,

    time_m1: null,
    time_m2: null,
    time_m3: null,

    courseID: null,


}


export default function TrainerEdit() {
    const router = useRouter();
    const [trainerData, setTrainerData] = useState<Trainer | null>(null);

    const [memberData, setMemberData] = useState<Member | null>(null);
    const [courseData, setCourseData] = useState<Course | null>(null);

    const [trainerMemberData, setTrainerMemberData] = useState<TrainerMember | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);


    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchTrainerData() {
            setLoading(true);
            try {
                const trainerID = router.query.trainer as string;
                const apiURL = `http://localhost:4000/trainer/${trainerID}`;
                const res = await fetch(apiURL);
                const json = await res.json();
                setTrainerData(json[0]);
                setError(null);
            } catch (error) {
                console.error(error);
                setError("An error occurred while fetching the data.");
                setTrainerData(null);
            }
            setLoading(false);
        }

        fetchTrainerData();
    }, [router.query.trainer]);

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
        async function fetchTrainerMemberData() {
            try {
                const trainerID = trainerData?.trainerID as number;
                const apiURL2 = `http://localhost:4000/pt-member/${trainerID}`;
                const res2 = await fetch(apiURL2);
                const json2 = await res2.json();
                setTrainerMemberData(json2);
                setError(null);

                // console.log(json2);

            } catch (error) {
                console.error(error);
                setError("An error occurred while fetching the rankData.");
                setTrainerMemberData(null);
            }
        }
        if (trainerData) {
            setLoading(true);
            setError(null);
            fetchTrainerMemberData();
            setLoading(false);
        }
    }, [trainerData]);



    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    if (!trainerData) {
        return <div>No data to display.</div>;
    }


    const members = JSON.parse(JSON.stringify(memberData));
    const courses = JSON.parse(JSON.stringify(courseData));
    const trainerMemberOld = JSON.parse(JSON.stringify(trainerMemberData));

    const listTrainerMemberID: number[] = [];
    const listTMname: String[] = [];
    const listMemberID: number[] = [];

    const dayM1: String[] = [];
    const dayM2: String[] = [];
    const dayM3: String[] = [];

    const timeM1: String[] = [];
    const timeM2: String[] = [];
    const timeM3: String[] = [];

    trainerMemberOld?.map((tm: TrainerMember) => {


        if (listTrainerMemberID.indexOf(tm.trainerMemberID) == -1 && listTMname.indexOf(tm.nameEng) == -1) {
            listTrainerMemberID.push(tm.trainerMemberID);
            listTMname.push(tm.nameEng);
        }
        if (listMemberID.indexOf(tm.memberID) == -1)
            listMemberID.push(tm.memberID)
    });


    trainerMemberOld?.map((tm: TrainerMember) => {
        if (listMemberID[0] == tm.memberID) {
            dayM1.push(tm.trainingDate);
            timeM1.push(tm.trainingTime)
        } else if (listMemberID[1] == tm.memberID) {
            dayM2.push(tm.trainingDate);
            timeM2.push(tm.trainingTime)
        } else if (listMemberID[2] == tm.memberID) {
            dayM3.push(tm.trainingDate);
            timeM3.push(tm.trainingTime)
        }
    }
    );

    console.log(listTrainerMemberID);










    const onSubmit = async (values: any, { setSubmitting }: any) => {
        console.log(values);
        try {
            const trainerID = trainerData?.trainerID as number;

            const response1 = await fetch(`http://localhost:4000/trainer/${trainerID}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    "nameEng": values.nameEng,
                    "nameTh": values.nameTh,
                    "profilePic": values.profilePic,
                    "phone": values.phone,
                    "email": values.email,
                    "cID": values.cID,
                    "drugAllergy": values.drugAllergy,
                    "congenitalDisease": values.congenitalDisease,
                    "address": values.address,
                    "emergencyContact": values.emergencyContact,
                }),
            });
            const data1 = await response1.json();
            // console.log(data1);


            const apiTrainerID = data1.insertId;
            // เพิ่ม member
            // if (values.memberID[0] != null) {
            //     for (let i = 0; i < values.day_m1.length; i++) {
            //         const res2 = await fetch(`http://localhost:4000/trainer-member`, {
            //             method: 'POST',
            //             headers: {
            //                 'Content-Type': 'application/json',
            //             },
            //             body: JSON.stringify({
            //                 "trainerID": trainerData.trainerID,
            //                 "memberID": values.memberID[0],
            //                 "trainingDate": values.day_m1[i],
            //                 "trainingTime": values.time_m1[i],
            //             }),
            //         });
            //         const data2 = await res2.json();
            //     }
            // }


            // if (values.memberID[1] != null) {
            //     for (let i = 0; i < values.day_m2.length; i++) {
            //         const res3 = await fetch(`http://localhost:4000/trainer-member`, {
            //             method: 'POST',
            //             headers: {
            //                 'Content-Type': 'application/json',
            //             },
            //             body: JSON.stringify({
            //                 "trainerID": trainerData.trainerID,
            //                 "memberID": values.memberID[1],
            //                 "trainingDate": values.day_m2[i],
            //                 "trainingTime": values.time_m2[i],
            //             }),
            //         });
            //         const data3 = await res3.json();
            //     }
            // }

            // if (values.memberID[2] != null) {
            //     for (let i = 0; i < values.day_m3.length; i++) {
            //         const res4 = await fetch(`http://localhost:4000/trainer-member`, {
            //             method: 'POST',
            //             headers: {
            //                 'Content-Type': 'application/json',
            //             },
            //             body: JSON.stringify({
            //                 "trainerID": trainerData.trainerID,
            //                 "memberID": values.memberID[2],
            //                 "trainingDate": values.day_m3[i],
            //                 "trainingTime": values.time_m3[i],
            //             }),
            //         });
            //         const data4 = await res4.json();
            //     }
            // }
            // memberไม่เปลี่ยน มีอยู่แล้ว
            // if (values.memberID[0] == null && values.day_m1 != null) {
            //     for (let i = 0; i < values.day_m1.length; i++) {
            //         const res2 = await fetch(`http://localhost:4000/trainer-member/${listTrainerMemberID[0]}`, {
            //             method: 'PATCH',
            //             headers: {
            //                 'Content-Type': 'application/json',
            //             },
            //             body: JSON.stringify({

            //                 "trainingDate": values.day_m1[i],
            //                 "trainingTime": values.time_m1[i],
            //             }),
            //         });
            //         const data2 = await res2.json();
            //     }
            // };
            // if (values.memberID[0] == null &&  values.day_m1 != null) { 
            //     for (let i = 0; i < values.day_m1.length; i++) {
            //         const res2 = await fetch(`http://localhost:4000/trainer-member/${listTrainerMemberID[1]}`, {
            //             method: 'PATCH',
            //             headers: {
            //                 'Content-Type': 'application/json',
            //             },
            //             body: JSON.stringify({

            //                 "trainingDate": values.day_m1[i],
            //                 "trainingTime": values.time_m1[i],
            //             }),
            //         });
            //         const data2 = await res2.json();
            //     }
            // };

            // if (values.memberID[1] == null && listTrainerMemberID[2] != null) {
            //     for (let i = 0; i < values.day_m2.length; i++) {
            //         const res3 = await fetch(`http://localhost:4000/trainer-member/${listTrainerMemberID[2]}`, {
            //             method: 'PATCH',
            //             headers: {
            //                 'Content-Type': 'application/json',
            //             },
            //             body: JSON.stringify({
            //                 "trainingDate": values.day_m2[i],
            //                 "trainingTime": values.time_m2[i],
            //             }),
            //         });
            //         const data3 = await res3.json();
            //     }
            // };
            //   if (values.memberID[1] == null && listTrainerMemberID[3] != null) {
            //     for (let i = 0; i < values.day_m2.length; i++) {
            //         const res3 = await fetch(`http://localhost:4000/trainer-member/${listTrainerMemberID[3]}`, {
            //             method: 'PATCH',
            //             headers: {
            //                 'Content-Type': 'application/json',
            //             },
            //             body: JSON.stringify({
            //                 "trainingDate": values.day_m2[i],
            //                 "trainingTime": values.time_m2[i],
            //             }),
            //         });
            //         const data3 = await res3.json();
            //     }
            // };

            // if (values.memberID[2] == null && listTrainerMemberID[4] != null) {
            //     for (let i = 0; i < values.day_m3.length; i++) {
            //         const res4 = await fetch(`http://localhost:4000/trainer-member/${listTrainerMemberID[4]}`, {
            //             method: 'PATCH',
            //             headers: {
            //                 'Content-Type': 'application/json',
            //             },
            //             body: JSON.stringify({
            //                 "trainingDate": values.day_m3[i],
            //                 "trainingTime": values.time_m3[i],
            //             }),
            //         });
            //         const data4 = await res4.json();
            //     }
            // };
            //  if (values.memberID[2] == null && listTrainerMemberID[5] != null) {
            //     for (let i = 0; i < values.day_m3.length; i++) {
            //         const res4 = await fetch(`http://localhost:4000/trainer-member/${listTrainerMemberID[5]}`, {
            //             method: 'PATCH',
            //             headers: {
            //                 'Content-Type': 'application/json',
            //             },
            //             body: JSON.stringify({
            //                 "trainingDate": values.day_m3[i],
            //                 "trainingTime": values.time_m3[i],
            //             }),
            //         });
            //         const data4 = await res4.json();
            //     }
            // };

            // memberเปลี่ยน
            // if (values.memberID[0] != null && listTrainerMemberID[0] != null) {

            //         for (let i = 0; i < values.day_m1.length; i++) {
            //             const res2 = await fetch(`http://localhost:4000/trainer-member/${listTrainerMemberID[0]}`, {
            //                 method: 'PATCH',
            //                 headers: {
            //                     'Content-Type': 'application/json',
            //                 },
            //                 body: JSON.stringify({
            //                     "memberID": values.memberID[0],
            //                     "trainingDate": values.day_m1[i],
            //                     "trainingTime": values.time_m1[i],
            //                 }),
            //             });
            //             const data2 = await res2.json();
            //         }

            // };

            // if (values.memberID[1] != null) {
            //     for (let i = 0; i < values.day_m2.length; i++) {
            //         const res3 = await fetch(`http://localhost:4000/trainer-member/${listTrainerMemberID[1]}`, {
            //             method: 'PATCH',
            //             headers: {
            //                 'Content-Type': 'application/json',
            //             },
            //             body: JSON.stringify({
            //                 "memberID": values.memberID[1],
            //                 "trainingDate": values.day_m2[i],
            //                 "trainingTime": values.time_m2[i],
            //             }),
            //         });
            //         const data3 = await res3.json();
            //     }
            // };

            // if (values.memberID[2] != null) {
            //     for (let i = 0; i < values.day_m3.length; i++) {
            //         const res4 = await fetch(`http://localhost:4000/trainer-member/${listTrainerMemberID[2]}`, {
            //             method: 'PATCH',
            //             headers: {
            //                 'Content-Type': 'application/json',
            //             },
            //             body: JSON.stringify({
            //                 "memberID": values.memberID[2],
            //                 "trainingDate": values.day_m3[i],
            //                 "trainingTime": values.time_m3[i],
            //             }),
            //         });
            //         const data4 = await res4.json();
            //     }
            // };

            //เคยมีเลย วันไม่เปลี่ยน
            if (values.memberID[0] != null && listTrainerMemberID[0] != null && values.day_m1 == null && values.time_m1 == null) {
                console.log(values.memberID[0]);
                 console.log(listTrainerMemberID[0]);
                const res2 = await fetch(`http://localhost:4000/trainer-member/${listTrainerMemberID[0]}`, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        "trainerID": trainerID,
                        "memberID": values.memberID[0],

                    }),
                });
                const data2 = await res2.json();

            }

            if (values.memberID[1] != null && listTrainerMemberID[1] != null && values.day_m2 == null && values.time_m2 == null) {
                console.log(values.memberID[1]);
                console.log(listTrainerMemberID[1]);
                
                const res3 = await fetch(`http://localhost:4000/trainer-member${listTrainerMemberID[1]}`, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        "trainerID": trainerID,
                        "memberID": values.memberID[1],
                    }),
                });
                const data3 = await res3.json();

            }

            if (values.memberID[2] != null && listTrainerMemberID[2] != null && values.day_m3 == null && values.time_m3 == null) {
                console.log(values.memberID[2]);

                const res4 = await fetch(`http://localhost:4000/trainer-member${listTrainerMemberID[2]}`, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        "trainerID": trainerID,
                        "memberID": values.memberID[2],

                    }),
                });
                const data4 = await res4.json();

            }
            //ไม่เคยมีเลย
             if (values.memberID[0] != null) {
                for (let i = 0; i < values.day_m1.length; i++) {

                    const res2 = await fetch(`http://localhost:4000/trainer-member`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            "trainerID": trainerID,
                            "memberID": values.memberID[0],
                            "trainingDate": values.day_m1[i],
                            "trainingTime": values.time_m1[i],
                        }),
                    });
                    const data2 = await res2.json();
                }
            }

             if (values.memberID[1] != null) {
                for (let i = 0; i < values.day_m2.length; i++) {
                    const res3 = await fetch(`http://localhost:4000/trainer-member`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            "trainerID": trainerID,
                            "memberID": values.memberID[1],
                            "trainingDate": values.day_m2[i],
                            "trainingTime": values.time_m2[i],
                        }),
                    });
                    const data3 = await res3.json();
                }
            }

             if (values.memberID[2] != null) {
                console.log(values.memberID[2]);
                for (let i = 0; i < values.day_m3.length; i++) {
                    const res4 = await fetch(`http://localhost:4000/trainer-member`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            "trainerID": trainerID,
                            "memberID": values.memberID[2],
                            "trainingDate": values.day_m3[i],
                            "trainingTime": values.time_m3[i],
                        }),
                    });
                    const data4 = await res4.json();
                }
            }


            // if (response1.ok)
            setSuccessMessage('Form Trainer submitted successfully!');
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
                initialValues={updateValues}
                // validationSchema={validationSchema}
                onSubmit={onSubmit}
            // onSubmit={(values, action) => {
            //     console.log(values)
            // }}
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
                                                <img className=" rounded-full w-36 h-36 m-6 border-8 border-[#FFFFFF] " src={trainerData?.profilePic} />
                                                <div>
                                                    <div className="grid pt-24 ">
                                                        <Field type="string" name="profilePic"
                                                            className="font-semibold text-xl rounded-md block w-full"
                                                            placeholder={trainerData?.profilePic}
                                                        />
                                                        <span className="font-light text-3xl pb-24" >ID : {trainerData?.trainerID}</span>
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
                                        <div className="basis-1/2 flex justify-start ...">
                                            <div className="grid ml-32 ">

                                                <label className="font-light text-base">Name(Eng)</label>
                                                <div className="mt-2">
                                                    <Field type="string" name="nameEng"
                                                        className="font-semibold text-xl rounded-md block w-full"
                                                        placeholder={trainerData?.nameEng}
                                                    />
                                                </div>

                                                <label className="font-light text-base ">Name(TH)</label>
                                                <div className="mt-2">
                                                    <Field type="string" name="nameTh"
                                                        className="font-semibold text-xl rounded-md block w-full"
                                                        placeholder={trainerData?.nameTh}
                                                    />
                                                </div>

                                                <label className="font-light text-base  ">Citizen ID</label>
                                                <div className="mt-2">
                                                    <Field type="string" name="cID"
                                                        className="font-semibold text-xl rounded-md block w-full"
                                                        placeholder={trainerData?.cID}
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="basis-1/2 flex justify-start ...">
                                            <div className="grid ">


                                                <label className="font-light text-base ">Phone number</label>
                                                <div className="mt-8">
                                                    <Field type="string" name="phone"
                                                        className="font-semibold text-xl rounded-md block w-full"
                                                        placeholder={trainerData?.phone}
                                                    />
                                                </div>

                                                <label className="font-light text-base mt-6">Email</label>
                                                <div className="mt-8">
                                                    <Field type="email" name="email"
                                                        className="font-semibold text-xl rounded-md block w-full"
                                                        placeholder={trainerData?.email}
                                                    />
                                                </div>

                                                <label htmlFor="first-name" className="font-light text-base mt-6">Address</label>
                                                <div className="mt-8">
                                                    <Field type="string" name="address" as="textarea"
                                                        rows={2}
                                                        className="font-semibold text-xl rounded-md block w-full"
                                                        placeholder={trainerData?.address}
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
                                                                placeholder={trainerData?.drugAllergy}
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
                                                                placeholder={trainerData?.congenitalDisease}
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
                                                                placeholder={trainerData?.emergencyContact}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* ก้อน4 */}

                                    <div>

                                        <p className="ml-32  mt-8 text-base">Trainee Information</p>
                                        <hr className="ml-20 mr-20 my-3 bg-[#000000]" />
                                        <div className="flex flex-row ">
                                            <div className="basis-1/2 ">
                                                <div>
                                                    <div className="grid ml-20">
                                                        <label htmlFor="first-name" className="font-light text-base ">Name</label>
                                                        <div className="mt-2 ">
                                                            <Field type="number" name={`memberID[0]`} as="select" className=" font-semibold text-xl rounded-md block w-full" >
                                                                <option className="font-semibold text text-xl w-full">{null ? null : listTMname[0]}</option>
                                                                {members?.map((mem: Member) => (
                                                                    <option value={mem.memberID} className="font-semibold">{mem.nameEng}</option>
                                                                ))}
                                                            </Field>

                                                            <Field type="number" name={`memberID[1]`} as="select" className="font-semibold text-xl rounded-md block w-full mt-12" >
                                                                <option className="font-semibold text-xl w-full">{null ? null : listTMname[1]}</option>
                                                                {members?.map((mem: Member) => (
                                                                    <option value={mem.memberID}>{mem.nameEng}</option>
                                                                ))}
                                                            </Field>
                                                            <Field type="number" name={`memberID[2]`} as="select" className="font-semibold text-xl rounded-md block w-full mt-12" >
                                                                <option className="font-semibold text-xl w-full">{null ? null : listTMname[2]}</option>
                                                                {members?.map((mem: Member) => (
                                                                    <option value={mem.memberID}>{mem.nameEng}</option>
                                                                ))}
                                                            </Field>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="basis-1/4 ml-10 mr-10">
                                                <div>
                                                    <div className="grid  ">
                                                        <label htmlFor="first-name" className="font-light text-base ">Days</label>
                                                        <div className="mt-2 ">
                                                            <Field type="string" name={`day_m1[0]`} as="select" className=" font-semibold text-xl rounded-md block w-full" required>
                                                                <option className="font-semibold text-xl w-full">{null ? null : dayM1[0]}</option>
                                                                <option value="null" className="font-semibold text-xl w-full">delete Day</option>
                                                                <option value="Sunday" className="font-semibold text-xl w-full">Sunday</option>
                                                                <option value="Monday" className="font-semibold text-xl w-full">Monday</option>
                                                                <option value="Tuesday" className="font-semibold text-xl w-full">Tuesday</option>
                                                                <option value="Wednesday" className="font-semibold text-xl w-full">Wednesday</option>
                                                                <option value="Thursday" className="font-semibold text-xl w-full">Thursday</option>
                                                                <option value="Friday" className="font-semibold text-xl w-full">Friday</option>
                                                                <option value="Saturday" className="font-semibold text-xl w-full">Saturday</option>
                                                            </Field>
                                                            <Field type="string" name={`day_m1[1]`} as="select" className="font-semibold text-xl rounded-md block w-full mt-3" >
                                                                <option className="font-semibold text-xl w-full">{null ? null : dayM1[1]}</option>
                                                                <option value="Sunday" className="font-semibold text-xl w-full">Sunday</option>
                                                                <option value="Monday" className="font-semibold text-xl w-full">Monday</option>
                                                                <option value="Tuesday" className="font-semibold text-xl w-full">Tuesday</option>
                                                                <option value="Wednesday" className="font-semibold text-xl w-full">Wednesday</option>
                                                                <option value="Thursday" className="font-semibold text-xl w-full">Thursday</option>
                                                                <option value="Friday" className="font-semibold text-xl w-full">Friday</option>
                                                                <option value="Saturday" className="font-semibold text-xl w-full">Saturday</option>
                                                            </Field>
                                                            <Field type="string" name={`day_m2[0]`} as="select" className="font-semibold text-xl rounded-md block w-full mt-3" >
                                                                <option className="font-semibold text-xl w-full">{null ? null : dayM2[0]}</option>
                                                                <option value="Sunday" className="font-semibold text-xl w-full">Sunday</option>
                                                                <option value="Monday" className="font-semibold text-xl w-full">Monday</option>
                                                                <option value="Tuesday" className="font-semibold text-xl w-full">Tuesday</option>
                                                                <option value="Wednesday" className="font-semibold text-xl w-full">Wednesday</option>
                                                                <option value="Thursday" className="font-semibold text-xl w-full">Thursday</option>
                                                                <option value="Friday" className="font-semibold text-xl w-full">Friday</option>
                                                                <option value="Saturday" className="font-semibold text-xl w-full">Saturday</option>
                                                            </Field>
                                                            <Field type="string" name={`day_m2[1]`} as="select" className="font-semibold text-xl rounded-md block w-full mt-3" >
                                                                <option className="font-semibold text-xl w-full"> {null ? null : dayM2[1]}</option>
                                                                <option value="Sunday" className="font-semibold text-xl w-full">Sunday</option>
                                                                <option value="Monday" className="font-semibold text-xl w-full">Monday</option>
                                                                <option value="Tuesday" className="font-semibold text-xl w-full">Tuesday</option>
                                                                <option value="Wednesday" className="font-semibold text-xl w-full">Wednesday</option>
                                                                <option value="Thursday" className="font-semibold text-xl w-full">Thursday</option>
                                                                <option value="Friday" className="font-semibold text-xl w-full">Friday</option>
                                                                <option value="Saturday" className="font-semibold text-xl w-full">Saturday</option>
                                                            </Field>
                                                            <Field type="string" name={`day_m3[0]`} as="select" className="font-semibold text-xl rounded-md block w-full mt-3" >
                                                                <option className="font-semibold text-xl w-full">{null ? null : dayM3[0]}</option>
                                                                <option value="Sunday" className="font-semibold text-xl w-full">Sunday</option>
                                                                <option value="Monday" className="font-semibold text-xl w-full">Monday</option>
                                                                <option value="Tuesday" className="font-semibold text-xl w-full">Tuesday</option>
                                                                <option value="Wednesday" className="font-semibold text-xl w-full">Wednesday</option>
                                                                <option value="Thursday" className="font-semibold text-xl w-full">Thursday</option>
                                                                <option value="Friday" className="font-semibold text-xl w-full">Friday</option>
                                                                <option value="Saturday" className="font-semibold text-xl w-full">Saturday</option>
                                                            </Field>
                                                            <Field type="string" name={`day_m3[1]`} as="select" className="font-semibold text-xl rounded-md block w-full mt-3" >
                                                                <option className="font-semibold text-xl w-full">{null ? null : dayM3[1]}</option>
                                                                <option value="Sunday" className="font-semibold text-xl w-full">Sunday</option>
                                                                <option value="Monday" className="font-semibold text-xl w-full">Monday</option>
                                                                <option value="Tuesday" className="font-semibold text-xl w-full">Tuesday</option>
                                                                <option value="Wednesday" className="font-semibold text-xl w-full">Wednesday</option>
                                                                <option value="Thursday" className="font-semibold text-xl w-full">Thursday</option>
                                                                <option value="Friday" className="font-semibold text-xl w-full">Friday</option>
                                                                <option value="Saturday" className="font-semibold text-xl w-full">Saturday</option>
                                                            </Field>


                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="basis-1/4 mr-20">
                                                <div>
                                                    <div className="grid ">
                                                        <label htmlFor="first-name" className="font-light text-base ">Time</label>
                                                        <div className="mt-2 mr-5">
                                                            <Field type="string" name={`time_m1[0]`} as="select" className="font-semibold text-xl rounded-md block w-full" required>
                                                                <option className="font-semibold text-xl w-full">{timeM1[0]}</option>
                                                                <option value="null" className="font-semibold text-xl w-full">delete Time</option>
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
                                                            <Field type="string" name={`time_m1[1]`} as="select" className="font-semibold text-xl rounded-md block w-full mt-3" >
                                                                <option className="font-semibold text-xl w-full">{timeM1[1]}</option>
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
                                                            <Field type="string" name={`time_m2[0]`} as="select" className="font-semibold text-xl rounded-md block w-full mt-3" >
                                                                <option className="font-semibold text-xl w-full">{timeM2[0]}</option>
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
                                                            <Field type="string" name={`time_m2[1]`} as="select" className="font-semibold text-xl rounded-md block w-full mt-3" >
                                                                <option className="font-semibold text-xl w-full">{timeM2[1]}</option>
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
                                                            <Field type="string" name={`time_m3[0]`} as="select" className="font-semibold text-xl rounded-md block w-full mt-3" >
                                                                <option className="font-semibold text-xl w-full">{timeM3[0]}</option>
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
                                                            <Field type="string" name={`time_m3[1]`} as="select" className="font-semibold text-xl rounded-md block w-full mt-3" >
                                                                <option className="font-semibold text-xl w-full">{timeM3[1]}</option>
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

                            </div>
                        </div>



                    </Form>
                )}
            </Formik>
        </div >
    );
}
