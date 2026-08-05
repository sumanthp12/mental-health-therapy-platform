import { Eye, CreditCard, Mail, UserCheck } from "lucide-react";

const ClientCard = ({
  client,
  onClick,
  onRequestPayment,
}) => {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-800">
            {client.name}
          </h3>

          <div className="mt-2 flex items-center gap-2 text-sm text-gray-500">
            <Mail size={16} />
            <span>{client.email}</span>
          </div>
        </div>

        <span
          className={`rounded-full px-3 py-1 text-xs font-semibold ${
            client.status === "Active"
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {client.status}
        </span>
      </div>

      {/* Divider */}
      <div className="my-5 border-t"></div>

      {/* Therapist */}
      <div className="flex items-center gap-2 text-sm text-gray-600">
        <UserCheck size={18} className="text-blue-600" />

        <span>
          <strong>Therapist:</strong>{" "}
          {client.therapist || "Not Assigned"}
        </span>
      </div>

      {/* Actions */}
      <div className="mt-6 flex gap-3">
        <button
          onClick={() => onClick(client)}
          className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-gray-300 py-2.5 text-sm font-medium transition hover:bg-gray-100"
        >
          <Eye size={18} />
          View
        </button>

        <button
          onClick={() => onRequestPayment(client)}
          className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-blue-600 py-2.5 text-sm font-medium text-white transition hover:bg-blue-700"
        >
          <CreditCard size={18} />
          Request Payment
        </button>
      </div>
    </div>
  );
};

export default ClientCard;