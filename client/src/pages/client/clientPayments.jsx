import { useEffect, useState } from "react";
import {
  getPaymentHistory,
  createOrder,
  verifyPayment,
} from "../../services/paymentService";
import {
  Clock,
  Calendar,
  IndianRupee,
  CreditCard,
  CheckCircle2,
  CircleDollarSign,
  WalletCards,
  Receipt,
} from "lucide-react";

import LoadingSpinner from "../../components/ui/LoadingSpinner";
import EmptyState from "../../components/ui/EmptyState";
import ErrorState from "../../components/ui/ErrorState";

import {
  showSuccess,
  showError,
} from "../../utils/toast";

function ClientPayments() {
  const [payments, setPayments] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const [payingPaymentId, setPayingPaymentId] = useState(null);

const fetchPayments = async () => {
  try {
    setLoading(true);
    setError(false);

    const res = await getPaymentHistory();

    setPayments(res?.payments || []);
  } catch (err) {
    console.error(
      "Failed to load payment history:",
      err
    );

    setError(true);

    showError(
      err?.response?.data?.message ||
        "Unable to load your payment history."
    );
  } finally {
    setLoading(false);
  }
};

useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchPayments();
  }, []);

const handlePayment = async (payment) => {
  if (payingPaymentId) {
    return;
  }

  try {
    setPayingPaymentId(payment._id);

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

          showSuccess(
            "Payment completed successfully."
          );

          await fetchPayments();
        } catch (error) {
          console.error(
            "Payment verification failed:",
            error
          );

          showError(
            error?.response?.data?.message ||
              "Payment verification failed. Please try again."
          );
        } finally {
          setPayingPaymentId(null);
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

    razorpay.on("payment.failed", (response) => {
      console.error(
        "Razorpay payment failed:",
        response
      );

      showError(
        response?.error?.description ||
          "Payment failed. Please try again."
      );

      setPayingPaymentId(null);
    });
  } catch (error) {
    console.error(
      "Unable to create payment order:",
      error
    );

    showError(
      error?.response?.data?.message ||
        "Unable to create payment order. Please try again."
    );

    setPayingPaymentId(null);
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

  const formatDate = (date) => {
    if (!date) return "-";

    return new Date(date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-[#f8fafc]">
      <main className="space-y-6 p-6">

        {/* Page Header */}
        <section className="rounded-2xl border border-gray-200 bg-white px-6 py-5 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50">
              <WalletCards
                size={23}
                className="text-blue-600"
              />
            </div>

            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Payments
              </h1>

              <p className="mt-1 text-sm text-gray-500">
                Manage your therapy session payments
              </p>
            </div>
          </div>
        </section>

        {/* Payment Statistics */}
        <section className="grid grid-cols-1 gap-5 md:grid-cols-3">

          {/* Pending */}
          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition hover:shadow-md">

            <div className="flex items-start justify-between">

              <div>
                <p className="text-sm font-medium text-gray-500">
                  Pending Payments
                </p>

                <h2 className="mt-2 text-3xl font-bold text-gray-900">
                  {pending.length}
                </h2>

                <p className="mt-1 text-sm text-gray-400">
                  Awaiting payment
                </p>
              </div>

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-50">
                <CircleDollarSign
                  size={23}
                  className="text-amber-500"
                />
              </div>

            </div>
          </div>

          {/* Paid */}
          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition hover:shadow-md">

            <div className="flex items-start justify-between">

              <div>
                <p className="text-sm font-medium text-gray-500">
                  Paid Payments
                </p>

                <h2 className="mt-2 text-3xl font-bold text-gray-900">
                  {paid.length}
                </h2>

                <p className="mt-1 text-sm text-gray-400">
                  Successfully completed
                </p>
              </div>

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-green-50">
                <CheckCircle2
                  size={23}
                  className="text-green-600"
                />
              </div>

            </div>
          </div>

          {/* Total Due */}
          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition hover:shadow-md">

            <div className="flex items-start justify-between">

              <div>
                <p className="text-sm font-medium text-gray-500">
                  Total Due
                </p>

                <h2 className="mt-2 flex items-center text-3xl font-bold text-gray-900">
                  <IndianRupee size={25} />
                  {totalDue}
                </h2>

                <p className="mt-1 text-sm text-gray-400">
                  Outstanding amount
                </p>
              </div>

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50">
                <CreditCard
                  size={23}
                  className="text-blue-600"
                />
              </div>

            </div>
          </div>

        </section>

        {/* Payment Requests */}
        <section>

          <div className="mb-4 flex items-center gap-2">
            <Receipt
              size={21}
              className="text-gray-700"
            />

            <h2 className="text-xl font-bold text-gray-900">
              Payment Requests
            </h2>
          </div>

          {/* Loading */}
          {loading ? (
            <div className="rounded-2xl border border-gray-200 bg-white p-10 shadow-sm">
              <LoadingSpinner
                label="Loading payments..."
              />
            </div>
          ) : error ? (
            <ErrorState
              title="Unable to load payments"
              description="We couldn't load your payment history right now. Please try again."
              onRetry={fetchPayments}
              retryText="Reload Payments"
            />
          ) : payments.length === 0 ? (
            <EmptyState
              icon={Receipt}
              title="No payment requests"
              description="You don't have any payment requests at the moment. Payment requests will appear here when your therapist schedules a paid session."
            />

          ) : (

            /* Payment Cards */
            <div className="space-y-5">

              {payments.map((payment) => {

                const isPaid = payment.status === "paid";

                return (
                  <article
                    key={payment._id}
                    className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition hover:shadow-md"
                  >

                    {/* Card Header */}
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                      <div className="flex items-start gap-4">
                        <div
                          className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${
                            isPaid
                              ? "bg-green-50"
                              : "bg-blue-50"
                          }`}
                        >
                          {isPaid ? (
                            <CheckCircle2
                              size={24}
                              className="text-green-600"
                            />
                          ) : (
                            <CreditCard
                              size={24}
                              className="text-blue-600"
                            />
                          )}
                        </div>

                        <div>
                          <h3 className="text-lg font-bold text-gray-900">
                            {payment.description}
                          </h3>
                          <div className="mt-2 flex items-center gap-1 text-gray-600">
                            <IndianRupee size={17} />
                            <span className="font-semibold">
                              {payment.amount}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Status */}
                      {isPaid ? (
                        <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-green-50 px-4 py-2 text-sm font-semibold text-green-700">
                          <CheckCircle2 size={15} />
                          Paid
                        </span>
                      ) : (
                        <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-amber-50 px-4 py-2 text-sm font-semibold text-amber-700">
                          <Clock size={15} />
                          Pending
                        </span>
                      )}
                    </div>

                    {/* Divider */}
                    <div className="my-5 border-t border-gray-100" />

                    {/* Payment Details */}
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gray-50">
                          <Calendar
                            size={18}
                            className="text-gray-500"
                          />
                        </div>

                        <div>
                          <p className="text-xs font-medium text-gray-400">
                            Due Date
                          </p>
                          <p className="mt-0.5 text-sm font-semibold text-gray-700">
                            {formatDate(payment.dueDate)}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gray-50">
                          <Clock
                            size={18}
                            className="text-gray-500"
                          />
                        </div>

                        <div>
                          <p className="text-xs font-medium text-gray-400">
                            Requested On
                          </p>
                          <p className="mt-0.5 text-sm font-semibold text-gray-700">
                            {formatDate(payment.createdAt)}
                          </p>
                        </div>
                      </div>
                    </div>
                    {/* Payment Action */}
                    {!isPaid && (
                      <div className="mt-6 flex justify-end border-t border-gray-100 pt-5">
                        <button
                          onClick={() => handlePayment(payment)}
                          disabled={payingPaymentId === payment._id}
                          className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
                        >
                          {payingPaymentId === payment._id ? (
                            <>
                              <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                              Processing...
                            </>
                          ) : (
                            <>
                              <IndianRupee size={17} />
                              Pay Now
                            </>
                          )}
                        </button>
                      </div>
                    )}
                  </article>
                );
              })}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

export default ClientPayments;