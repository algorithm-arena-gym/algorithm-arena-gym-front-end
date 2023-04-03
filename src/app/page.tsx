import Link from "next/link";

export default function Home() {
  return (
    <div>
<h1 className="text-1xl font-anton underline ">
      Hello world!!
    </h1>
    <Link href="/main">
    go to member
    </Link>
    </div>
  )
}