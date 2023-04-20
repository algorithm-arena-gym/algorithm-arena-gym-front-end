import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from "next/router";
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
interface Rank {
  rankID: number,
  rankName: string,
  rankDetail: string,
  rankPic: string
  rankPrice: number
}

export default function allMember() {
  const router = useRouter();
  const [memberData, setMemberData] = useState<Array<Member> | null>(null);
  const [rankData, setRankData] = useState<Array<Rank> | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);



  useEffect(() => {
    async function fetchData() {
      setLoading(true);

      try {
        const res = await fetch('http://localhost:4000/member');
        const json = await res.json();
        setMemberData(json);
        const res2 = await fetch('http://localhost:4000/rank');
        const json2 = await res2.json();
        setRankData(json2)
        setError(null);



      } catch (error) {
        console.error(error);
        setError('An error occurred while fetching the data.');
        setMemberData(null);
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
  // if (!rankData) {
  //   return <div>No rankData to display.</div>;
  // }

  const members = JSON.parse(JSON.stringify(memberData));
  // const ranks = JSON.parse(JSON.stringify(rankData));
  // console.log(ranks);


  return (
    <body className=' bg-black'>
      <div >
        <TabNavbar />
      </div>
      <div className='grid gap-6 grid-cols-3 place-content-center md:px-20 pt-10'>

        {members.map((member: Member, index: number) => (
          <div className='  bg-[#D9D9D9] p-4 rounded-3xl  w-70 '>
            <Link href={`/member/${member.memberID}`}>
              <div className='flex flex-row '>
                <img className='flex border-[#E2FEA7] border-4 w-20 h-20 rounded-full' src={member.profilePic} alt="profilePicture" />
                <div className='pl-4 self-center'>

                  <p className="font-semibold text-lg">{member.nameEng}</p>
                  {/* need rank */}
                  <p className="font-semibold text-md">{rankData?.find(rank => rank.rankID === member.rankID)?.rankName}</p>

                  {/* <p>{member.phone}</p> */}
                </div>
              </div>
            </Link>
          </div>
        ))}
        <div className=' bg-[#D9D9D9] p-4 rounded-3xl  w-70 h-28 grid ' >
          <div className='grid justify-items-center'>
            <Link href={`/member/createMember`}>
              <button type="button" className="bttn" >+</button>
            </Link>
          </div>
        </div>


      </div>
    </body>
  )
}
