import AccountProfile from "@/app/(auth)/_components/accountprofile";
import MiddlewareProcessor from "@/app/(auth)/_components/createUser";
import FormPage from "@/app/(auth)/_components/creatediet";

import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
async function UserPage() {
  const user = await currentUser();
  const userData = {
    id: user?.id || "",
    imageUrl: user?.imageUrl || "",
    hasImage: user?.hasImage || false,
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    emailAddress: user?.emailAddresses[0]?.emailAddress || "",
  };
  return (
    <main className="mx-auto flex max-w-full flex-col justify-start px-10 py-20  text-center">
      <div className="">
        <FormPage userId={user?.id} />
      </div>
      <div className="">
        <AccountProfile
          id={userData.id}
          imageUrl={userData.imageUrl}
          hasImage={userData.hasImage}
          firstName={userData.firstName}
          lastName={userData.lastName}
          emailAddress={userData.emailAddress}
        />
      </div>
    </main>
  );
}

export default UserPage;
