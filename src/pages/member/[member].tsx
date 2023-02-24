import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import 'src/app/globals.css'

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
    <div className=" bg-black flex-row  w-full h-full">
      <div className="flex justify-center ">
        <div className=" bg-[#D9D9D9] rounded-2xl m-10">
          <img className=" rounded-full w-96 h-96 m-20 border-8 border-[#E2FEA7]" src={memberData.profilePic}/>
          <div className=" flex-row justify-center m-10">
            <h1 className="text-1xl font-bold underline">{memberData.nameEng}</h1>
            <p>{memberData.nameTh}</p>
            <p>{memberData.address}</p>
            <p>{memberData.nameTh}</p>
            <p>{memberData.address}</p>
            <p>{memberData.nameTh}</p>
            <p>{memberData.address}</p>
            <p>{memberData.nameTh}</p>
            <p>{memberData.address}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
