import Question from "@/components/forms/Question";
import { getQuestionById } from "@/lib/actions/question.action";
import { getUserById } from "@/lib/actions/user.action";
import { PageProps } from "@/types";
import { auth } from "@clerk/nextjs/server";

const Page = async ({ params }: PageProps) => {
  const { id: questionId } = await params;
  const { userId } = await auth();
  // const Page = async (props: { searchParams: Promise<SearchParamsProps> }) => {
  //
  if (!userId) return null;

  const mongoUser = await getUserById({ userId });
  const result = await getQuestionById({ questionId });

  return (
    <>
      <h1 className="h1-bold text-dark100_light900">Edit Question</h1>

      <div className="mt-9">
        <Question
          type="Edit"
          mongoUserId={mongoUser._id}
          questionDetails={JSON.stringify(result)}
        />
      </div>
    </>
  );
};

export default Page;
