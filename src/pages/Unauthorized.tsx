import { Link } from "react-router-dom";

export default function Unauthorized() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-navy-950 text-white">

      <h1 className="text-5xl font-bold text-red-500">
        403
      </h1>

      <h2 className="text-2xl mt-4">
        Access Denied
      </h2>

      <p className="text-gray-400 mt-2">
        You don't have permission to access this page.
      </p>

      <Link
        to="/dashboard"
        className="mt-6 px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700"
      >
        Back to Dashboard
      </Link>

    </div>
  );
}