package ute.tlcn.begroup2.Services.MailServices.MailServiceImpl;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import ute.tlcn.begroup2.Models.UserModels.OrderHistoryModel;
import ute.tlcn.begroup2.Repositories.UserRepository;
import ute.tlcn.begroup2.Services.MailServices.MailService;

@Service
public class MailServiceImpl implements MailService {

    private JavaMailSender emailSender;
    private UserRepository userRepository;

    @Autowired
    public MailServiceImpl(JavaMailSender emailSender, UserRepository userRepository) {
        this.emailSender = emailSender;
        this.userRepository = userRepository;
    }


    @Override
    public void sendMail(OrderHistoryModel orderHistoryModel, int userId) throws MessagingException {
        MimeMessage message = emailSender.createMimeMessage();
        boolean multipart = true;
        MimeMessageHelper helper = new MimeMessageHelper(message, multipart, "UTF-8");
        //SimpleMailMessage simpleMailMessage = new SimpleMailMessage();
        String htmlString = "<html>\r\n"
        + "    <head>\r\n"
        + "        <meta http-equiv=\"Content-Type\" content=\"text/html; charset=UTF-8\">\r\n"
        + "        <title>Nhóm 2 tiểu luận chuyên ngành</title>\r\n"
        + "    </head>\r\n"
        + "    <body>\r\n"
        + "        <h1>Thank you for order my shopping & technology website!</h1>\r\n"
        + "        Your order was handled. Please check your order on website\r\n"
        + "        <a href=\"\"></a>\r\n"
        + "            <table>\r\n"
        + "                <th>\r\n"
        + "                    Order ID\r\n"
        + "                </th>\r\n"
        + "                <th>\r\n"
        + "                    Total Cost\r\n"
        + "                </th>\r\n"
        + "                <th>\r\n"
        + "                    Date order\r\n"
        + "                </th>\r\n"
        + "                 <th>\r\n"
        + "                    Order status\r\n"
        + "                </th>\r\n"
        + "                 <th>\r\n"
        + "                    Payment status\r\n"
        + "                </th>\r\n"
        + "                 <th>\r\n"
        + "                    Product\r\n"
        + "                </th>\r\n"
        + "                <tr>\r\n"
        + "                    <td>\r\n"
        +                         orderHistoryModel.getId()+"\r\n"
        + "                    </td>\r\n"
        + "                    <td>\r\n"
        +                         orderHistoryModel.getTotal()+"\r\n"
        + "                    </td>\r\n"
        + "                    <td>\r\n"
        +                         orderHistoryModel.getOrderDate()+"\r\n"
        + "                    </td>\r\n"
        + "                    <td>\r\n"
        +                         orderHistoryModel.getOrderStatus()+"\r\n"
        + "                    </td>\r\n"
        + "                    <td>\r\n"
        +                         orderHistoryModel.getPaymentStatus()+"\r\n"
        + "                    </td>\r\n"
        + "                    <td>\r\n"
        +                         orderHistoryModel.getProduct()+"\r\n"
        + "                    </td>\r\n"
        + "                </tr>\r\n"
        + "            </table>\r\n"
        + "    </body>\r\n"
        + "</html>\r\n"
        + "";

        message.setContent(htmlString, "text/html; charset=UTF-8");
        helper.setTo(findEmailByUserName(userId));
        helper.setSubject("Comfirm your order in shopping & technology");
        this.emailSender.send(message);

        // simpleMailMessage.setFrom("giakhangnguyenlam@gmail.com");
        // simpleMailMessage.setTo(findEmailByUserName(userId));
        // simpleMailMessage.setSubject("Confirm your order in shopping & technology");
        // simpleMailMessage.setText(htmlString);

        // this.emailSender.send(simpleMailMessage);
        System.out.println("mail send ....");
    }

    public String findEmailByUserName(int id){
        String email = userRepository.getById(id).getEmail();
        return email;
    }
    
}
