import { notFound } from "next/navigation";
import { connectToDatabase } from "@/app/lib/mongodb";
import QuickPage from "@/models/QuickPage";

export async function getServerSideProps({ params }) {
  const { companyName } = params;

  await connectToDatabase();

  const quickPage = await QuickPage.findOne({ companyName });

  if (!quickPage) {
    return { notFound: true }; // Show 404 if not found
  }

  return {
    props: { quickPage: JSON.parse(JSON.stringify(quickPage)) },
  };
}

export default function QuickPageDisplay({ quickPage }) {
  if (!quickPage) return notFound();

  return (
    <div className="p-6 bg-white min-h-screen">
      <h1 className="text-3xl font-bold">{quickPage.companyName}</h1>
      <img src={quickPage.logo} alt="Company Logo" className="w-24 h-24 mt-4" />
      <p className="text-gray-600 mt-2">{quickPage.companyTagLine}</p>
      <p className="mt-4">{quickPage.companyAbout}</p>

      {/* Add more sections based on stored QuickPage data */}
    </div>
  );
}
