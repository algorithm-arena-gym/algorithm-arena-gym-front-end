import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import 'src/app/globals.css';
import TabNavbar from "src/app/navbar/navbar.js";




export default function MemberEdit() {
  

  return (
    <div>
      <div>
        <TabNavbar />
      </div>

      <p>MemberEdit</p>
    </div >
  );
}
