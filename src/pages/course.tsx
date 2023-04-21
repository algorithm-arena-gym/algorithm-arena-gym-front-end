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
        <div>
          <TabNavbar />
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
