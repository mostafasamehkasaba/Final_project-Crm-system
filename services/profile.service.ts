import {
  ProfileResponse,
  UpdatePasswordPayload,
  UpdateProfilePayload,
} from "@/interfaces/profile.interface";

const BASE_URL = "https://back-end-crm-project.vercel.app/api";

export async function updateProfile(
  payload: UpdateProfilePayload,
  token: string,
): Promise<ProfileResponse> {
  const res = await fetch(`${BASE_URL}/profile`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || "Failed to update profile");
  }

  return res.json();
}

export async function updatePassword(
  payload: UpdatePasswordPayload,
  token: string,
): Promise<ProfileResponse> {
  const res = await fetch(`${BASE_URL}/profile/change-password`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || "Failed to update password");
  }

  return res.json();
}
export async function getProfile(token: string): Promise<ProfileResponse> {
  const res = await fetch(`${BASE_URL}/profile`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || "Failed to fetch profile");
  }

  return res.json();
}
export async function updateProfileImage(
  file: File,
  token: string,
): Promise<{ success: boolean; data: ProfileResponse["user"] }> {
  const formData = new FormData();
  formData.append("image", file);

  const res = await fetch(`${BASE_URL}/profile/image`, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || "Failed to upload image");
  }

  return res.json();
}
