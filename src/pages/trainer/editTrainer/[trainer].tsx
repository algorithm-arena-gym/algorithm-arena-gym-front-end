import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import 'src/app/globals.css';
import TabNavbar from "src/app/navbar/navbar.js";
import { Formik, Form, Field, ErrorMessage } from 'formik';

interface Trainer {
    trainerID: number;
    nameEng: string;
    nameTh: string;
    profilePic: string;
    phone: string;
    email: string;
    cID: string;
    drugAllergy: string;
    congenitalDisease: string;
    address: string;
    emergencyContact: string;
    hireDate: Date;
}
interface Member {
  memberID: number;
  nameEng: string;
  trainingDate: string;
  trainingTime: string;
  
}

interface Course {
  courseID: number,
  courseName: string,
  memberID: number;

  courseDateTimeID: number;
  courseDate: string;
  courseTime: string;

  createAt: Date;
}

const updateValues = {
    nameEng: null,
    nameTh: null,
    cID: null,
    phone: null,
    email: null,
    address: null,

    profilePic: null,

    drugAllergy: 'None',
    congenitalDisease: 'None',
    emergencyContact: null,

    memberID: null,
    day: null,
    time: null,

    courseID: null,

}


export default function TrainerEdit() {
  const router = useRouter();
  const [trainerData, setTrainerData] = useState<Trainer | null>(null);

  const [memberData, setMemberData] = useState<Member | null>(null);
  const [courseData, setCourseData] = useState<Course | null>(null);
  const [loading, setLoading] = useState(false);

  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const trainerID = router.query.trainer as string;
        const apiURL = `http://localhost:4000/trainer/${trainerID}`;
        const res = await fetch(apiURL);
        const json = await res.json();
        setTrainerData(json[0]);
        setError(null);
      } catch (error) {
        console.error(error);
        setError("An error occurred while fetching the data.");
        setTrainerData(null);
      }
      setLoading(false);
    }

    fetchData();
  }, [router.query.trainer]);

  return (
    <div>
      <div>
        <TabNavbar />
      </div>

      <p>editTrainer</p>

      <Formik
                initialValues={updateValues}
                onSubmit={(values, action) => {
                    console.log(values)
                }}
            >
                {({ isSubmitting }) => (
                    <Form>
                        <div className=" bg-black w-full h-full">
                            <div className="grid place-items-center  font-AzeretMono">
                                <div className="rounded-3xl m-6 w-9/12 pb-6 text-black bg-[#D9D9D9]">
                                    <div className="rounded-3xl rounded-b-none  w-full h-[95px] text-black bg-[#FFFFFF]">
                                        {/* ก้อน1 */}
                                        <div className="flex flex-row ">
                                            <div className="basis-5/6 flex justify-start ...">
                                                <img className=" rounded-full w-36 h-36 m-6 border-8 border-[#FFFFFF] " src={trainerData?.profilePic} />
                                                <div>
                                                    <div className="grid pt-24 ">
                                                        <span className="font-semibold text-4xl">Edit Trainer</span>
                                                        <span className="font-light text-3xl pb-24" >ID : {trainerData?.trainerID}</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="basis-1/6 flex justify-end ...mr-10">
                                                <button type="submit" disabled={isSubmitting} className="bg-[#1CDF99]  rounded-md h-10 p-2 mt-5 mr-5 font-semibold text-white-base" >SAVE</button>
                                            </div>
                                        </div>
                                    </div>




                                    {/* ก้อน2 */}
                                    <p className="ml-32  mt-28 text-base">Member information</p>
                                    <hr className="ml-20 mr-20 my-3 bg-[#000000]  " />
                                    <div className="flex flex-row mb-6">
                                        <div className="basis-1/2 flex justify-start ...">
                                            <div className="grid ml-32 ">

                                                <label className="font-light text-base">Name(Eng)</label>
                                                <div className="mt-2">
                                                    <Field type="string" name="nameEng"
                                                        className="font-semibold text-xl rounded-md block w-full" 
                                                        placeholder={trainerData?.nameEng}
                                                    />
                                                </div>

                                                <label className="font-light text-base ">Name(TH)</label>
                                                <div className="mt-2">
                                                    <Field type="string" name="nameTh"
                                                        className="font-semibold text-xl rounded-md block w-full" 
                                                        placeholder={trainerData?.nameTh}
                                                    />
                                                </div>

                                                <label className="font-light text-base  ">Citizen ID</label>
                                                <div className="mt-2">
                                                    <Field type="string" name="cID"
                                                        className="font-semibold text-xl rounded-md block w-full" 
                                                        placeholder={trainerData?.cID}
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="basis-1/2 flex justify-start ...">
                                            <div className="grid ">


                                                <label className="font-light text-base ">Phone number</label>
                                                <div className="mt-8">
                                                    <Field type="string" name="phone"
                                                        className="font-semibold text-xl rounded-md block w-full" 
                                                        placeholder={trainerData?.phone}
                                                    />
                                                </div>

                                                <label className="font-light text-base mt-6">Email</label>
                                                <div className="mt-8">
                                                    <Field type="email" name="email"
                                                        className="font-semibold text-xl rounded-md block w-full"
                                                        placeholder={trainerData?.email}
                                                    />
                                                </div>

                                                <label htmlFor="first-name" className="font-light text-base mt-6">Address</label>
                                                <div className="mt-8">
                                                    <Field type="string" name="address" as="textarea"
                                                        rows={2}
                                                        className="font-semibold text-xl rounded-md block w-full" 
                                                        placeholder={trainerData?.address}
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                    </div>


                                    {/* ก้อน3 */}
                                    <div>
                                        <p className="ml-32">Medical information</p>
                                        <hr className="ml-20 mr-20 my-3 bg-[#000000]  " />
                                        <div className="flex flex-row ">
                                            <div className="basis-1/3 ">
                                                <div>
                                                    <div className="grid ml-32">
                                                        <label htmlFor="first-name" className="font-light text-base ">Drug Allergy</label>
                                                        <div className="mt-2">
                                                            <Field type="string" name="drugAllergy"
                                                                className="font-semibold text-xl rounded-md block w-full" 
                                                                 placeholder={trainerData?.drugAllergy}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="basis-1/3 flex justify-center ...">
                                                <div >
                                                    <div className="grid ">
                                                        <label htmlFor="first-name" className="font-light text-base ">Congenital Disease</label>
                                                        <div className="mt-2">
                                                            <Field type="string" name="congenitalDisease"
                                                                className="font-semibold text-xl rounded-md block w-full" 
                                                                 placeholder={trainerData?.congenitalDisease}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="basis-1/3 flex justify-start ...">
                                                <div>
                                                    <div className="grid mr-20">
                                                        <label htmlFor="first-name" className="font-light text-base ">Emergency Contact</label>
                                                        <div className="mt-2">
                                                            <Field type="string" name="emergencyContact"
                                                                className="font-semibold text-xl rounded-md block w-full" 
                                                                 placeholder={trainerData?.emergencyContact}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* ก้อน4 */}

                                    <div>
                                        <div className="flex flex-row mb-6 ">
                                            <div className="basis-1/2 ">
                                                <p className="ml-32  mt-8 text-base">Trainer Information</p>
                                                <hr className="ml-20 mr-5 my-3 bg-[#000000]" />
                                                <div className="flex flex-row ">
                                                    <div className="basis-1/3 ">
                                                        <div>
                                                            <div className="grid ml-20">
                                                                <span className="font-light text-base ">Name</span>
                                                                <span className="font-semibold text-xl ">ดึงname</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="basis-1/3 flex justify-center ... ">
                                                        <div>
                                                            <div className="grid  ">
                                                                <label htmlFor="first-name" className="font-light text-base ">Days</label>
                                                                <div className="mt-2">
                                                                    <select
                                                                        id="country"
                                                                        name="country"
                                                                        autoComplete="off"
                                                                        className="font-semibold text-xl rounded-md block w-full"
                                                                    >
                                                                        <option>Sunday</option>
                                                                        <option>Monday</option>
                                                                        <option>Tuesday</option>
                                                                        <option>Wednesday</option>
                                                                        <option>Thrusday</option>
                                                                        <option>Friday</option>
                                                                        <option>Saturday</option>

                                                                    </select>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="basis-1/3 flex justify-center ...">
                                                        <div>
                                                            <div className="grid ">
                                                                <label htmlFor="first-name" className="font-light text-base ">Time</label>
                                                                <div className="mt-2 ">
                                                                    <select
                                                                        id="country"
                                                                        name="country"
                                                                        autoComplete="off"
                                                                        className="font-semibold text-xl rounded-md block w-full "
                                                                    >
                                                                        <option>10-11</option>
                                                                        <option>11-12</option>
                                                                        <option>12-13</option>
                                                                        <option>13-14</option>
                                                                        <option>14-15</option>
                                                                        <option>15-16</option>
                                                                        <option>16-17</option>
                                                                        <option>17-18</option>
                                                                        <option>18-19</option>
                                                                        <option>19-20</option>
                                                                    </select>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>



                                                </div>
                                                <div className=" text-black bg-[#FFFFFF] text-xl rounded-md  ml-20 mr-5 mt-3  flex justify-center">+</div>


                                            </div>
                                            <div className="basis-1/2">
                                                <p className=" ml-10 mt-8 text-base">Registered Course</p>
                                                <hr className="mr-20 my-3 bg-[#000000]" />
                                                <div className="flex flex-row ">
                                                    <div className="basis-1/3 ">
                                                        <div>
                                                            <div className="grid ">
                                                                <span className="font-light text-base ">Name</span>
                                                                <span className="font-semibold text-xl ">ดึงname</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="basis-1/3 flex justify-start ... ">
                                                        <div>
                                                            <div className="grid  ">
                                                                <label className="font-light text-base ">Days</label>
                                                                <div className="mt-2">
                                                                    <Field type="string" name="day" as="select" className="font-semibold text-xl rounded-md block w-full">

                                                                        <option value="Sunday" className="font-semibold text-xl w-full">Sunday</option>
                                                                        <option value="Monday" className="font-semibold text-xl w-full">Monday</option>
                                                                        <option value="Tuesday" className="font-semibold text-xl w-full">Tuesday</option>
                                                                        <option value="Wednesday" className="font-semibold text-xl w-full">Wednesday</option>
                                                                        <option value="Thrusday" className="font-semibold text-xl w-full">Thrusday</option>
                                                                        <option value="Friday" className="font-semibold text-xl w-full">Friday</option>
                                                                        <option value="Saturday" className="font-semibold text-xl w-full">Saturday</option>

                                                                    </Field>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="basis-1/3 ">
                                                        <div>
                                                            <div className="grid ">
                                                                <label className="font-light text-base ">Time</label>
                                                                <div className="mt-2 mr-20">
                                                                    <Field type="string" name="day" as="select" className="font-semibold text-xl rounded-md block w-full">

                                                                        <option value="10-11" className="font-semibold text-xl w-full">10-11</option>
                                                                        <option value="11-12" className="font-semibold text-xl w-full">11-12</option>
                                                                        <option value="12-13" className="font-semibold text-xl w-full">12-13</option>
                                                                        <option value="13-14" className="font-semibold text-xl w-full">13-14</option>
                                                                        <option value="14-15" className="font-semibold text-xl w-full">14-15</option>
                                                                        <option value="15-16" className="font-semibold text-xl w-full">15-16</option>
                                                                        <option value="16-17" className="font-semibold text-xl w-full">16-17</option>
                                                                        <option value="17-18" className="font-semibold text-xl w-full">17-18</option>
                                                                        <option value="18-19" className="font-semibold text-xl w-full">18-19</option>
                                                                        <option value="19-20" className="font-semibold text-xl w-full">19-20</option>

                                                                    </Field>

                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className=" text-black bg-[#FFFFFF] text-xl rounded-md   mr-20 mt-3  flex justify-center">+</div>


                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>



                    </Form>
                )}
            </Formik>
    </div >
  );
}
