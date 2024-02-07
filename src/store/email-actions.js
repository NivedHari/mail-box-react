import { emailActions } from "./email-slice";

export const markEmailAsRead = (id, mail, emailId) => {
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
        `https://mail-box-dd769-default-rtdb.firebaseio.com/emails/received/${cleanedMail}/${mail.key}.json`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(emailData),
        }
      );
      console.log(
        `https://mail-box-dd769-default-rtdb.firebaseio.com/emails/received/${cleanedMail}/${mail.key}.json`
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

export const deleteEmail = (key, emailId) => {
  const cleanedMail = `${emailId.replace(/\.|@/g, "")}`;
  return async (dispatch) => {
    try {
      await fetch(
        `https://mail-box-dd769-default-rtdb.firebaseio.com/emails/received/${cleanedMail}/${key}.json`,
        {
          method: "DELETE",
        }
      );
      dispatch(deleteMail(key));
    } catch (error) {
      console.error("Error deleting email:", error);
    }
  };
};
