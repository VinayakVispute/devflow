import { Suspense } from "react";
import Question from "@/components/forms/Question";
import { getUserById } from "@/lib/actions/user.action";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import React from "react";

const Page = async () => {
  const { userId } = await auth();

  if (!userId) redirect("/sign-in");

  const mongoUser = await getUserById({ userId });

  return (
    <div>
      <h1 className="h1-bold text-dark100_light900">Ask a question</h1>
      <div className="mt-9">
        <Suspense fallback={<div>Loading...</div>}>
          <Question mongoUserId={JSON.stringify(mongoUser?._id)} />
        </Suspense>
      </div>
    </div>
  );
};
export default Page;
