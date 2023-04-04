import Link from 'next/link';
import { useEffect, useState } from 'react';
import 'src/app/globals.css'
import TabNavbar from "src/app/navbar/navbar.js";

interface Rank {
  rankID:number,
  rankPic: string;
  rankName : string,
  rankDetail: string,
  createAt: Date;
  
}


export default function allRank() {
  const [rankData, setData] = useState<Rank | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);

      try {
        const res = await fetch('http://localhost:4000/rank');
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

  if (!rankData) {
    return <div>No data to display.</div>;
  }

  const ranks = JSON.parse(JSON.stringify(rankData));

     return (
      <div>
      <div>
        <TabNavbar />
      </div>
      <div className=' bg-black'>
    <div className=' bg-black flex flex-wrap p-5'>
      {ranks.map((rank:Rank) => (
        <div>
          <Link href={`/rank/${rank.rankID}`}>
        
        </Link>
        </div>
      ))}
      
    </div>
   
    </div>
    </div>
  )
}
