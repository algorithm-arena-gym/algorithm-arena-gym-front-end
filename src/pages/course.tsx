import Link from 'next/link';
import { useEffect, useState } from 'react';
import 'src/app/globals.css'
import TabNavbar from "src/app/navbar/navbar.js";
import "src/app/coursecard.css";

interface Course {
  courseID:number,
  createAt:Date;
  courseName: string,
  price:number,
  detail: string,
  coursePic: string,
  
}


export default function allCourse() {
  const [courseData, setData] = useState<Course | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);

      try {
        const res = await fetch('http://localhost:4000/course');
        const json = await res.json();
        setData(json);
        setError(null);
      } catch (error) {
        console.error(error);
        setError('An error occurred while fetching the data.');
        setData(null);
      }

      setLoading(false);
    }

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!courseData) {
    return <div>No data to display.</div>;
  }

  const courses=JSON.parse(JSON.stringify(courseData));

  return (
    <div>
      <div>
        <TabNavbar />
      </div>
    <div className=' bg-black'> 
  <div className=' flex flex-wrap p-5'>
    {courses.map((course:Course) => ( ///loop course
      <div>
        <Link href={`/member/${course.courseID}`}>
          <div className="card">
            <img src= {course.coursePic}
            style={{width:"100%"}}/>
            <div className="container">
              <p className="title">{course.courseName}</p>
              <p>{course.price} Bath/Month</p> 
            </div>
          </div>
          {/* <div className=' bg-[#D9D9D9] p-5 flex mlr-10 rounded-3xl m-2 content-center  w-40'> */}
            {/* <img  src={course.profilePic} /> */}
            {/* <div className=' ml-10'>
              <img className=' border-[#E2FEA7] border-4 w-20 h-20 rounded-full content-center' src={course.profilePic} alt="profilePicture"/> */}
              {/* <p>name {course.courseName}</p>
              <p> {course.price} Bath/Month</p> */}
              {/* <img className=' border-[#E2FEA7] border-4 w-20 h-20 rounded-full content-center' src={course.profilePic} alt="profilePicture"/> */}
            {/* </div> */}
          {/* </div> */}
        </Link>
      </div>
      ))}
      
    <div className=' bg-[#D9D9D9] p-5 flex mlr-10 rounded-3xl m-2 content-center  w-96' >
      <button type="button" className="focus:outline-none text-black bg-[#46FFBD]  hover:bg-[#E2FEA7] focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800" >+</button>

    </div>
    
  </div>
 
  </div>
  </div>
)
}
