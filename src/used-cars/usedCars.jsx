import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import CarCard from "../components/CarCard";
import { getDocs, collection } from "firebase/firestore";
import { db } from "../../configs/firebase-config";

function UsedCars() {
  const [carsList, setCarsList] = useState([]);
  const carsRef = collection(db, "cars");
  useEffect(() => {
    const getCarsList = async () => {
      try {
        const data = await getDocs(carsRef);
        const filterdData = data.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setCarsList(filterdData);
      } catch (err) {
        console.error(err);
      }
    };
    getCarsList();
  }, []);
  return (
    <div>
      <Header />
      <div className="px-10 md:px-20 my-20">
        <h2 className="font-bold text-2xl">Used Cars</h2>
        <div className="flex flex-wrap gap-10 items-start my-6">
          {carsList.map((car, index) => {
            return <CarCard car={car} key={index} />;
          })}
        </div>
      </div>
    </div>
  );
}

export default UsedCars;
