import { useEffect, useState } from "react";
import { CalendarDays } from "lucide-react";

import PageHeader from "../../components/ui/PageHeader";
import SessionCard from "../../components/ui/SessionCard";
import { useAuth } from "../../context/AuthContext";

import {
  approveSession,
  startMeeting,
  completeMeeting,
} from "../../services/sessionService";

import LoadingSpinner from "../../components/ui/LoadingSpinner";
import EmptyState from "../../components/ui/EmptyState";
import ErrorState from "../../components/ui/ErrorState";

import { showError, showSuccess } from "../../utils/toast";

function Sessions() {
  const { token } = useAuth();

  const [sessions, setSessions] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const [processingSessionId, setProcessingSessionId] =
    useState(null);

const fetchSessions = async () => {
  try {
    setLoading(true);
    setError(false);

    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/sessions/therapist`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(
        data?.message ||
          "Unable to load your sessions."
      );
    }

    setSessions(
      Array.isArray(data) ? data : []
    );
  } catch (err) {
    console.error(
      "Failed to load therapist sessions:",
      err
    );

    setError(true);

    showError(
      err?.message ||
        "Unable to load your sessions."
    );
  } finally {
    setLoading(false);
  }
};

  const formatDate = (date) => {
    if (!date) return "Date Not Available";

    return new Date(date).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  useEffect(() => {
    if (token) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      fetchSessions();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

const handleApprove = async (sessionId) => {
  if (processingSessionId) return;

  try {
    setProcessingSessionId(sessionId);

    await approveSession(sessionId);

    showSuccess("Session approved successfully.");

    await fetchSessions();
  } catch (error) {
    console.error(
      "Failed to approve session:",
      error
    );

    showError(
      error?.response?.data?.message ||
        error?.message ||
        "Unable to approve the session."
    );
  } finally {
    setProcessingSessionId(null);
  }
};

const handleStartMeeting = async (sessionId) => {
  if (processingSessionId) return;

  try {
    setProcessingSessionId(sessionId);

    await startMeeting(sessionId);

    showSuccess("Meeting started successfully.");

    await fetchSessions();
  } catch (error) {
    console.error(
      "Failed to start meeting:",
      error
    );

    showError(
      error?.response?.data?.message ||
        error?.message ||
        "Unable to start the meeting."
    );
  } finally {
    setProcessingSessionId(null);
  }
};

const handleCompleteMeeting = async (sessionId) => {
  if (processingSessionId) return;

  try {
    setProcessingSessionId(sessionId);

    await completeMeeting(sessionId);

    showSuccess(
      "Session completed successfully."
    );

    await fetchSessions();
  } catch (error) {
    console.error(
      "Failed to complete meeting:",
      error
    );

    showError(
      error?.response?.data?.message ||
        error?.message ||
        "Unable to complete the session."
    );
  } finally {
    setProcessingSessionId(null);
  }
};

if (loading) {
  return (
    <LoadingSpinner
      fullScreen
      label="Loading sessions..."
    />
  );
}

if (error) {
  return (
    <ErrorState
      title="Unable to load sessions"
      description="We couldn't load your assigned sessions right now. Please try again."
      onRetry={fetchSessions}
      retryText="Reload Sessions"
    />
  );
}

  return (
    <div className="space-y-6">
      <PageHeader
        title="Sessions"
        subtitle="Manage assigned sessions"
      />

      {sessions.length === 0 ? (
          <EmptyState
            icon={CalendarDays}
            title="No sessions yet"
            description="You don't have any therapy sessions assigned to you yet. Sessions will appear here once they are scheduled."
          />
        ) : (
        /* Sessions */
        <div
          className="
            grid
            grid-cols-1
            gap-6
            lg:grid-cols-2
          "
        >
          {sessions.map((session) => (
            <SessionCard
              key={session._id}
              therapist={`Client: ${session.client?.name}`}
              sessionDate={formatDate(session.sessionDate)}
              sessionTime={session.sessionTime}
              status={session.status}
              meetingRoom={session.meetingRoom}
              sessionId={session._id}
              onApprove={handleApprove}
              onStartMeeting={handleStartMeeting}
              onCompleteMeeting={handleCompleteMeeting}
              isTherapist={true}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default Sessions;