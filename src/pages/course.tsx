import Link from 'next/link';
import { useEffect, useState } from 'react';
import 'src/app/globals.css'
import TabNavbar from "src/app/navbar/navbar.js";
import "src/app/coursecard.css";

interface Course {
  courseID: number,
  createAt: Date;
  courseName: string,
  price: number,
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

  const courses = JSON.parse(JSON.stringify(courseData));

  return (
    <body className='bg-black'>
      <div >
<<<<<<< Updated upstream
        <div>
          <TabNavbar />
=======
        <div className=' flex flex-wrap p-5'>
          {courses.map((course: Course) => ( ///loop course
            <div className="row">
              <Link href={`/member/${course.courseID}`}>
                <div className="card">
                  <img src={course.coursePic} />
                  <div className="container">
                    <p className="title">{course.courseName}</p>
                    <p>{course.price} Bath/Month</p>
                  </div>
                </div>

              </Link>
            </div>
          ))}
          <div className="row">
            <div className="card" >
              <button type="button" className="btn" >+</button>
            </div>
          </div>
          {/* <div className='bg-[#D9D9D9] p-5 flex mlr-10 rounded-3xl m-2 content-center  w-96' >
        <button type="button" className="focus:outline-none text-black bg-[#46FFBD]  hover:bg-[#E2FEA7] focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800" >+</button> */}
          {/* <button type="button" className="focus:outline-none text-black bg-[#46FFBD]  hover:bg-[#E2FEA7] focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800" >+</button> */}
          {/* </div> */}

>>>>>>> Stashed changes
        </div>
        {/* <div > course รวม */}
        <div className='grid gap-6 grid-cols-1-250 md:grid-cols-2-250 lg:grid-cols-3-250 place-content-center md:px-40 pt-10'>
          {courses.map((course: Course) => ( ///loop course
            <div className='grid justify-items-center p-6'>
              <Link href={`/member/${course.courseID}`}>
                <div className="card ">
                  <img src={course.coursePic} />
                  <div className="cardcontainer">
                    <p className="title font-semibold">{course.courseName}</p>
                    {/* <p>{course.price} Bath/Month</p> */}
                  </div>
                </div>

              </Link>
            </div>
          ))}
          < div className="grid justify-items-center p-6">
            <div className="card justify-center" >
              <div >
              <Link href={`/course/createCourse`}>
                <button type="button" className="btn" >+
                {/* <Link href={`/course/createCourse`}> 
                  
                </Link> */}
                </button>
              </Link>
              </div>
            </div>
          </div>

        </div>

        {/* </div> */}
      </div>
    </body>
  )
}
