import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-lime-200 via-blue-100 to-lime-200 flex justify-center items-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl overflow-hidden max-w-md w-full">
        <div className="p-8 ">
          <h2 className="text-3xl font-bold text-center mb-6 bg-clip-text text-transparent bg-gradient-to-r from-lime-500 to-blue-600">
            Welcome to Ride Karo
          </h2>
          <SignIn />
        </div>
      </div>
    </div>
  );
}
