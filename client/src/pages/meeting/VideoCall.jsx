import { JitsiMeeting } from "@jitsi/react-sdk";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { completeSession } from "../../services/sessionService";


function VideoCall() {
  const { roomName } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const location = useLocation();
  const sessionId = location.state?.sessionId;

  const leaveSession = async () => {
        try {
            if (sessionId) {
            await completeSession(sessionId);
            }

            navigate("/therapist/sessions");

        } catch (error) {
            console.error(error);

            navigate("/therapist/sessions");
        }
        };

  return (
    <div className="h-screen w-full bg-gray-900">

      <div className="flex items-center justify-between bg-white p-4 shadow">

        <h1 className="text-xl font-bold">
          Therapy Video Session
        </h1>

        <button
          onClick={leaveSession}
          className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
        >
          Leave Session
        </button>

      </div>

      <div className="h-[calc(100vh-72px)]">

        <JitsiMeeting
          roomName={roomName}
          configOverwrite={{
            startWithAudioMuted: false,
            startWithVideoMuted: false,
          }}
          userInfo={{
            displayName: user?.name || "Guest",
          }}
          getIFrameRef={(iframeRef) => {
            iframeRef.style.height = "100%";
            iframeRef.style.width = "100%";
          }}
        />

      </div>

    </div>
  );
}

export default VideoCall;