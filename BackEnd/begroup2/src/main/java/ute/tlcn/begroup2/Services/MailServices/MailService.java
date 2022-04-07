package ute.tlcn.begroup2.Services.MailServices;

import javax.mail.MessagingException;

import ute.tlcn.begroup2.Models.UserModels.OrderHistoryModel;

public interface MailService {
    public void sendMail(OrderHistoryModel orderHistoryModel, int userId) throws MessagingException;
    public void sendMailWithPassword(String password, int userId) throws MessagingException;
}
