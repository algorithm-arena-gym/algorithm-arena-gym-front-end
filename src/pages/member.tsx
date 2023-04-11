import Link from 'next/link';
import { useEffect, useState } from 'react';
import 'src/app/globals.css'
import TabNavbar from "src/app/navbar/navbar.js";

interface Member {
  memberID: number,
  nameEng: string,
  nameTh: string,
  profilePic: string,
  phone: string,
  email: string,
  cID: string,
  drugAllergy: string,
  congenitalDisease: string,
  rankID: number,
  address: string,
  emergencyContact: string,
  point: number,
  subscriptionDate: Date;
}


export default function allMember() {
  const [memberData, setData] = useState<Member | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);

      try {
        const res = await fetch('http://localhost:4000/member');
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

  if (!memberData) {
    return <div>No data to display.</div>;
  }

  const members = JSON.parse(JSON.stringify(memberData));
  return (
    <div>
      <div>
        <TabNavbar />
      </div>
      {/* <div className=' bg-[#000000] max-h-full'>
      <div className="flex flex-row">
        <div className="basis-2/12">01</div>
        <div className="basis-8/12">02</div>
        <div className="basis-2/12">03</div>
      </div>
      </div> */}
      <div className=' bg-black'>
    <div className=' bg-black flex flex-wrap p-5'>
      {members.map((member:Member) => (
        <div>
          <Link href={`/member/${member.memberID}`}>
        <div className=' bg-[#D9D9D9] p-5 flex mlr-10 rounded-3xl m-2 content-center  w-96'>
          <img className=' border-[#E2FEA7] border-4 w-20 h-20 rounded-full' src={member.profilePic} alt="profilePicture"/>
          <div className=' ml-10'>
    
            <p>{member.nameEng}</p>
            <p>{member.nameTh}</p>
            <p>{member.phone}</p>
          </div>
        </div>
        </Link>
        </div>
      ))}
       <div className=' bg-[#D9D9D9] p-5 flex mlr-10 rounded-3xl m-2 content-center  w-96' >
        <Link href="/member/createMember" className="focus:outline-none text-black bg-[#46FFBD]  hover:bg-[#E2FEA7] focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">+</Link>

       </div>
    </div>
   
    </div>
    </div>
  )
}
