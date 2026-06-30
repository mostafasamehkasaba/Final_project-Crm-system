import Cookies from "js-cookie";

const BASE_URL = "https://back-end-crm-project.vercel.app/api/bookings";

export interface ICreateBooking {
  property_id: string;
  name: string;
  email: string;
  phone: string;
}

export interface IUpdateBookingStatus {
  status: "pending" | "approved" | "rejected";
}

const getHeaders = () => {
  const token = Cookies.get("admin_token");

  return {
    "Content-Type": "application/json",
    ...(token && {
      Authorization: `Bearer ${token}`,
    }),
  };
};

/* ==========================
   Create Booking
========================== */

export const createBooking = async (
  data: ICreateBooking
) => {
  const res = await fetch(`${BASE_URL}/add`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const result = await res.json();

  if (!res.ok) {
    throw new Error(
      result.message || "حدث خطأ أثناء إنشاء الحجز"
    );
  }

  return result;
};

/* ==========================
   Get All Bookings
========================== */

export const getAllBookings = async () => {
  const res = await fetch(BASE_URL, {
    method: "GET",
    headers: getHeaders(),
  });

  const result = await res.json();

  if (!res.ok) {
    throw new Error(
      result.message || "فشل في جلب الحجوزات"
    );
  }

  return result;
};

/* ==========================
   Get Booking By Id
========================== */

export const getBookingById = async (
  bookingId: string
) => {
  const res = await fetch(
    `${BASE_URL}/${bookingId}`,
    {
      method: "GET",
      headers: getHeaders(),
    }
  );

  const result = await res.json();

  if (!res.ok) {
    throw new Error(
      result.message || "فشل في جلب بيانات الحجز"
    );
  }

  return result;
};

/* ==========================
   Update Booking Status
========================== */

export const updateBookingStatus = async (
  bookingId: string,
  status: "pending" | "approved" | "rejected"
) => {
  const res = await fetch(
    `${BASE_URL}/${bookingId}`,
    {
      method: "PATCH",
      headers: getHeaders(),
      body: JSON.stringify({ status }),
    }
  );

  const result = await res.json();

  if (!res.ok) {
    throw new Error(
      result.message || "فشل في تحديث حالة الحجز"
    );
  }

  return result;
};

/* ==========================
   Delete Booking
========================== */

export const deleteBooking = async (
  bookingId: string
) => {
  const res = await fetch(
    `${BASE_URL}/${bookingId}`,
    {
      method: "DELETE",
      headers: getHeaders(),
    }
  );

  const result = await res.json();

  if (!res.ok) {
    throw new Error(
      result.message || "فشل في حذف الحجز"
    );
  }

  return result;
};