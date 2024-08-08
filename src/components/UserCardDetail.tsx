"use client";

import { UserCardDetailProps } from "@/libs/types";
import { IconMailForward, IconMapPins } from "@tabler/icons-react";

// This component displays the email and address details of a user
export default function UserCardDetail({ email, address }: UserCardDetailProps) {
  return (
    <div className="text-center">
      {/* Display email with an icon */}
      <p>
        <IconMailForward /> {email}
      </p>
      {/* Display address with an icon */}
      <p>
        <IconMapPins /> {address}
      </p>
    </div>
  );
}
