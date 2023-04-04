import Navbar from "@/app/navbar/navbar";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import 'src/app/globals.css';
import TabNavbar from "src/app/navbar/navbar.js";
import member from "../member";

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

export default function MemberDetail() {
  const router = useRouter();
  const [memberData, setMemberData] = useState<Member | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const memberID = router.query.member as string;
        const apiURL = `http://localhost:4000/member/${memberID}`;
        const res = await fetch(apiURL);
        const json = await res.json();
        setMemberData(json[0]);
        setError(null);
      } catch (error) {
        console.error(error);
        setError("An error occurred while fetching the data.");
        setMemberData(null);
      }
      setLoading(false);
    }

    fetchData();
  }, [router.query.member]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!memberData) {
    return <div>No data to display.</div>;
  }

  return (
    <div>
      <div>
        <TabNavbar />
      </div>
      
    <div className=" bg-black w-full h-full">
      <div className="grid place-items-center h-screen">
        <div className="rounded-3x1 p-6 w-4/5 text-black h-[45opx] bg-[#D9D9D9]">
          {/* ก้อน1 */}
          <div className="flex justify-between items-center">
           <img className=" rounded-full w-32 h-32 m-20 border-8 border-[#E2FEA7]" src={memberData.profilePic}/>
           <div>
            <div className="grid">
              <span>{memberData.nameEng}</span>
              <span>ID : {memberData.memberID}</span>
            </div>
           </div>
           <div>
            <div className="grid">
             <button>create</button>
              <button>edit</button>
            </div>
           </div>
          </div>
          {/* ก้อน2 */}
          <p>Member information</p>
          <div className="flex flex-row">
             <div className="basis-1/2 flex justify-center ...">
              <p>Name(Eng)</p>
              <p className="font-bold">{memberData.nameEng}</p>
              <p>Name(TH)</p>
              <p className="font-bold">{memberData.nameTh}</p>
              <p>Rank</p>
              {/* <p className="font-bold">{memberData.nameEng}</p> */}
              <p>Point</p>
              <p className="font-bold">{memberData.point}</p>
              

             </div>
             <div className="basis-1/2 flex justify-center ...">
              <p>Citizen ID</p>
              <p className="font-bold">{memberData.cID}</p>
              <p>Phone number</p>
              <p className="font-bold">{memberData.phone}</p>
              <p>Email</p>
              <p className="font-bold">{memberData.email}</p>
              <p>Address</p>
              <p className="font-bold">{memberData.address}</p>
              

             </div>
          </div>


         {/* ก้อน3 */}
         <div className="flex flex-row">
             <div className="basis-1/2 flex justify-center ...">
             <p>Medical information</p>
             <p></p>
             <p>Drug Allergy</p>
              <p className="font-bold">{memberData.drugAllergy}</p>
              <p>Congenital Disease</p>
              <p className="font-bold">{memberData.congenitalDisease}</p>
              <p>Emergency Contact</p>
              <p className="font-bold">{memberData.emergencyContact}</p>
              </div>

             <div className="basis-1/2 flex justify-center ...">
              <p>Course information</p>
              <p></p>
             
             </div>
          </div>


         </div>
      </div>
      </div>
    </div>
  );
}
