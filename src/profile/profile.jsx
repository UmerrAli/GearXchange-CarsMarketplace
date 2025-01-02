import React from "react";
import Header from "../components/Header";
import { Button } from "../components/ui/button";
import { Link } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";
import { db } from "../../configs/firebase-config";
import CarCard from "../components/CarCard";
import { useState, useEffect } from "react";
import { query, getDocs, collection, where } from "firebase/firestore";

function Profile() {
  const { user } = useUser();
  const [carsList, setCarsList] = useState([]);

  const getAds = async function () {
    try {
      if (user) {
        const userId = user.id;
        const q = query(collection(db, "cars"), where("user", "==", userId));
        const querySnapshot = await getDocs(q);

        const adsData = [];
        querySnapshot.forEach((doc) => {
          adsData.push({ id: doc.id, ...doc.data() });
        });
        setCarsList(adsData);
      }
    } catch (error) {
      console.error("Error fetching ads: ", error);
    }
  };

  useEffect(() => {
    getAds();
  }, [user]);

  return (
    <div>
      <Header />
      <div className="px-10 md:px-20 my-20">
        <div className="flex justify-between items-center">
          <h2 className="font-bold text-2xl">My Ads</h2>
          <Link to={"/new-ad"}>
            <Button>+ Add New</Button>
          </Link>
        </div>
        <div className="flex flex-wrap gap-10 items-start my-6">
          {carsList.map((car, index) => {
            return (
              <div>
                <CarCard car={car} key={index} />
                <Button className="mt-3">Edit</Button>
                <Button className="ml-3 mt-3">Delte</Button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Profile;
