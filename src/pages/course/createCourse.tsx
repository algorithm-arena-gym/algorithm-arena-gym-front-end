import Navbar from "@/app/navbar/navbar";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import 'src/app/globals.css';
import TabNavbar from "src/app/navbar/navbar.js";

interface Course {
  courseID:number,
  createAt:Date;
  courseNAME: string,
  price:number,
  detail: string,
  profilePic: string,
  
}

export default function CourseCreate() {


    return (
        <div>
            <div>
                <TabNavbar />
            </div>
            <p>create Course</p>
            </div>
        
    );
}
