import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchMails,
  markEmailAsRead,
  deleteEmail,
  sendEmail,
} from "../../store/email-actions";

const useEmail = () => {
  const dispatch = useDispatch();
  const emailId = useSelector((state) => state.auth.email);
  const emails = useSelector((state) => state.email.inbox);
  const sentMails = useSelector((state) => state.email.sentMails);

  useEffect(() => {
    dispatch(fetchMails(emailId));

    const intervalId = setInterval(() => {
      dispatch(fetchMails(emailId));
    }, 2000);

    return () => clearInterval(intervalId);
  }, [dispatch, emailId]);

  const markEmailAsReadHandler = (id, mail) => {
    dispatch(markEmailAsRead(id, mail, emailId));
  };

  const deleteEmailHandler = (mail) => {
    dispatch(deleteEmail(mail, emailId));
  };

  const sendEmailHandler = (emailData) => {
    dispatch(sendEmail(emailId, emailData));
  };

  return {
    emails,
    sentMails,
    markEmailAsRead: markEmailAsReadHandler,
    deleteEmail: deleteEmailHandler,
    sendEmail: sendEmailHandler,
  };
};

export default useEmail;
