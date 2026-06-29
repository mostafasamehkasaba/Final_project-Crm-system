"use client";
import Cookies from "js-cookie";

import { useEffect, useRef, useState, type ChangeEvent } from "react";
import ProfileHeader from "@/components/userProfile/profileHeader";
import ProfileForm from "@/components/userProfile/profileForm";

import ProfilePassForm from "@/components/userProfile/profilePassForm";
import {
  getProfile,
  updatePassword,
  updateProfile,
  updateProfileImage,
} from "@/services/profile.service";

export default function ProfilePage() {
  // Header state
  const [avatar, setAvatar] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement | null>(null);
  // Form state
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [street, setStreet] = useState(" ");
  const [city, setCity] = useState("");

  const [country, setCountry] = useState("");
  // --- Password fields ---------------------------------------------------
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  useEffect(() => {
    const token = Cookies.get("token") ?? "";

    const fetchProfile = async () => {
      try {
        const data = await getProfile(token);
        const user = data.user;

        setFullName(user.name);
        setEmail(user.email);
        setPhone(user.phone);
        setStreet(user.address?.street ?? "");
        setCity(user.address?.city ?? "");
        setCountry(user.address?.country ?? "");
        setAvatar(user.profileImage?.secure_url ?? null);
      } catch (err) {
        console.error(err);
      }
    };

    fetchProfile();
  }, []);
  const handlePickAvatar = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Show preview immediately
    setAvatar(URL.createObjectURL(file));

    const token = Cookies.get("token") ?? "";

    try {
      const data = await updateProfileImage(file, token);

      setAvatar(data.data.profileImage?.secure_url ?? null);
      console.log("Image uploaded:", data);
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "Failed to upload image";
      alert(message);
    }
  };
  const onSaveProfile = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    const token = Cookies.get("token") ?? "";
    try {
      const data = await updateProfile(
        {
          name: fullName,
          address: { country, city, street },
        },
        token,
      );
      console.log("Updated:", data);
    } catch (err) {
      console.error(err);
    }
  };

  const onUpdatePassword = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Basic validation
    if (newPassword !== confirmPassword) {
      alert("Passwords don't match");
      return;
    }
    if (newPassword.length < 6) {
      alert("Password must be at least 6 characters");
      return;
    }

    const token = Cookies.get("token") ?? "";

    try {
      const data = await updatePassword(
        {
          oldPassword: currentPassword,
          newPassword,
        },
        token,
      );
      console.log("Password updated:", data);
      alert("Password updated successfully!");

      // Clear fields after success
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "Something went wrong.";
      alert(message);
    }
  };
  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10 sm:py-16s">
      <div className="mx-auto w-full max-w-2xl ">
        <div className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-200/60 ">
          {/* ---------- Header ---------- */}
          <ProfileHeader
            avatar={avatar}
            fullName={fullName}
            onPickAvatar={handlePickAvatar}
            fileRef={fileRef}
            email={email}
          />
          {/* ---------- Profile form ---------- */}
          <ProfileForm
            fullName={fullName}
            setFullName={setFullName}
            email={email}
            setEmail={setEmail}
            phone={phone}
            setPhone={setPhone}
            street={street}
            setStreet={setStreet}
            city={city}
            setCity={setCity}
            country={country}
            setCountry={setCountry}
            onSaveProfile={onSaveProfile}
          />
          {/* ---------- Password ---------- */}
          <ProfilePassForm
            currentPassword={currentPassword}
            setCurrentPassword={setCurrentPassword}
            newPassword={newPassword}
            setNewPassword={setNewPassword}
            confirmPassword={confirmPassword}
            setConfirmPassword={setConfirmPassword}
            onUpdatePassword={onUpdatePassword}
          />
        </div>
      </div>
    </main>
  );
}
