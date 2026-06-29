import { Field, PrimaryButton, SectionTitle } from "./profilelib";
import { Lock } from "lucide-react";
interface ProfilePassFormProps {
  currentPassword: string;
  setCurrentPassword: (v: string) => void;
  newPassword: string;
  setNewPassword: (v: string) => void;
  confirmPassword: string;
  setConfirmPassword: (v: string) => void;
  onUpdatePassword: (e: React.FormEvent<HTMLFormElement>) => void;
}
export default function ProfilePassForm({
  currentPassword,
  setCurrentPassword,
  newPassword,
  setNewPassword,
  confirmPassword,
  setConfirmPassword,
  onUpdatePassword,
}: ProfilePassFormProps) {
  return (
    <>
      <form
        onSubmit={onUpdatePassword}
        className="border-t border-slate-100 px-6 py-8 sm:px-10"
      >
        <SectionTitle>Change password</SectionTitle>
        <div className="mt-4 space-y-4">
          <Field
            id="currentPassword"
            label="Current password"
            type="password"
            icon={<Lock className="h-4 w-4" />}
            value={currentPassword}
            onChange={setCurrentPassword}
            placeholder="••••••••"
            autoComplete="current-password"
          />
          <Field
            id="newPassword"
            label="New password"
            type="password"
            icon={<Lock className="h-4 w-4" />}
            value={newPassword}
            onChange={setNewPassword}
            placeholder="At least 8 characters"
            autoComplete="new-password"
          />
          <Field
            id="confirmPassword"
            label="Confirm new password"
            type="password"
            icon={<Lock className="h-4 w-4" />}
            value={confirmPassword}
            onChange={setConfirmPassword}
            placeholder="Repeat new password"
            autoComplete="new-password"
          />
        </div>
        <div className="mt-8 flex justify-end">
          <PrimaryButton type="submit">Update password</PrimaryButton>
        </div>
      </form>
    </>
  );
}
