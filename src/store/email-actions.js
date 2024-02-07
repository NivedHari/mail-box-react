import { emailActions } from "./email-slice";

export const markEmailAsRead = (id, mail, emailId, folder) => {
  const cleanedMail = `${emailId.replace(/\.|@/g, "")}`;
  return async (dispatch) => {
    try {
      dispatch(emailActions.markRead(emailId));

      const emailData = {
        ...mail,
        isRead: true,
      };

      const response = await fetch(
        `https://mail-box-dd769-default-rtdb.firebaseio.com/emails/${cleanedMail}/${mail.key}.json`,
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

export const deleteEmail = (mail,emailId) => {
  const cleanedMail = `${emailId.replace(/\.|@/g, "")}`;
  return async (dispatch) => {
    try {
      await fetch(
        `https://mail-box-dd769-default-rtdb.firebaseio.com/emails/${cleanedMail}/${mail.key}.json`,
        {
          method: "DELETE",
        }
      );
      if (mail.sent === false) {
        await dispatch(emailActions.deleteInboxMail(mail.key));
        await dispatch(fetchMails(emailId));
      }
      if (mail.sent === true ) {
        await dispatch(emailActions.deleteSentMail(mail.key));
        await dispatch(fetchMails(emailId)); 
      }
    } catch (error) {
      console.error("Error deleting email:", error);
    }
  };
};


export const fetchMails = (emailId) => {
  const cleanedMail = `${emailId.replace(/\.|@/g, "")}`;
  return async (dispatch) => {
    try {
      const apiUrl = `https://mail-box-dd769-default-rtdb.firebaseio.com/emails/${cleanedMail}.json`;
      const response = await fetch(apiUrl, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error("Failed to fetch emails");
      }

      const data = await response.json();
      if(!data) {
        dispatch(emailActions.setInbox({ items: [] }));
        dispatch(emailActions.setSentMails({ items: [] }));
        return;
      }
      
      const emailsArray = Object.entries(data).map(([key, email]) => ({
        key,
        ...email,
      }));
      const inboxMails = emailsArray.filter((mail)=> mail.sent === false);
      const sentMails = emailsArray.filter((mail)=> mail.sent === true);
      dispatch(emailActions.setInbox({ items: inboxMails }));
      dispatch(emailActions.setSentMails({ items: sentMails }));


      console.log("Fetched emails:", data);
    } catch (error) {
      console.log(error);
    }
  };
};
