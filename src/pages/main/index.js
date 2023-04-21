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
                const labels = data.map(d => d.courseID);

                // fetch the rank names for each rcourseID
                const courseNamePromises = data.map(d => fetch(`http://localhost:4000/course/${d.courseID}`));
                const courseNameResponses = await Promise.all(courseNamePromises);
                const courseNameData = await Promise.all(courseNameResponses.map(res => res.json()));
                const courseNames = courseNameData.map(d => d[0].courseName);

                const datasets = [{ data: data.map(d => d.num_member), backgroundColor: ["#46FFBD", "#252525", "#252525", "#252525", "#252525"], borderColor: "#000000" }];

                setUdData({ labels: courseNames, datasets });
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
    const [maxNum, setMaxNum] = useState(0);

    useEffect(() => {
        async function fetch2Data() {
            setLoading(true);

            try {
                const response = await fetch("http://localhost:4000/stat/4");
                const data = await response.json();
                const labels = data.map(d => d.rankID);


                // fetch the rank names for each rankID
                const rankNamePromises = data.map(d => fetch(`http://localhost:4000/rank/${d.rankID}`));
                const rankNameResponses = await Promise.all(rankNamePromises);
                const rankNameData = await Promise.all(rankNameResponses.map(res => res.json()));
                const rankNames = rankNameData.map(d => d[0].rankName);

                const datasets = [{
                    data: data.map(d => d.num_member),
                    backgroundColor: ["#E2FEA7", "#252525", "#252525", "#252525", "#252525"],
                    borderColor: "#000000",
                },];

                setUd2Data({ labels: rankNames, datasets });


                //show  mem_num of rank
                const sortedData = data.sort((a, b) => {
                    return Number(b.num_member) - Number(a.num_member);
                });

                setMaxNum(sortedData[0].num_member);

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
                const res = await fetch('http://localhost:4000/stat/5');
                const data = await res.json();
                const labels = data.map(d => d.trainerID);
                const stlabels = String(labels);
                // fetch the trainer names for each trainerID
                const trainerNamePromises = data.map(d => fetch(`http://localhost:4000/trainer/${d.trainerID}`));
                const trainerNameResponses = await Promise.all(trainerNamePromises);
                const trainerNameData = await Promise.all(trainerNameResponses.map(res => res.json()));
                const trainerNamesMap = new Map();
                trainerNameData.forEach(trainer => trainerNamesMap.set(trainer[0].trainerID, trainer[0].nameEng));
                const trainerNames = data.map(d => trainerNamesMap.get(d.trainerID));

                const datasets = [
                    {
                        data: data?.map(d => d.num_member),
                        backgroundColor: ['#46FFBD'],
                        barThickness: 10,
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
                const labels = topThree.map(d => d.memberID);

                // fetch the  member names for each
                const memberNamePromises = data.map(d => fetch(`http://localhost:4000/member/${d.memberID}`));
                const memberNameResponses = await Promise.all(memberNamePromises);
                const memberNameData = await Promise.all(memberNameResponses.map(res => res.json()));
                const memberNames = memberNameData.map(d => d[0].memberName);


                const datasets = [{ data: topThree.map(d => d.num_course), backgroundColor: colorbar, barThickness: 50, }];

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


    //member
    const [memberData, setMemberData] = useState(0);

    useEffect(() => {
        async function fetchMemberData() {
            setLoading(true);

            try {
                const res = await fetch('http://localhost:4000/stat/0');
                const data = await res.json();
                const memberNum = data[0].memberNum; // extract the memberNum property from the response data
                setMemberData(memberNum);
                setError(null);
            } catch (error) {
                console.error(error);
                setError('An error occurred while fetching the data.');
                setMemberData(0); // set memberData to 0 if there's an error
            }

            setLoading(false);
        }

        fetchMemberData();
    }, []);


    // trainer count
    const [trainerCount, setTrainerCount] = useState(0);

    useEffect(() => {
        async function fetchTrainerCount() {
            setLoading(true);

            try {
                const res = await fetch("http://localhost:4000/stat/1");
                const data = await res.json();
                const trainerNum = data[0].trainerNum;
                setTrainerCount(trainerNum);
                setError(null);
            } catch (error) {
                console.error("Error fetching trainer count data from API: ", error);
                setError("An error occurred while fetching the data.");
                setTrainerCount(0);
            }

            setLoading(false);
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
                const courseNum = data[0].courseNum;
                setCourseCount(courseNum);
            } catch (error) {
                console.error("Error fetching course count data from API: ", error);
                setError("An error occurred while fetching the data.");
                setTrainerCount(0);
            }
            setLoading(false);
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
                        <div className="relative ">
                            <div className="flex justify-center  ">
                                <h1 className="absolute flex pt-24  text-white font-autiowide text-3xl"> Most </h1> {/* dn1 text center */}
                                <h1 className="absolute flex pt-36  text-white font-autiowide text-3xl"> Subscribed </h1> {/* dn1 text center */}
                                <h1 className="absolute flex pt-48  text-white font-autiowide text-3xl">Course</h1> {/* dn1 text center */}
                            </div>
                        </div>
                        <div className="flex justify-center  pt-12 ">
                            <div style={{ width: 250, height: 200 }} >
                                <div className="relative">
                                    <DnChart chartData={udData} />

                                    <div className="flex justify-center ">
                                        <h1 className=" absolute  flex mt-40 pt-4 text-white font-autiowide text-3xl">{maxNum}</h1>  {/* dn2 text center */}
                                    </div>

                                </div>



                            </div>

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
                        <div className="h-2 ps-12 flex justify-center items-center " style={{ width: 730 }} ><h1 className=" text-white font-autiowide text-xl">Trainer</h1></div>
                        <div className="flex justify-center items-center pt-12 ">
                            <div className="relative">

                                <div className="absolute  bottom-0 left-0  border-t border-white-500" style={{ width: 550 }} ></div>
                                <div className="absolute bottom-0 left-0 h-72 border-l border-white-500"></div>
                                <div style={{ width: 500 }} ><HorChart chartData={userData} /></div>
                            </div>
                        </div>
                        03
                    </div>

                    {/* bar g */}
                    <div className=" h-80 pt-10 ">
                        <div className="h-2 ps-12 flex justify-center items-center " style={{ width: 800 }} ><h1 className=" text-white font-autiowide text-xl">Course</h1></div>
                        <div className="flex justify-center items-center pt-12 ">
                            <div className="relative">

                                <div className="absolute  bottom-0 left-0 w-96 border-t border-white-500"></div>
                                <div className="absolute bottom-0 left-0 h-56 border-l border-white-500"></div>
                                {/* <div className="isolate flex justify-center" style={{ width:100, height:2 }} ><h1 className=" text-white font-autiowide text-xl">Member</h1></div> */}
                                <div style={{ width: 420 }} ><BarChart chartData={user2Data} /></div>
                            </div>
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
                                <div className="row-span-2 col-span-2 text-xl font-autiowide pt-4">: {memberData}</div>

                            </div>



                            <div className=" w-44 h-24 bg-[#E2FEA7] rounded-3xl grid grid-rows-3 grid-flow-col gap-4 ">
                                <div className="row-span-3 place-self-center ps-2 ">
                                    <img src="/image/trainer.svg" className="h-12 w-12 py-2  rounded-xl bg-white fill-current " alt="Logo" />
                                </div>
                                <h1 className="text-[#484646] text-xl font-autiowide pt-6 col-span-2 ">Trainer</h1>
                                <div className="row-span-2 col-span-2 text-xl font-autiowide pt-4">: {trainerCount} </div>
                            </div>



                            <div className=" w-44 h-24 bg-[#E2FEA7] rounded-3xl grid grid-rows-3 grid-flow-col gap-4 ">
                                <div className="row-span-3 place-self-center ps-2 ">
                                    <img src="/image/course.svg" className="h-12 w-12 py-2  rounded-xl bg-white fill-current " alt="Logo" />
                                </div>
                                <h1 className="text-[#484646] text-xl font-autiowide pt-6 col-span-2 ">Course</h1>
                                <div className="row-span-2 col-span-2 text-xl font-autiowide pt-4">: {courseCount}</div>
                            </div>
                        </div>

                    </div>



                </div>
            </div>
        </div >




    )
}








