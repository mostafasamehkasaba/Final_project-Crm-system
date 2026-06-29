"use client";

import { Camera, User } from "lucide-react";
import Image from "next/image";

interface ProfileHeaderProps {
  avatar: string | null;
  fullName: string;
  email: string;
  onPickAvatar: (e: React.ChangeEvent<HTMLInputElement>) => void;
  fileRef: React.RefObject<HTMLInputElement | null>;
}
export default function ProfileHeader({
  avatar,
  fullName,
  email,
  onPickAvatar,
  fileRef,
}: ProfileHeaderProps) {
  return (
    <>
      <div className="flex flex-col items-center gap-3 px-6 pb-6 pt-10 sm:px-10">
        <div className="relative ">
          <div className="h-24 w-24 overflow-hidden rounded-full bg-slate-100 ring-4 ring-green-100 ">
            {avatar ? (
              <Image
                src={avatar}
                alt="Profile"
                width={96}
                height={96}
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center text-slate-400">
                <User className="h-10 w-10" />
              </div>
            )}
          </div>
          <button
            type="button"
            onClick={() => fileRef.current?.click()}
            aria-label="Change photo"
            className="absolute -bottom-1 -right-1 inline-flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-green-600 text-white shadow-md ring-2 ring-white transition-colors hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            <Camera className="h-4 w-4" />
          </button>
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={onPickAvatar}
          />
        </div>
      </div>
      <div className="text-center mt-14">
        <h1 className="text-xl font-semibold text-slate-900">
          {fullName || "Your name"}
        </h1>
        <p className="text-sm text-slate-500">{email || "your@email.com"}</p>
      </div>
    </>
  );
}
