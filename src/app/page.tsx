import Link from "next/link"
export default function Home() {
  return (
    <div>
<h1 className="text-1xl font-bold underline ">
      Hello world!!
    </h1>
    <Link href="/member">
    go to member
    </Link>
    </div>
  )
}