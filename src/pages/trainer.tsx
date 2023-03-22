import Link from 'next/link';
import { useEffect, useState } from 'react';
import 'src/app/globals.css'
import TabNavbar from "src/app/navbar/navbar.js";

interface Trainer {
  trainerID:number,
  nameEng: string,
  nameTh: string,
  profilePic: string,
  phone: string,
  email: string,
  cID: string,
  drugAllergy: string,
  congenitalDisease: string,
  emergencyContact: string,
  hireDate: Date,
  address: string,
}


export default function Trainer() {
  const [trainerData, setData] = useState<Trainer | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);

      try {
        const res = await fetch('http://localhost:4000/trainer');
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

  if (!trainerData) {
    return <div>No data to display.</div>;
  }

  const trainers =JSON.parse(JSON.stringify(trainerData));

     return (
      <div>
      <div>
        <TabNavbar />
      </div>
<div className=' bg-black flex flex-wrap justify-around p-5'>
      {trainers.map((trainer:Trainer) => (
        <div>
          <Link href={`/trainer/${trainer.trainerID}`}>
        <div className=' bg-[#D9D9D9] p-5 flex mlr-10 rounded-3xl m-5 content-center  w-96'>
          <img className=' border-[#E2FEA7] border-4 w-20 h-20 rounded-full' src={trainer.profilePic} alt="profilePicture"/>
          <div className=' ml-10'>
            <p>{trainer.nameEng}</p>
            <p className=''>Phone : {trainer.phone}</p>
            
          </div>
        </div>
        </Link>
        </div>
      ))}
    </div>
    </div>
    
  )
}

