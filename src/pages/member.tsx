import Link from 'next/link';
import { useEffect, useState } from 'react';
import 'src/app/globals.css'
import TabNavbar from "src/app/navbar/navbar.js";
import "src/app/rankcard.css";

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
    <body className=' bg-black'>
      <div >
        <TabNavbar />
      </div>
      <div className='grid gap-6 grid-cols-3 place-content-center md:px-20 pt-10'>
        
          {members.map((member: Member) => (
            <div className='  bg-[#D9D9D9] p-4 rounded-3xl  w-70 '>
              <Link href={`/member/${member.memberID}`}>
                <div className='flex flex-row '> 
                  <img className='flex border-[#E2FEA7] border-4 w-20 h-20 rounded-full' src={member.profilePic} alt="profilePicture" />
                  <div className='pl-4 '>

                    <p>{member.nameEng}</p>
                    {/* <p>{member.nameTh}</p> */}
                    <p>{member.phone}</p>
                  </div>
                </div>
              </Link>
            </div>
          ))}
          <div className=' bg-[#D9D9D9] p-4 rounded-3xl  w-70 h-28 grid ' >
            <div className='grid justify-items-center'>
            <button type="button" className="bttn" >+</button>
            </div>
          </div>
        

      </div>
    </body>
  )
}
