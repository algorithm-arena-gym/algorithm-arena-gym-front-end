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
      <div className="grid place-items-center h-screen font-AzeretMono">
        <div className="rounded-3xl m-6 w-9/12 text-black bg-[#D9D9D9]">
          <div className="rounded-3xl rounded-b-none  w-full h-[100px] text-black bg-[#FFFFFF]">
             {/* ก้อน1 */}
             <div>
           <div className="flex justify-start ... ">
           <img className=" rounded-full w-32 h-32 m-6 border-8 border-[#FFFFFF] " src={memberData.profilePic}/>
           <div>
            <div className="grid place-items-center">
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
            </div>
          </div>
          
          {/* ก้อน2 */}
          <p className="ml-10 pt-16">Member information</p>
          <div className="flex flex-row mb-6">
            <div className="basis-1/2 flex justify-start ...">
              <div className="grid ml-10  ">

              <span font-light text-base>Name(Eng)</span>
              <span className="font-semibold text-xl ">{memberData.nameEng}</span>

              <span font-light text-base>Name(TH)</span>
              <span className="font-semibold text-xl ">{memberData.nameTh}</span>

              <span font-light text-base>Rank</span>
              <p className="font-semibold text-xl">ID : เด๋วโยง{memberData.rankID}</p>

              <span font-light text-base>Point</span>
              <span className="font-semibold text-xl">{memberData.point}</span>
              </div>
             </div>
             
             <div className="basis-1/2 flex justify-start ...">
              <div className="grid  ">

              <span font-light text-base>Citizen ID</span>
              <span className="font-semibold text-xl ">{memberData.cID}</span>

              <span font-light text-base>Phone number</span>
              <span className="font-semibold text-xl ">{memberData.phone}</span>

              <span font-light text-base>Email</span>
              <span className="font-semibold text-xl ">{memberData.email}</span>

              <span font-light text-base>Address</span>
              <span className="font-semibold text-xl ">{memberData.address}</span>
              </div>
             </div>
             
          </div>


         {/* ก้อน3 */}
         <div className="flex flex-row">
            <div className="basis-1/2 flex justify-start ...">
              <div className="grid ml-10  ">
              <p>Medical information</p>
              <p></p>
              <span font-light text-base>Drug Allergy</span>
              <span className="font-semibold text-xl ">{memberData.drugAllergy}</span>

              <span font-light text-base>Congenital Disease</span>
              <span className="font-semibold text-xl ">{memberData.congenitalDisease}</span>

              <span font-light text-base>Emergency Contact</span>
              <span className="font-semibold text-xl ">{memberData.emergencyContact}</span>
              </div>
            </div>
             <div className="basis-1/2 flex justify-start ...">
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
