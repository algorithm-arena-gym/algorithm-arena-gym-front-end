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
          <div className="rounded-3xl m-6 w-9/12 pb-6 text-black bg-[#D9D9D9]">
            <div className="rounded-3xl rounded-b-none  w-full h-[95px] text-black bg-[#FFFFFF]">
              {/* ก้อน1 */}

              <div className="flex flex-row ">
                <div className="basis-3/4 flex justify-start ...">
                  <img className=" rounded-full w-36 h-36 m-6 border-8 border-[#FFFFFF] " src={memberData.profilePic} />
                  <div>
                    <div className="grid pt-24 ">
                      <span className="font-semibold text-4xl">{memberData.nameEng}</span>
                      <span className="font-light text-3xl" >ID : {memberData.memberID}</span>
                    </div>
                  </div>
                </div>
                <div className="basis-1/4 flex justify-end ...mr-10">
                  <button className="bg-[#FCD34D] rounded-md border-black h-10 p-2 mt-5 mr-5 font-semibold text-base pl-4 pr-4"> EDIT</button>
                  <button className="bg-[#EF4444]  rounded-md h-10 p-2 mt-5 mr-5 font-semibold text-white-base" >DELETE</button>
                </div>
              </div>


            </div>



            {/* ก้อน2 */}
            <p className="ml-32 pt-24 text-base">Member information</p>
            <hr className="ml-20 mr-20 my-3 bg-[#000000] border-10 " />
            <div className="flex flex-row mb-6">
              <div className="basis-1/2 flex justify-start ...">
                <div className="grid ml-32 ">

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
                <div className="grid ">
                  <p className="ml-32">Medical information</p>
                  <hr className="ml-20  my-3 bg-[#000000] border-10 " />
                  <div className="grid ml-32">
                  <span font-light text-base>Drug Allergy</span>
                  <span className="font-semibold text-xl ">{memberData.drugAllergy}</span>

                  <span font-light text-base>Congenital Disease</span>
                  <span className="font-semibold text-xl ">{memberData.congenitalDisease}</span>

                  <span font-light text-base>Emergency Contact</span>
                  <span className="font-semibold text-xl ">{memberData.emergencyContact}</span>
                </div>
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
