import { useEffect, useState } from "react";
import PageHeader from "../../components/ui/PageHeader";
import SessionCard from "../../components/ui/SessionCard";
import { useAuth } from "../../context/AuthContext";
import { approveSession, startMeeting, completeMeeting, } from "../../services/sessionService";

function Sessions() {

  const { token } = useAuth();
  const [sessions, setSessions] = useState([]);

  const fetchSessions = async () => {
    try {

      const response = await fetch(
        "http://localhost:8000/api/sessions/therapist",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (response.ok) {
        setSessions(data);
      }

    } catch (error) {
      console.error(error);
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
      try {
        await approveSession(sessionId);

        await fetchSessions();
      } catch (error) {
        console.error(error);
      }
    };

    const handleStartMeeting = async (sessionId) => {
      try {
        await startMeeting(sessionId);
        await fetchSessions();
      } catch (error) {
        console.error(error);
      }
    };

    const handleCompleteMeeting = async (sessionId) => {
      try {
        await completeMeeting(sessionId);
        await fetchSessions();
      } catch (error) {
        console.error(error);
      }
    };

  return (
    <div className="space-y-6">

      <PageHeader
        title="Sessions"
        subtitle="Manage assigned sessions"
      />

      <div
        className="
        grid
        grid-cols-1
        lg:grid-cols-2
        gap-6
        "
      >
        {sessions.map(
          (
            session,
          ) => (
            <SessionCard
              key={session._id}
              therapist={`Client: ${session.client?.name}`}
              sessionDate={formatDate(session.sessionDate)  }
              sessionTime={session.sessionTime}
              status={session.status}
              meetingRoom={session.meetingRoom}
              sessionId={session._id}
              onApprove={handleApprove}
              onStartMeeting={handleStartMeeting}
              onCompleteMeeting={handleCompleteMeeting}
              isTherapist={true}
            />
          )
        )}
      </div>

    </div>
  );
}

export default Sessions;