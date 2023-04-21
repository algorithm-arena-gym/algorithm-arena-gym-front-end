import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import 'src/app/globals.css';
import TabNavbar from "src/app/navbar/navbar.js";


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
    trainingDate: string;
    trainingTime: string;

}

interface Course {
    courseID: number,
    courseName: string,
}

export default function RankDetail() {
    const router = useRouter();
    const [rankData, setRankData] = useState<Rank | null>(null);

    const [memberData, setMemberData] = useState<Member | null>(null);
    const [courseData, setCourseData] = useState<Course | null>(null);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchData() {
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

        fetchData();
    }, [router.query.rank]);

    useEffect(() => {
        async function fetchMemberData() {
            try {
                const rankID = rankData?.rankID as number;
                const apiURL3 = `http://localhost:4000/pr-member/${rankID}`;
                const res3 = await fetch(apiURL3);
                const json3 = await res3.json();
                setMemberData(json3);
                setError(null);
            } catch (error) {
                console.error(error);
                setError("An error occurred while fetching the memberData.");
                setMemberData(null);
            }
        }
        if (rankData) {
            setLoading(true);
            setError(null);
            fetchMemberData();
            setLoading(false);
        }
    }, [rankData]);

    useEffect(() => {
        async function fetchCourseData() {
            try {
                const rankID = rankData?.rankID as number;
                const apiURL4 = `http://localhost:4000/pr-course/${rankID}`;
                const res4 = await fetch(apiURL4);
                const json4 = await res4.json();
                setCourseData(json4);
                setError(null);
            } catch (error) {
                console.error(error);
                setError("An error occurred while fetching the CourseData.");
                setCourseData(null);
            }
        }
        if (rankData) {
            setLoading(true);
            setError(null);
            fetchCourseData();
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
        return <div>
            <div>
                <TabNavbar />
            </div>
            <p className="font-AzeretMono font-semibold">No rankData to display.</p>
        </div>;
    }


    const listMember = memberData?.map((mem: Member) => {
        return (
            <div>
                <div className="grid ml-10">
                    <span className="font-semibold text-xl ">{mem.nameEng}</span>
                </div>
            </div>
        )
    });

    const listCourse = courseData?.map((co: Course) => {
        return (
            <div>
                <div className="grid ml-32">
                    <span className="font-semibold text-xl  ">{co.courseName}</span>
                </div>
            </div>


        )
    });

    const onDelete = async (rankID: any) => {
        try {
            let response = await fetch(`http://localhost:4000/rank/${rankID}`, {
                headers: {
                    "Contene-Type": "application/json",
                },
                method: "DELETE",
            })

        } catch (error) {
            console.log("An error occured while deleting rank", error);
        }

    };

    return (
        <div>
            <div>
                <TabNavbar />
            </div>

            <div className=" bg-black w-full h-full">
                <div className="grid place-items-center  font-AzeretMono">
                    <div className="rounded-3xl m-12 w-9/12 pb-6 text-black bg-[#D9D9D9]">
                        <div className="rounded-3xl rounded-b-none  w-full h-[75px] text-black bg-[#FFFFFF]">

                            {/* ก้อน1 */}
                            <div >
                                <div className="flex flex-row ">
                                    <div className="basis-5/6 flex justify-start ...">
                                        <img className=" rounded-3xl w-1/3 h-48 m-10 border-8 border-[#FFFFFF] " src={rankData.rankPic} />
                                        <div>
                                            <div className="grid pt-20 ">
                                                <span className="font-semibold text-5xl">{rankData.rankName}</span>
                                                <span className="font-light text-4xl" >ID : {rankData.rankID}</span>
                                                <span className="font-light text-4xl mb-24" >PRICE : {rankData.rankPrice}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="basis-1/6 flex justify-end ...mr-10">
                                        <Link href={`/rank/editRank/${rankData.rankID}`}>
                                            <button className="bg-[#FCD34D] rounded-md border-black h-10 p-2 mt-5 mr-5 font-semibold text-base pl-4 pr-4"> EDIT</button>
                                        </Link>
                                        <button className="bg-[#EF4444]  rounded-md h-10 p-2 mt-5 mr-5 font-semibold text-white-base"
                                            onClick={() => onDelete(rankData.rankID)}>DELETE</button>
                                    </div>
                                </div>
                            </div>
                        </div>


                        {/* ก้อน2 */}
                        <div>
                            <p className="ml-32 mt-48 ">Rank Information</p>
                            <hr className="ml-20 mr-20 my-3 bg-[#000000]  " />
                            <span className="font-light text-base ml-32">{rankData.rankDetail}</span>
                        </div>

                        {/* ก้อน3 */}
                        <div>
                            <div className="flex flex-row mb-6 ">
                                <div className="basis-1/2 ">
                                    <p className="ml-32  mt-8 text-base">Course in this rank</p>
                                    <hr className="ml-20 mr-10 my-3 bg-[#000000]" />
                                   {listCourse}
                                </div>
                                <div className="basis-1/2">
                                    <p className="  ml-10 mt-8 text-base"> Member in this rank</p>
                                    <hr className=" mr-20 my-3 bg-[#000000]" />
                                    
                                    {listMember}
                                </div>



                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
