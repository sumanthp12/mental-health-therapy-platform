import { useEffect, useState } from "react";
import TopBar from "../../components/dashboard/TopBar";
import {
  getPaymentHistory,
  createOrder,
  verifyPayment,
} from "../../services/paymentService";
import {
  Clock,
  Calendar,
  IndianRupee,
} from "lucide-react";

function ClientPayments() {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPayments = async () => {
    try {
      const res = await getPaymentHistory();

      setPayments(res.payments || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchPayments();
  }, []);


  const handlePayment = async (payment) => {
  try {
    const response = await createOrder({
      sessionId: payment.session,
      amount: payment.amount,
    });

    const { order } = response;

    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      name: "Mindful Connect",
      description: payment.description,
      order_id: order.id,
      handler: async function (razorpayResponse) {
        try {
          await verifyPayment({
            razorpay_order_id:
              razorpayResponse.razorpay_order_id,

            razorpay_payment_id:
              razorpayResponse.razorpay_payment_id,

            razorpay_signature:
              razorpayResponse.razorpay_signature,
          });

          alert("Payment Successful");

          fetchPayments();

        } catch (error) {

          console.error(error);

          alert("Payment verification failed.");

        }
      },

      prefill: {
        name: "Client",
      },

      theme: {
        color: "#2563eb",
      },
    };

    const razorpay = new window.Razorpay(options);

    razorpay.open();

  } catch (error) {

    console.error(error);

    alert("Unable to create payment order.");

  }
};

  const pending = payments.filter(
    (p) =>
      p.status === "requested" ||
      p.status === "created"
  );

  const paid = payments.filter(
    (p) => p.status === "paid"
  );

  const totalDue = pending.reduce(
    (sum, p) => sum + p.amount,
    0
  );

  return (
    <div>

      <TopBar title="Payments" />

      <div className="space-y-6 p-6">

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">

          <div className="rounded-2xl bg-white p-6 shadow">

            <p className="text-gray-500">
              Pending Payments
            </p>

            <h2 className="mt-2 text-3xl font-bold">
              {pending.length}
            </h2>

          </div>

          <div className="rounded-2xl bg-white p-6 shadow">

            <p className="text-gray-500">
              Paid Payments
            </p>

            <h2 className="mt-2 text-3xl font-bold">
              {paid.length}
            </h2>

          </div>

          <div className="rounded-2xl bg-white p-6 shadow">

            <p className="text-gray-500">
              Total Due
            </p>

            <h2 className="mt-2 flex items-center gap-1 text-3xl font-bold">

              <IndianRupee size={26} />

              {totalDue}

            </h2>

          </div>

        </div>

        <div className="space-y-5">

          {loading ? (

            <div className="rounded-2xl bg-white p-8 shadow">

              Loading...

            </div>

          ) : payments.length === 0 ? (

            <div className="rounded-2xl bg-white p-8 text-center shadow">

              No payment requests.

            </div>

          ) : (

            payments.map((payment) => (

              <div
                key={payment._id}
                className="rounded-2xl border bg-white p-6 shadow-sm"
              >

                <div className="flex items-center justify-between">

                  <div>

                    <h2 className="text-xl font-semibold">

                      {payment.description}

                    </h2>

                    <div className="mt-2 flex items-center gap-2 text-gray-500">

                      <IndianRupee size={18} />

                      ₹{payment.amount}

                    </div>

                  </div>

                  {payment.status === "paid" ? (

                    <span className="rounded-full bg-green-100 px-4 py-2 text-green-700">

                      Paid

                    </span>

                  ) : (

                    <span className="rounded-full bg-yellow-100 px-4 py-2 text-yellow-700">

                      Pending

                    </span>

                  )}

                </div>

                <div className="mt-6 grid gap-4 md:grid-cols-2">

                  <div className="flex items-center gap-2">

                    <Calendar size={18} />

                    Due:

                    {payment.dueDate
                      ? new Date(
                          payment.dueDate
                        ).toLocaleDateString()
                      : "-"}

                  </div>

                  <div className="flex items-center gap-2">

                    <Clock size={18} />

                    Requested:

                    {new Date(
                      payment.createdAt
                    ).toLocaleDateString()}

                  </div>

                </div>

                {payment.status !== "paid" && (

                  <div className="mt-6">

                    <button
                        onClick={() => handlePayment(payment)}
                        className="rounded-xl bg-blue-600 px-6 py-3 font-medium text-white hover:bg-blue-700"
                        >
                        Pay Now
                    </button>

                  </div>

                )}

              </div>

            ))

          )}

        </div>

      </div>

    </div>
  );
}

export default ClientPayments;