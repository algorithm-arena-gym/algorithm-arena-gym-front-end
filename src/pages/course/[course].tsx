import Navbar from "@/app/navbar/navbar";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import 'src/app/globals.css';
import TabNavbar from "src/app/navbar/navbar.js";
import course from "../course";

interface Course {
  courseID: number;
  coursePic: string;
  courseName: string;
  trainerID: number;
  detail: string;
  createAt: Date;

}

export default function CourseDetail() {
  const router = useRouter();
  const [courseData, setCourseData] = useState<Course | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const courseID = router.query.course as string;
        const apiURL = `http://localhost:4000/course/${courseID}`;
        const res = await fetch(apiURL);
        const json = await res.json();
        setCourseData(json[0]);
        setError(null);
      } catch (error) {
        console.error(error);
        setError("An error occurred while fetching the data.");
        setCourseData(null);
      }
      setLoading(false);
    }

    fetchData();
  }, [router.query.course]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!courseData) {
    return <div>No data to display.</div>;
  }

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
                  <img className=" rounded-full w-36 h-36 m-6 border-8 border-[#FFFFFF] " src={courseData.coursePic} />
                  <div>
                    <div className="grid pt-24 ">
                      <span className="font-semibold text-4xl">{courseData.courseName}</span>
                      <span className="font-light text-3xl pb-24" >ID : {courseData.courseID}</span>
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
            <div>
              <p className="ml-32 mt-40 ">Course Information</p>
              <hr className="ml-20 mr-20 my-3 bg-[#000000]  " />
              <span className="font-light text-base ml-32">{courseData.detail}</span>
            </div>

            {/* ก้อน3 */}
            <div>
              <p className="ml-32 mt-5">Available Days of The Week</p>
              <hr className="ml-20 mr-20 my-3 bg-[#000000]  " />
              <span className="font-light text-base ml-32">ดึงวันเวลา</span>
            </div>
            {/* ก้อน4 */}
            <div>
              <p className="ml-32 mt-5 ">Trainer</p>
              <hr className="ml-20 mr-20 my-3 bg-[#000000]  " />

              <div className="flex flex-row ">
                <div className="basis-1/4 ">
                  <div>
                    <div className="grid ml-32">
                      <span className="font-light text-base ">ID</span>
                      <span className="font-semibold text-xl ">ดึงID</span>
                    </div>
                  </div>
                </div>

                <div className="basis-1/4 flex justify-center ...">
                  <div>
                    <div className="grid ">
                      <span className="font-light text-base ">Name</span>
                      <span className="font-semibold text-xl ">ดึงName</span>
                    </div>
                  </div>
                </div>

                <div className="basis-1/4 flex justify-center ...">
                  <div>
                    <div className="grid ">
                      <span className="font-light text-base ">Phone Number</span>
                      <span className="font-semibold text-xl ">ดึงPhone Number</span>
                    </div>
                  </div>
                </div>

                <div className="basis-1/4 flex justify-start ...">
                  <div>
                    <div className="grid ">
                      <span className="font-light text-base ">Email</span>
                      <span className="font-semibold text-xl ">ดึงEmail</span>
                    </div>
                  </div>
                </div>

              </div>

              {/* ก้อน5 */}
              <div>
                <div className="flex flex-row mb-6 ">
                  <div className="basis-1/2 ">
                    <p className="ml-32  mt-8 text-base">Course Member</p>
                    <hr className="ml-20 mr-10 my-3 bg-[#000000]" />
                    <div>
                      <div className="grid ">
                        <span className="font-semibold text-xl ml-32 ">ดึงname</span>
                      </div>
                    </div>
                  </div>
                  <div className="basis-1/2">
                    <p className="  ml-10 mt-8 text-base">Rank Available</p>
                    <hr className=" mr-5 my-3 bg-[#000000]" />
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

    </div>
  );
}
