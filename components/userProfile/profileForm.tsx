import { MapPin, Phone, User } from "lucide-react";
import { Field, PrimaryButton, SectionTitle } from "./profilelib";

interface ProfileFormProps {
  fullName: string;
  setFullName: (v: string) => void;
  email: string;
  setEmail: (v: string) => void;
  phone: string;
  setPhone: (v: string) => void;

  // Address
  street: string;
  setStreet: (v: string) => void;
  city: string;
  setCity: (v: string) => void;
  country: string;
  setCountry: (v: string) => void;

  // Submit
  onSaveProfile: (e: React.FormEvent<HTMLFormElement>) => void;
}
export default function ProfileForm({
  fullName,
  setFullName,

  phone,
  setPhone,
  street,
  setStreet,
  city,
  setCity,
  country,
  setCountry,
  onSaveProfile,
}: ProfileFormProps) {
  return (
    <>
      <form
        onSubmit={onSaveProfile}
        className="border-t border-slate-100 px-6 py-8 sm:px-10"
      >
        <div className="mt-4 space-y-4">
          <Field
            id="fullName"
            label="اسم العميل"
            icon={<User className="h-4 w-4" />}
            value={fullName}
            onChange={setFullName}
            placeholder="اسم العميل"
            autoComplete="name"
          />

          <Field
            id="phone"
            label="Phone"
            type="tel"
            icon={<Phone className="h-4 w-4" />}
            value={phone}
            onChange={setPhone}
            placeholder="+1 555 000 0000"
            autoComplete="tel"
          />
        </div>
        <div className="mt-8">
          <SectionTitle>العنوان</SectionTitle>
          <div className="mt-4 space-y-4">
            <Field
              id="street"
              label="الشارع"
              icon={<MapPin className="h-4 w-4" />}
              value={street}
              onChange={setStreet}
              placeholder="اسم الشارع"
              autoComplete="street-address"
            />
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Field
                id="city"
                label="المدينه"
                value={city}
                onChange={setCity}
                placeholder="المدينه"
                autoComplete="address-level2"
              />
            </div>
            <Field
              id="country"
              label="المحافظه"
              value={country}
              onChange={setCountry}
              placeholder="المحافظه"
              autoComplete="country-name"
            />
          </div>
        </div>
        <div className="mt-8 flex justify-end">
          <PrimaryButton type="submit">حفظ</PrimaryButton>
        </div>
      </form>
    </>
  );
}
