import Navbar from "@/app/navbar/navbar";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import 'src/app/globals.css';
import TabNavbar from "src/app/navbar/navbar.js";


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
  rankID: number;
  rankPic: string;
  rankName: string;
  rankDetail: string;
  rankPrice: number;
  createAt: Date;

}


interface Trainer {
  trainerID: number,
  nameEng: string,

  trainerMemberID: number;
  memberID: number;
  trainingDate: string;
  trainingTime: string;
  createAt: Date;
}

interface Course {
  courseID: number,
  courseName: string,

  courseMemberID: number;
  memberID: number;

  courseDateTimeID: number;
  courseDate: string;
  courseTime: string;

  createAt: Date;
}




export default function MemberDetail() {
  const router = useRouter();
  const [memberData, setMemberData] = useState<Member | null>(null);
  const [rankData, setRankData] = useState<Rank | null>(null);

  const [trainerData, setTrainerData] = useState<Trainer | null>(null);
  const [courseData, setCourseData] = useState<Course | null>(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchMemberData() {
      try {
        const memberID = router.query.member as string;
        const apiURL = `http://localhost:4000/member/${memberID}`;
        const res = await fetch(apiURL);
        const json = await res.json();
        setMemberData(json[0]);
        setError(null);
      } catch (error) {
        console.error(error);
        setError("An error occurred while fetching the memberData.");
        setMemberData(null);
      }
    }

    setLoading(true);
    setError(null);
    fetchMemberData();
    setLoading(false);
  }, [router.query.member]);

  useEffect(() => {
    async function fetchRankData() {
      try {
        const rankID = memberData?.rankID as number;
        const apiURL2 = `http://localhost:4000/rank/${rankID}`;
        const res2 = await fetch(apiURL2);
        const json2 = await res2.json();
        setRankData(json2[0]);
        setError(null);
      } catch (error) {
        console.error(error);
        setError("An error occurred while fetching the rankData.");
        setRankData(null);
      }
    }
    if (memberData) {
      setLoading(true);
      setError(null);
      fetchRankData();
      setLoading(false);
    }
  }, [memberData]);


  useEffect(() => {
    async function fetchTrainerData() {
      try {
        const memberID = memberData?.memberID as number;
        const apiURL3 = `http://localhost:4000/pm-trainer/${memberID}`;
        const res3 = await fetch(apiURL3);
        const json3 = await res3.json();
        setTrainerData(json3[0]);
        setError(null);
      } catch (error) {
        console.error(error);
        setError("An error occurred while fetching the trainerData.");
        setTrainerData(null);
      }
    }
    if (memberData) {
      setLoading(true);
      setError(null);
      fetchTrainerData();
      setLoading(false);
    }
  }, [memberData]);

  useEffect(() => {
    async function fetchCourseData() {
      try {
        const memberID = memberData?.memberID as number;
        const apiURL4 = `http://localhost:4000/pm-course/${memberID}`;
        const res4 = await fetch(apiURL4);
        const json4 = await res4.json();
        setCourseData(json4[0]);
        setError(null);
      } catch (error) {
        console.error(error);
        setError("An error occurred while fetching the CourseData.");
        setCourseData(null);
      }
    }
    if (memberData) {
      setLoading(true);
      setError(null);
      fetchCourseData();
      setLoading(false);
    }
  }, [memberData]);




  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!memberData) {
    return <div>No memberData to display.</div>;
  }

  if (!rankData) {
    return <div>No rankData to display.</div>;
  }

  const trainerDateTimes = JSON.parse(JSON.stringify(trainerData));


  return (
    <div>
      <div>
        <TabNavbar />
      </div>

      <div className=" bg-black w-full h-full">
        <div className="grid place-items-center  font-AzeretMono">
          <div className="rounded-3xl m-6 w-9/12 pb-6 text-black bg-[#D9D9D9]">
            <div className="rounded-3xl rounded-b-none  w-full h-[95px] text-black bg-[#FFFFFF]">
              {/* ก้อน1 */}
              <div className="flex flex-row ">
                <div className="basis-5/6 flex justify-start ...">
                  <img className=" rounded-full w-36 h-36 m-6 border-8 border-[#FFFFFF] " src={memberData.profilePic} />
                  <div>
                    <div className="grid pt-24 ">
                      <span className="font-semibold text-4xl">{memberData.nameEng}</span>
                      <span className="font-light text-3xl pb-24" >ID : {memberData.memberID}</span>
                    </div>
                  </div>
                </div>
                <div className="basis-1/6 flex justify-end ...mr-10">
                  <button className="bg-[#FCD34D] rounded-md border-black h-10 p-2 mt-5 mr-5 font-semibold text-base pl-4 pr-4"> EDIT</button>
                  <button className="bg-[#EF4444]  rounded-md h-10 p-2 mt-5 mr-5 font-semibold text-white-base" >DELETE</button>
                </div>
              </div>
            </div>



            {/* ก้อน2 */}
            <p className="ml-32  mt-28 text-base">Member information</p>
            <hr className="ml-20 mr-20 my-3 bg-[#000000]  " />
            <div className="flex flex-row mb-6">
              <div className="basis-1/2 flex justify-start ...">
                <div className="grid ml-32 ">

                  <span font-light text-base>Name(Eng)</span>
                  <span className="font-semibold text-xl ">{memberData.nameEng}</span>

                  <span font-light text-base>Name(TH)</span>
                  <span className="font-semibold text-xl ">{memberData.nameTh}</span>

                  <span font-light text-base>Rank</span>
                  <p className="font-semibold text-xl">{rankData.rankName}</p>

                  <span font-light text-base>Point</span>
                  <span className="font-semibold text-xl">{memberData.point}</span>
                </div>
              </div>

              <div className="basis-1/2 flex justify-start ...">
                <div className="grid  ">

                  <span font-light text-base>Citizen ID</span>
                  <span className="font-semibold text-xl ">{memberData.cID}</span>

                  <span font-light text-base>Phone number</span>
                  <span className="font-semibold text-xl ">{memberData.phone}</span>

                  <span font-light text-base>Email</span>
                  <span className="font-semibold text-xl ">{memberData.email}</span>

                  <span font-light text-base>Address</span>
                  <span className="font-semibold text-xl ">{memberData.address}</span>
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
                      <span className="font-light text-base ">Drug Allergy</span>
                      <span className="font-semibold text-xl ">{memberData.drugAllergy}</span>
                    </div>
                  </div>
                </div>

                <div className="basis-1/3 flex justify-center ...">
                  <div >
                    <div className="grid ">
                      <span className="font-light text-base ">Congenital Disease</span>
                      <span className="font-semibold text-xl ">{memberData.congenitalDisease}</span>
                    </div>
                  </div>
                </div>

                <div className="basis-1/3 flex justify-start ...">
                  <div>
                    <div className="grid ">
                      <span className="font-light text-base ">Emergency Contact</span>
                      <span className="font-semibold text-xl ">{memberData.emergencyContact}</span>
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
                    <div className="basis-2/4 ">
                      <div>
                        <div className="grid ml-20">
                          <span className="font-light text-base ">Name </span>
                          <span className="font-semibold text-xl ">forloop{trainerData?.nameEng}</span>


                          {/* {trainerDateTimes.map((trainer:Trainer) => (
                              <div>
                                <span className="font-light text-base ">Name :</span>
                            <span className="font-semibold text-xl ">{trainerData?.nameEng}</span>
                              </div>
                            ))} */}

                          {trainerDateTimes.map((tr: Trainer) => (
                            <div>


                              <p>{tr.nameEng}</p>
                              <p>{tr.trainingDate}</p>
                              <p>{tr.trainingTime}</p>
                            </div>
       ))}
                         







                        </div>
                      </div>
                    </div>
                    <div className="basis-1/4 flex justify-center ...">
                      <div>
                        <div className="grid  ">
                          <span className="font-light text-base ">Days</span>
                          <span className="font-semibold text-xl ">forloop{trainerData?.trainingDate}</span>

                        </div>
                      </div>
                    </div>
                    <div className="basis-1/4 flex justify-center ...">
                      <div>
                        <div className="grid ">
                          <span className="font-light text-base ">Time</span>
                          <span className="font-semibold text-xl ">forloop{trainerData?.trainingTime}</span>
                        </div>
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
                          <span className="font-light text-base ">Name</span>
                          <span className="font-semibold text-xl ">forloop{courseData?.courseName}</span>
                        </div>
                      </div>
                    </div>
                    <div className="basis-1/3 flex justify-start ...">
                      <div>
                        <div className="grid  ">
                          <span className="font-light text-base ">Days</span>
                          <span className="font-semibold text-xl ">forloop{courseData?.courseDate}</span>
                        </div>
                      </div>
                    </div>
                    <div className="basis-1/3 ">
                      <div>
                        <div className="grid ">
                          <span className="font-light text-base ">Time</span>
                          <span className="font-semibold text-xl ">forloop{courseData?.courseTime}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div >
  );
}
