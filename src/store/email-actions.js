import { emailActions } from "./email-slice";

export const markEmailAsRead = (id, mail, emailId) => {
  const cleanedMail = `${emailId.replace(/\.|@/g, "")}`;
  return async (dispatch) => {
    try {
      // Dispatch the action to mark the email as read in the Redux store
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

      // Make a PUT request to update the email's isRead property in Firebase
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
      console.log(`https://mail-box-dd769-default-rtdb.firebaseio.com/emails/received/${cleanedMail}/${mail.key}.json`)

      // Check if the request was successful
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
