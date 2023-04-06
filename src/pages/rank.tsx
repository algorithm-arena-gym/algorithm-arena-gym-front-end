import Link from 'next/link';
import { useEffect, useState } from 'react';
import 'src/app/globals.css'
import TabNavbar from "src/app/navbar/navbar.js";
import "src/app/rankcard.css";

interface Rank {
    rankID: number,
    rankName: string,
    rankDetail: string,
    rankPic: string
    rankPrice:number
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
        <body className='bg-black'>
            <div>
                <div >
                    <TabNavbar />
                </div>

                <div className='grid gap-6 grid-cols-1 md:grid-cols-3 place-content-center px-40 pt-10'> {/*rank all*/}
                    {ranks.map((rank: Rank) => ( ///loop course
                        <div className='grid justify-items-center p-6'>
                            <Link href={`/member/${rank.rankID}`}>
                                <div className="card">
                                    <img className='object-top' src={rank.rankPic} />
                                    <div className="cardcontainer">
                                        <p className="title font-[900]">{rank.rankName}</p>
                                        <p className='Price'>{rank.rankPrice} Bath/Month</p>

                                    </div>
                                </div>

                            </Link>
                        </div>
                    ))}

                    {/* button add */}
                    < div className='grid justify-items-center p-6'>
                        <div className="card" >
                            <button type="button" className="btn" >+</button>
                        </div>
                    </div>
                </div>

            </div>
        </body>

    )
}