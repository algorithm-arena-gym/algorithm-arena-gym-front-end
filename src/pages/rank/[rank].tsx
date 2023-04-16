import Navbar from "@/app/navbar/navbar";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import 'src/app/globals.css';
import TabNavbar from "src/app/navbar/navbar.js";
import member from "../member";

interface Rank {
    rankID: number;
    rankPic: string;
    rankName: string;
    rankDetail: string;
    rankPrice: number;
    createAt: Date;
}

export default function RankDetail() {
    const router = useRouter();
    const [rankData, setRankData] = useState<Rank | null>(null);
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

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    if (!rankData) {
        return <div>No data to display.</div>;
    }

    return (
        <div>
            <div>
                <TabNavbar />
            </div>

            <div className=" bg-black w-full h-screen">
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
                                        <button className="bg-[#FCD34D] rounded-md border-black h-10 p-2 mt-5 mr-5 font-semibold text-base pl-4 pr-4"> EDIT</button>
                                        <button className="bg-[#EF4444]  rounded-md h-10 p-2 mt-5 mr-5 font-semibold text-white-base" >DELETE</button>
                                    </div>
                                </div>
                            </div>
                        </div>


                        {/* ก้อน2 */}
                        <div>
                            <p className="ml-32 mt-48 ">Information</p>
                            <hr className="ml-20 mr-20 my-3 bg-[#000000]  " />
                            <span className="font-light text-base ml-32">{rankData.rankDetail}</span>
                        </div>

                        {/* ก้อน3 */}
                        <div>
                            <div className="flex flex-row mb-6 ">
                                <div className="basis-1/2 ">
                                    <p className="ml-32  mt-8 text-base">Member in this rank</p>
                                    <hr className="ml-20 mr-10 my-3 bg-[#000000]" />
                                    <div>
                                        <div className="grid ">
                                            <span className="font-semibold text-xl ml-32 ">ดึงname</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="basis-1/2">
                                    <p className="  ml-10 mt-8 text-base">Course in this rank</p>
                                    <hr className=" mr-20 my-3 bg-[#000000]" />
                                    <div>
                                        <div className="grid ">
                                            <span className="font-semibold text-xl ml-10 ">ดึงcourse</span>
                                        </div>
                                    </div>
                                </div>



                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
