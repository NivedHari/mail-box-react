import { emailActions } from "./email-slice";

export const markEmailAsRead = (id, mail, emailId, folder) => {
  const cleanedMail = `${emailId.replace(/\.|@/g, "")}`;
  return async (dispatch) => {
    try {
      dispatch(emailActions.markRead(emailId));

      const emailData = {
        id: id,
        sender: mail.sender,
        receiver: mail.receiver,
        subject: mail.subject,
        message: mail.message,
        timestamp: mail.timestamp,
        isRead: true,
      };

      const response = await fetch(
        `https://mail-box-dd769-default-rtdb.firebaseio.com/emails/${folder}/${cleanedMail}/${mail.key}.json`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(emailData),
        }
      );
      if (!response.ok) {
        console.error("Error marking email as read:", response.statusText);
        return;
      }

      console.log("Email marked as read successfully:", emailId);
    } catch (error) {
      console.error("Error marking email as read:", error);
    }
  };
};

export const deleteEmail = (key, emailId, folder) => {
  const cleanedMail = `${emailId.replace(/\.|@/g, "")}`;
  return async (dispatch) => {
    try {
      await fetch(
        `https://mail-box-dd769-default-rtdb.firebaseio.com/emails/${folder}/${cleanedMail}/${key}.json`,
        {
          method: "DELETE",
        }
      );
      if (folder === "received") {
        await dispatch(emailActions.deleteInboxMail(key));
        await dispatch(fetchMails(emailId, "received"));
      }
      if (folder === "sent") {
        await dispatch(emailActions.deleteSentMail(key));
        await dispatch(fetchMails(emailId, "sent")); 
      }
    } catch (error) {
      console.error("Error deleting email:", error);
    }
  };
};


export const fetchMails = (emailId, folder) => {
  const cleanedMail = `${emailId.replace(/\.|@/g, "")}`;
  return async (dispatch) => {
    try {
      const apiUrl = `https://mail-box-dd769-default-rtdb.firebaseio.com/emails/${folder}/${cleanedMail}.json`;
      const response = await fetch(apiUrl, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error("Failed to fetch emails");
      }

      const data = await response.json();
      if (!data) {
        if (folder === "received") {
          dispatch(emailActions.setInbox({ items: [] }));
        }
        if (folder === "sent") {
          dispatch(emailActions.setSentMails({ items: [] }));
        }

        return;
      }
      const emailsArray = Object.entries(data).map(([key, email]) => ({
        key,
        ...email,
      }));
      if (folder === "received") {
        dispatch(emailActions.setInbox({ items: emailsArray }));
      }
      if (folder === "sent") {
        dispatch(emailActions.setSentMails({ items: emailsArray }));
      }

      console.log("Fetched emails:", data);
    } catch (error) {
      console.log(error);
    }
  };
};
