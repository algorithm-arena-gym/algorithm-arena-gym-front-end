import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import 'src/app/globals.css';
import TabNavbar from "src/app/navbar/navbar.js";


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
  trainingDate: string;
  trainingTime: string;
  
}

interface Course {
  courseID: number,
  courseName: string,
  memberID: number;

  courseDateTimeID: number;
  courseDate: string;
  courseTime: string;

  createAt: Date;
}

export default function TrainerDetail() {
  const router = useRouter();
  const [trainerData, setTrainerData] = useState<Trainer | null>(null);

  const [memberData, setMemberData] = useState<Member | null>(null);
  const [courseData, setCourseData] = useState<Course | null>(null);
  const [loading, setLoading] = useState(false);

  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
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

    fetchData();
  }, [router.query.trainer]);

  useEffect(() => {
    async function fetchMemberData() {
      try {
        const trainerID = trainerData?.trainerID as number;
        const apiURL2 = `http://localhost:4000/pt-member/${trainerID}`;
        const res2 = await fetch(apiURL2);
        const json2 = await res2.json();
        setMemberData(json2);
        setError(null);

        console.log(json2);

      } catch (error) {
        console.error(error);
        setError("An error occurred while fetching the rankData.");
        setMemberData(null);
      }
    }
    if (trainerData) {
      setLoading(true);
      setError(null);
      fetchMemberData();
      setLoading(false);
    }
  }, [trainerData]);

  useEffect(() => {
    async function fetchCourseData() {
      try {
        const trainerID = trainerData?.trainerID as number;
        const apiURL3 = `http://localhost:4000/pm-course/${trainerID}`;
        const res3 = await fetch(apiURL3);
        const json3 = await res3.json();
        setCourseData(json3);
        setError(null);

        console.log(json3)
        
      } catch (error) {
        console.error(error);
        setError("An error occurred while fetching the trainerData.");
        setCourseData(null);
      }
    }
   if (trainerData) {
      setLoading(true);
      setError(null);
      fetchCourseData();
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
    return <div>
       <div>
        <TabNavbar />
      </div>
      <p className="font-AzeretMono font-semibold">No trainerData to display.</p> 
      {/* <Link href="/member" className="bg-[#EF4444] font-AzeretMono font-semibold">
       Go back
      </Link> */}
      </div>;
  }
  
  const listMember = memberData?.map((mem:Member) => {
    return (
      
      <div className="flex flex-row mb-2 ">
                    <div className="basis-1/2 ">
                      <div>
                        <div className="grid ml-20">
                           <span className="font-semibold text-xl ">{mem.nameEng}</span>
                         
                        </div>
                      </div>
                    </div>
                    <div className="basis-1/4 flex justify-center ...">
                      <div>
                        <div className="grid  ">
                          <span className="font-semibold text-xl ">{mem.trainingDate}</span>

                        </div>
                      </div>
                    </div>
                    <div className="basis-1/4 flex justify-center ...">
                      <div>
                        <div className="grid ">
                         <span className="font-semibold text-xl ">{mem.trainingTime}</span>
                        </div>
                      </div>
                    </div>
                  </div>
    )
  });

  const listCourse= courseData?.map((co:Course) => {
    return (
      
      <div className="flex flex-row mb-2 ">
                    <div className="basis-1/3 ">
                      <div>
                        <div className="grid ">
                          <span className="font-semibold text-xl ">{co.courseName}</span>
                          </div>
                      </div>
                    </div>
                    <div className="basis-1/3 flex justify-center ...">
                      <div>
                        <div className="grid  ">
                          <span className="font-semibold text-xl ">{co.courseDate}</span>
                          </div>
                      </div>
                    </div>
                    <div className="basis-1/3 ">
                      <div>
                        <div className="grid ">
                          <span className="font-semibold text-xl">{co.courseTime}</span>
                         </div>
                      </div>
                    </div>
                  </div>
    )
  });

  const onDelete = async (trainerID : any) => {
    try{
      
      // const memberID = router.query.member as string;
      let response = await fetch(`http://localhost:4000/trainer/${trainerID}` , {
         headers: {
       "Contene-Type" : "application/json",
      },
      method: "DELETE",
    })

    }catch(error) {
      console.log("An error occured while deleting trainer",error);
    }
    
  };

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
                  <img className=" rounded-full w-36 h-36 m-6 border-8 border-[#FFFFFF] " src={trainerData.profilePic} />
                  <div>
                    <div className="grid pt-24 ">
                      <span className="font-semibold text-4xl">{trainerData.nameEng}</span>
                      <span className="font-light text-3xl pb-24" >ID : {trainerData.trainerID}</span>
                    </div>
                  </div>
                </div>
                <div className="basis-1/6 flex justify-end ...mr-10">
                  <Link href= {`/trainer/editTrainer/${trainerData.trainerID}`}>
                      <button className="bg-[#FCD34D] rounded-md border-black h-10 p-2 mt-5 mr-5 font-semibold text-base pl-4 pr-4"> EDIT</button>
                  </Link>
                  <button className="bg-[#EF4444]  rounded-md h-10 p-2 mt-5 mr-5 font-semibold text-white-base" 
                          onClick={() => onDelete(trainerData.trainerID )}>DELETE</button>
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
                  <span className="font-semibold text-xl ">{trainerData.nameEng}</span>

                  <span font-light text-base>Name(TH)</span>
                  <span className="font-semibold text-xl ">{trainerData.nameTh}</span>

                  <span font-light text-base>Citizen ID</span>
                  <span className="font-semibold text-xl ">{trainerData.cID}</span>
                </div>
              </div>

              <div className="basis-1/2 flex justify-start ...">
                <div className="grid  ">

                  <span font-light text-base>Phone number</span>
                  <span className="font-semibold text-xl ">{trainerData.phone}</span>

                  <span font-light text-base>Email</span>
                  <span className="font-semibold text-xl ">{trainerData.email}</span>

                  <span font-light text-base>Address</span>
                  <span className="font-semibold text-xl ">{trainerData.address}</span>
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
                      <span className="font-semibold text-xl ">{trainerData.drugAllergy}</span>
                    </div>
                  </div>
                </div>

                <div className="basis-1/3 flex justify-center ...">
                  <div >
                    <div className="grid ">
                      <span className="font-light text-base ">Congenital Disease</span>
                      <span className="font-semibold text-xl ">{trainerData.congenitalDisease}</span>
                    </div>
                  </div>
                </div>

                <div className="basis-1/3 flex justify-start ...">
                  <div>
                    <div className="grid ">
                      <span className="font-light text-base ">Emergency Contact</span>
                      <span className="font-semibold text-xl ">{trainerData.emergencyContact}</span>
                    </div>
                  </div>
                </div>
              </div>

            </div>

            {/* ก้อน4 */}

            <div>
              <div className="flex flex-row mb-6 ">
                <div className="basis-1/2 ">
                  <p className="ml-32  mt-8 text-base">Trainee Information</p>
                  <hr className="ml-20 mr-5 my-3 bg-[#000000]" />
                  <div className="flex flex-row ">
                    <div className="basis-1/2 ">
                      <div>
                        <div className="grid ml-20">
                          <span className="font-light text-base ">Name</span>
                          </div>
                      </div>
                    </div>
                    <div className="basis-1/4 flex justify-center ...">
                      <div>
                        <div className="grid  ">
                          <span className="font-light text-base ">Days</span>
                          </div>
                      </div>
                    </div>
                    <div className="basis-1/4 flex justify-center ...">
                      <div>
                        <div className="grid ">
                          <span className="font-light text-base ">Time</span>
                          </div>
                      </div>
                    </div>
                  </div>
                   {listMember}
                </div>


                <div className="basis-1/2">
                  <p className=" ml-10 mt-8 text-base">Registered Course</p>
                  <hr className="mr-20 my-3 bg-[#000000]" />
                  <div className="flex flex-row ">
                    <div className="basis-1/3 ">
                      <div>
                        <div className="grid ">
                          <span className="font-light text-base ">Name</span>
                          </div>
                      </div>
                    </div>
                    <div className="basis-1/3 flex justify-center ...">
                      <div>
                        <div className="grid  ">
                          <span className="font-light text-base ">Days</span>
                          </div>
                      </div>
                    </div>
                    <div className="basis-1/3 ">
                      <div>
                        <div className="grid ">
                          <span className="font-light text-base ">Time</span>
                          </div>
                      </div>
                    </div>
                  </div>
{listCourse}
                </div>
              </div>
 </div>
</div>
      </div>
      </div>
    </div >
  );
}
