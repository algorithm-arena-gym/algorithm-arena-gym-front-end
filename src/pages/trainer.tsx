import Link from 'next/link';
import { useEffect, useState } from 'react';
import 'src/app/globals.css'
import TabNavbar from "src/app/navbar/navbar.js";
import "src/app/rankcard.css";

interface Trainer {
  trainerID: number,
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

  const trainers = JSON.parse(JSON.stringify(trainerData));

  return (
    <body className=' bg-black'>
      <div>
        <TabNavbar />
      </div>
      <div className='grid gap-6 grid-cols-3 place-content-center md:px-20 pt-10'>
        {trainers.map((trainer: Trainer) => (
          <div className='bg-[#D9D9D9] p-4 rounded-3xl  w-70'>
            <Link href={`/trainer/${trainer.trainerID}`}>
              <div className='flex flex-row '>
                <img className='flex border-[#E2FEA7] border-4 w-20 h-20 rounded-full' src={trainer.profilePic} alt="profilePicture" />
                <div className='pl-4'>
                  <p className="font-semibold text-lg">{trainer.nameEng}</p>
                  <p className="font-semibold text-md">Phone : {trainer.phone}</p>

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

