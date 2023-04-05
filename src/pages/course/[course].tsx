import Navbar from "@/app/navbar/navbar";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import 'src/app/globals.css';
import TabNavbar from "src/app/navbar/navbar.js";
import course from "../course";

interface Course {
  courseID:number,
  createAt:Date;
  courseName: string,
  price:number,
  detail: string,
  profilePic: string,
  
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
      <div className="grid place-items-center h-screen font-AzeretMono">
        <div className="rounded-3xl  w-9/12  h-[450px] text-black bg-[#D9D9D9]">
         <div className="rounded-3xl rounded-b-none p-6 w-full h-[100px] text-black bg-[#FFFFFF]">
            {/* ก้อน1 */}
           <div className="flex justify-start ... ">
           <img className=" rounded-full w-32 h-32 m-3 border-8 border-[#00000] " src={courseData.profilePic}/>
           <div>
            <div className="grid place-items-center">
              <span>{courseData.courseName}</span>
              <span>ID : {courseData.courseID}</span>
            </div>
           </div>
           <div>
            <div className="grid">
             <button>create</button>
              <button>edit</button>
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
