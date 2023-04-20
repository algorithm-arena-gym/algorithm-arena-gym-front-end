import TabNavbar from "src/app/navbar/navbar.js";
import DnChart from "src/pages/main/pie/pie.js";
import Dn2Chart from "src/pages/main/pie2/pie2.js";
import HorChart from "src/pages/main/horizon/horizon.js";
import BarChart from "src/pages/main/bar/bar.js";
import { useEffect, useState } from 'react';
import 'src/app/globals.css';



export default function Main() {

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);


    // dn1
    const [udData, setUdData] = useState({ datasets: [] });

    useEffect(() => {
        async function fetchData() {
            setLoading(true);

            try {
                const response = await fetch("http://localhost:4000/stat/3");
                const data = await response.json();
                const labels = data.map(d => String(d.courseID));
                const max = Math.max(...data.map(d => d.num_member));
                const datasets = [{ data: data.map(d => d.num_member), backgroundColor: data.map(d => d.num_member === max ? "#46FFBD" : "#252525"), borderColor: "#000000", },];

                setUdData({ labels, datasets });
                setError(null);
            } catch (error) {
                console.error("Error fetching data from API: ", error);
                setError("An error occurred while fetching the data.");
                setUdData({ datasets: [] });
            }

            setLoading(false);
        }

        fetchData();
    }, []);

    // dn2
    const [ud2Data, setUd2Data] = useState({ datasets: [] });

    useEffect(() => {
        async function fetch2Data() {
            setLoading(true);

            try {
                const response = await fetch("http://localhost:4000/stat/4");
                const data = await response.json();
                const labels = data.map(d => String(d.rankID));
                const max = Math.max(...data.map(d => d.num_member));
                const datasets = [{ data: data.map(d => d.num_member), backgroundColor: data.map(d => d.num_member === max ? "#46FFBD" : "#252525"), borderColor: '#00000' },];

                setUd2Data({ labels, datasets });
                setError(null);
            } catch (error) {
                console.error("Error fetching data from API: ", error);
                setError("An error occurred while fetching the data.");
                setUd2Data({ labels: [], datasets: [] });
            }

            setLoading(false);
        }

        fetch2Data();
    }, []);

    // hor chart
    const [userData, setUserData] = useState({ labels: [], datasets: [] });

    useEffect(() => {
        async function fetch3Data() {
            setLoading(true);

            try {
                const res = await fetch("http://localhost:4000/stat/5");
                const data = await res.json();
                const max = Math.max(...data?.map(d => d.num_member));
                const colorhor = data?.map(d => ((d.num_member) === max ? "#46FFBD" : "#E2FEA7"));
                const labels = data.map(d => d.trainerID.toString());

                // const res1 = await fetch(`http://localhost:4000/trainer/${labels.join(",")}`);
                // const data1 = await res1.json(); 
                // const labels1 = data1?.map(d1 => d1.profilePic);

                const datasets = [
                    {
                        data: data?.map(d => d.num_member),
                        backgroundColor: colorhor,
                        barThickness: 30,
                        indexAxis: "y"
                    }
                ];

                setUserData({ labels, datasets });
                setError(null);
            } catch (error) {
                console.error("Error fetching data from API: ", error);
                setError("An error occurred while fetching the data.");
                setUserData({ labels: [], datasets: [] });
            }

            setLoading(false);
        }

        fetch3Data();
    }, []);

    // bar chart
    const [user2Data, setUser2Data] = useState({ labels: [], datasets: [] });

    useEffect(() => {
        async function fetch4Data() {
            setLoading(true);

            try {
                const res = await fetch('http://localhost:4000/stat/6');
                const data = await res.json();
                const sortedData = data.sort((a, b) => b.num_course - a.num_course);
                const topThree = sortedData.slice(0, 3);
                const max = Math.max(...topThree.map(d => d.num_course));
                const colorbar = topThree.map(d => d.num_course === max ? '#46FFBD' : '#E2FEA7');
                const datasets = [{ data: topThree.map(d => d.num_course), backgroundColor: colorbar, barThickness: 50, }];
                const labels = topThree.map(d => d.memberID);
                setUser2Data({ labels, datasets });
                setError(null);
            } catch (error) {
                console.error(error);
                setError('An error occurred while fetching the data.');
                setUser2Data({ labels: [], datasets: [] });
            }

            setLoading(false);
        }

        fetch4Data();
    }, []);



    // member
    const [memberData, setMemberData] = useState(0);

    useEffect(() => {
        async function fetchMemberData() {
            setLoading(true);

            try {
                const res = await fetch('http://localhost:4000/stat/0');
                const data = await res.json();
                setMemberData(data.memberNum);
                setError(null);
            } catch (error) {
                console.error(error);
                setError('An error occurred while fetching the data.');
                setMemberData(data.memberNum);
            }

            setLoading(false);
        }

        fetchMemberData();
    }, []);

    // trainer-member
    const [trainerCount, setTrainerCount] = useState(0);

    useEffect(() => {
        async function fetchTrainerCount() {
            try {
                const res = await fetch("http://localhost:4000/stat/1");
                const data = await res.json();
                setTrainerCount(data.trainerNum);
            } catch (error) {
                console.error("Error fetching trainer count data from API: ", error);
            }
        }

        fetchTrainerCount();
    }, []);

    // course
    const [courseCount, setCourseCount] = useState(0);

    useEffect(() => {
        async function fetchCourseCount() {
            try {
                const res = await fetch("http://localhost:4000/stat/2");
                const data = await res.json();
                setCourseCount(data.courseNum);
            } catch (error) {
                console.error("Error fetching course count data from API: ", error);
            }
        }

        fetchCourseCount();
    }, []);


    return (

        <div>
            <div >
                <div ><TabNavbar /></div>

                <div className="flex flex-col bg-slate-950 ">

                    {/* dn chart 1 */}

                    <div className=" h-80  ">
                        <div className="flex justify-center items-center pt-12 ">
                            <div style={{ width: 250 }} ><DnChart chartData={udData} /></div>

                        </div>

                    </div>

                    {/* dn chart 2 */}
                    <div className=" h-80">
                        <div className="flex justify-center items-center pt-12">
                            <div style={{ width: 250 }} > {loading ? (
                                <div>Loading...</div>
                            ) : error ? (
                                <div>{error}</div>
                            ) : (
                                <Dn2Chart chartData={ud2Data} />
                            )}</div>
                        </div>
                        02
                    </div>

                    {/* horizon g */}
                    <div className=" h-80">

                        <div className="flex justify-center items-center pt-12">
                            <div style={{ width: 500 }} ><HorChart chartData={userData} /></div>
                        </div>
                        03
                    </div>

                    {/* bar g */}
                    <div className=" h-80">
                        <div className="flex justify-center items-center pt-12">
                            <div style={{ width: 500 }} ><BarChart chartData={user2Data} /></div>
                        </div>
                        04

                    </div>







                    {/* 3 element */}
                    <div className=" h-40 pt-8">
                        <div className=" flex flex-row gap-x-5  justify-center" >


                            <div className=" w-44 h-24 bg-[#E2FEA7] rounded-3xl grid grid-rows-3 grid-flow-col gap-4 ">
                                <div className="row-span-3 place-self-center ps-2 ">
                                    <img src="/image/membericon.svg" className="h-12 w-12 py-2  rounded-xl bg-white fill-current " alt="Logo" />

                                </div>
                                <h1 className="text-[#484646] text-xl font-autiowide pt-6 col-span-2  ">Member</h1>
                                <div className="row-span-2 col-span-2 text-xl font-autiowide pt-4"><p>: 98</p></div>

                            </div>



                            <div className=" w-44 h-24 bg-[#E2FEA7] rounded-3xl grid grid-rows-3 grid-flow-col gap-4 ">
                                <div className="row-span-3 place-self-center ps-2 ">
                                    <img src="/image/trainer.svg" className="h-12 w-12 py-2  rounded-xl bg-white fill-current " alt="Logo" />
                                </div>
                                <h1 className="text-[#484646] text-xl font-autiowide pt-6 col-span-2 ">Trainer</h1>
                                <div className="row-span-2 col-span-2 text-xl font-autiowide pt-4"><p>: 97</p></div>
                            </div>



                            <div className=" w-44 h-24 bg-[#E2FEA7] rounded-3xl grid grid-rows-3 grid-flow-col gap-4 ">
                                <div className="row-span-3 place-self-center ps-2 ">
                                    <img src="/image/course.svg" className="h-12 w-12 py-2  rounded-xl bg-white fill-current " alt="Logo" />
                                </div>
                                <h1 className="text-[#484646] text-xl font-autiowide pt-6 col-span-2 ">Course</h1>
                                <div className="row-span-2 col-span-2 text-xl font-autiowide pt-4">: 98</div>
                            </div>
                        </div>

                    </div>



                </div>
            </div>
        </div >


    )
}








