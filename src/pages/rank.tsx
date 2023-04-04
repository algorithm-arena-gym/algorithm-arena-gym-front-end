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
                <div>
                    <TabNavbar />
                </div>

                <div className=' flex flex-wrap p-10 '> {/*rank all*/}
                    {ranks.map((rank: Rank) => ( ///loop course
                        <div >
                            <Link href={`/member/${rank.rankID}`}>
                                <div className="card">
                                    <img src={rank.rankPic} />
                                    <div className="cardcontainer">
                                        <p className="title">{rank.rankName}</p>

                                    </div>
                                </div>

                            </Link>
                        </div>
                    ))}

                    {/* button add */}
                    < div >
                        <div className="card" >
                            <button type="button" className="btn" >+</button>
                        </div>
                    </div>
                </div>

            </div>
        </body>

    )
}