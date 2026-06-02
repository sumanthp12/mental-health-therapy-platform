import { useEffect }
from "react";

import socket
from "../services/socket";

const useChat =
(conversationId) => {

  useEffect(() => {

    if (!conversationId)
      return;

    socket.emit(
      "join_conversation",
      conversationId
    );

    return () => {

      socket.emit(
        "leave_conversation",
        conversationId
      );

    };

  }, [conversationId]);

};

export default useChat;