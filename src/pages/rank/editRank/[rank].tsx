import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import 'src/app/globals.css';
import TabNavbar from "src/app/navbar/navbar.js";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';



interface Rank {
    rankID: number;
    rankPic: string;
    rankName: string;
    rankDetail: string;
    rankPrice: number;

}

interface Member {
    memberID: number;
    nameEng: string;

}


interface Course {
    courseID: number,
    courseName: string,
}
interface CourseOld {
    rankCourseID: number,
    courseID: number,
    courseName: string,
}

// const validationSchema = Yup.object({

//     rankPic: Yup.string().required('Required'),
//     rankName: Yup.string().required('Required'),
//     rankDetail: Yup.string().required('Required'),
//     rankPrice: Yup.number().required('Required'),
// });



const updateValues = {

    rankPic: null ,
    rankName: null ,
    rankDetail: null ,
    rankPrice: null ,

    memberID: null ,

    courseID: [null, null, null]



}

export default function EditRank() {
    const router = useRouter();
    const [memberData, setMemberData] = useState<Member | null>(null);

    const [rankData, setRankData] = useState<Rank | null>(null);
    const [courseData, setCourseData] = useState<Course | null>(null);

    const [courseDataOld, setCourseDataOld] = useState<CourseOld | null>(null);

    const [successMessage, setSuccessMessage] = useState<string | null>(null);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchRankData() {
            setLoading(true);
            try {
                const rankID = router.query.rank as string;
                const apiURL = `http://localhost:4000/rank/${rankID}`;
                const res = await fetch(apiURL);
                const json = await res.json();
                setRankData(json[0]);
                setError(null);
            } catch (error) {
                console.error(error);
                setError("An error occurred while fetching the data.");
                setRankData(null);
            }
            setLoading(false);
        }

        fetchRankData();
    }, [router.query.rank]);

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
        async function fetchCourseDataOld() {
            setLoading(true);
            try {
                const rankID = rankData?.rankID as number;
                const apiURL3 = `http://localhost:4000/pr-course/${rankID}`;
                const res3 = await fetch(apiURL3);
                const json3 = await res3.json();
                setCourseDataOld(json3);
                setError(null);

                // console.error(json3);

            } catch (error) {
                console.error(error);
                setError("An error occurred while fetching the CourseDataOld.");
                setCourseData(null);
            }
        }
        if (rankData) {
            setLoading(true);
            setError(null);
            fetchCourseDataOld();
            setLoading(false);
        }
    }, [rankData]);

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
    const members = JSON.parse(JSON.stringify(memberData));
    const courses = JSON.parse(JSON.stringify(courseData));
    const coursesOld = JSON.parse(JSON.stringify(courseDataOld));


    const arrayCourseOld: string[] = [];
    const arrayRankCourseID: number[] = [];
    const cOld = coursesOld?.map((cod: CourseOld) => {
        arrayRankCourseID.push(cod.rankCourseID);
        arrayCourseOld.push(cod.courseName);
        console.log(arrayRankCourseID);
    });




    const onSubmit = async (values: any, { setSubmitting }: any) => {

        try {
           
            const rankID = rankData?.rankID as number;
            const response1 = await fetch(`http://localhost:4000/rank/${rankID}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    "rankName": values.rankName,
                    "rankPic": values.rankPic,
                    "rankDetail": values.rankDetail,
                    "rankPrice": values.rankPrice,
                }),
            });
        
            const data1 = await response1.json();
            console.log(values);
            


            const apiRankID = data1.insertId;
             for (let j = 0; j < values.courseID.length; j++) {
                
                if (values.courseID[j] != null && arrayRankCourseID[j] !=null) {
                    const response2 = await fetch(`http://localhost:4000/rank-course/${arrayRankCourseID[j]}`, {
                        method: 'PATCH',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            "rankID": rankID,
                            "courseID": values.courseID[j],
                        }),
                    });
                    const data2 = await response2.json();
                    // console.log(data2);

                }
                else if (values.courseID[j] != null ){
                    const response2 = await fetch(`http://localhost:4000/rank-course`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        "rankID": rankID,
                        "courseID": values.courseID[j],
                    }),
                });
                const data2 = await response2.json();
                // console.log(data2);

                }

            }
           
                setSuccessMessage('Form Rank editted successfully!');
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
                                                    <img className=" rounded-3xl w-1/3 h-48 m-10 border-8 border-[#FFFFFF] " src={rankData.rankPic} />
                                                    <div>
                                                        <div className="grid pt-24 ">
                                                            <span className="font-semibold text-5xl mt-2 w-full">
                                                                <Field type="string" name="rankPic"
                                                                    className="font-semibold text-xl rounded-md block w-full" 
                                                                    placeholder={rankData.rankPic}
                                                                />
                                                            </span>
                                                            <span className="font-light text-4xl" >ID : {rankData.rankID}</span>
                                                            <span className="font-light text-4xl mb-24" >PRICE : {rankData.rankPrice}</span>
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
                                        <p className="ml-32 mt-40 ">Rank Information</p>
                                        <hr className="ml-20 mr-20 my-3 bg-[#000000]  " />
                                        <div className="mt-2 ml-32 mr-32 ">
                                            <div className="mt-2">
                                                <Field type="string" name="rankDetail" as="textarea"
                                                    className="font-semibold text-xl rounded-md block w-full" 
                                                    placeholder={rankData.rankDetail}
                                                />

                                            </div>
                                        </div>

                                    </div>

                                    {/* ก้อน3*/}
                                    <div>
                                        <div className="flex flex-row mb-6 ">
                                            <div className="basis-1/2 ">
                                                <p className="ml-32  mt-8 text-base">Rank Name (ENG)</p>
                                                <hr className="ml-20 mr-10 my-3 bg-[#000000]" />
                                                <div>
                                                    <div className="grid ml-32 mr-10">
                                                        <div className="mt-2 ">
                                                            <Field type="string" name="rankName"
                                                                className="font-semibold text-xl rounded-md block w-full" 
                                                                placeholder={rankData.rankName}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="basis-1/2">
                                                <p className="  ml-10 mt-8 text-base">Rank Price</p>
                                                <hr className="  my-3 mr-20 bg-[#000000]" />
                                                <div>
                                                    <div className="grid ml-10 mr-20 ">
                                                        <div className="mt-2 ">
                                                            <Field type="number" name="rankPrice"
                                                                className="font-semibold text-xl rounded-md block w-full " 
                                                                placeholder={rankData.rankPrice}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>


                                    {/* ก้อน4*/}
                                    <div>
                                        <p className="  ml-32 mt-8 text-base">Course in this rank</p>
                                        <hr className=" ml-20 mr-20 my-3 bg-[#000000]" />
                                        <div>
                                            <div className="grid ">
                                                <div className="mt-2 ml-32 mr-32 my-3">
                                                    <Field type="number" name={`courseID[0]`} as="select" className="font-semibold text-xl rounded-md block w-full" >
                                                        <option className="font-semibold text-xl w-full">{arrayCourseOld[0]}</option>
                                                        {courses?.map((co: Course) => (
                                                            <option value={co.courseID}>{co.courseName}</option>
                                                        ))}
                                                         <option value= "null" className="font-semibold text-xl w-full">delete Rank</option>
                                                    </Field>
                                                    <Field type="number" name={`courseID[1]`} as="select" className="font-semibold text-xl rounded-md block w-full mt-3" >
                                                        <option className="font-semibold text-xl w-full">{null ? "Day" : arrayCourseOld[1]}</option>
                                                        {courses?.map((co: Course) => (
                                                            <option value={co.courseID}>{co.courseName}</option>
                                                        ))}
                                                    </Field>
                                                    <Field type="number" name={`courseID[2]`} as="select" className="font-semibold text-xl rounded-md block w-full mt-3" >
                                                        <option className="font-semibold text-xl w-full">{null ? "Day" : arrayCourseOld[2]}</option>
                                                        {courses?.map((co: Course) => (
                                                            <option value={co.courseID}>{co.courseName}</option>
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


