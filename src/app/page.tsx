import RegistrationForm from "@/components/forms/RegistrationForm";
import TestBackendClient from "@/components/test/TestBackendClient";

export default function Home() {
  return (
    <>
      <RegistrationForm />
      <TestBackendClient />
    </>
  );
}
