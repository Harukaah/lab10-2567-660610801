"use client";

import React, { useState } from "react";
import { IconChevronDown, IconChevronUp } from "@tabler/icons-react";
import UserCardDetail from "./UserCardDetail";
import { UserCardProps } from "@/libs/types";

export default function UserCard({ name, imgUrl, address, email } : UserCardProps) {
    // State to track whether the details are shown or not
  const [isDetailShown, setIsDetailShown] = useState(false);

    // Function to toggle the visibility of user details
  const userCardOnClick = () => {
    setIsDetailShown(!isDetailShown);
  };

  return (
    <div className="border-bottom">
      <div className="d-flex align-items-center p-3" onClick={userCardOnClick}>
        {/* User avatar */}
        <img src={imgUrl} width="90px" className="rounded-circle me-4" alt={`${name}'s avatar`} />
        {/* User name */}
        <span className="text-center display-6 me-auto">{name}</span>

        {/* Icon to show or hide details */}
        {isDetailShown ? <IconChevronUp /> : <IconChevronDown />}
      </div>
      {/* User details shown when isDetailShown is true */}
      {isDetailShown && (
        <div className="p-3">
          <UserCardDetail email={email} address={address} />
        </div>
      )}
    </div>
  );
}
