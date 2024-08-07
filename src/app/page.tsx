"use client";

import UserCard from "@/components/UserCard";
import { cleanUser } from "@/libs/cleanUser";
import { UserApiResponse, UserCardProps } from "@/libs/types";
import axios from "axios";
import { useEffect, useState } from "react";

export default function RandomUserPage() {
  // annotate type for users state variable
  const [users, setUsers] = useState<UserCardProps[]>([]);

  const [isLoading, setIsLoading] = useState(false);
  const [genAmount, setGenAmount] = useState<number>(() => {
    // Retrieve the genAmount from localStorage when the component mounts
    const savedGenAmount = localStorage.getItem("genAmount");
    return savedGenAmount ? parseInt(savedGenAmount, 10) : 1;
  });

  useEffect(() => {
    // Save the genAmount to localStorage whenever it changes
    localStorage.setItem("genAmount", genAmount.toString());
  }, [genAmount]);


  const generateBtnOnClick = async () => {
    setIsLoading(true);
    const resp = await axios.get(
      `https://randomuser.me/api/?results=${genAmount}`
    );
    setIsLoading(false);
    const users = resp.data.results.map((user: UserApiResponse) => cleanUser(user));
    setUsers(users);
  };

  return (
    <div style={{ maxWidth: "700px" }} className="mx-auto">
      <p className="display-4 text-center fst-italic m-4">Users Generator</p>
      <div className="d-flex justify-content-center align-items-center fs-5 gap-2">
        Number of User(s)
        <input
          className="form-control text-center"
          style={{ maxWidth: "100px" }}
          type="number"
          onChange={(e) => setGenAmount(parseInt(e.target.value))}
          value={genAmount}
        />
        <button className="btn btn-dark" onClick={generateBtnOnClick}>
          Generate
        </button>
      </div>
      {isLoading && <p className="display-6 text-center fst-italic my-4">Loading ...</p>}
      {users && !isLoading && users?.map((user: any, index: number) => (
        <UserCard
          key={index}
          name={user.name}
          imgUrl={user.imgUrl}
          address={user.address}
          email={user.email}
        />
      ))}
    </div>
  );
}
