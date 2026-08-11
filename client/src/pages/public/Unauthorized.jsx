import {
  ArrowLeft,
  Home,
  ShieldX,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Unauthorized() {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-6">
      <div className="w-full max-w-lg text-center">
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-3xl bg-red-50">
          <ShieldX
            size={38}
            className="text-red-500"
          />
        </div>

        <p className="text-sm font-bold uppercase tracking-widest text-red-500">
          Access Denied
        </p>

        <h1 className="mt-3 text-4xl font-bold text-slate-900">
          Unauthorized access
        </h1>

        <p className="mx-auto mt-3 max-w-md text-slate-500">
          You don't have permission to access this page with your current account.
        </p>

        <div className="mt-7 flex justify-center gap-3">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
          >
            <ArrowLeft size={17} />
            Go Back
          </button>

          <button
            type="button"
            onClick={() => navigate("/")}
            className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 px-5 py-3 text-sm font-semibold text-white shadow-md shadow-blue-200 transition hover:from-blue-700 hover:to-cyan-600"
          >
            <Home size={17} />
            Home
          </button>
        </div>
      </div>
    </div>
  );
}