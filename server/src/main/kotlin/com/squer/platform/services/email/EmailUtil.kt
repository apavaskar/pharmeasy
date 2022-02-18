/*
package com.squer.platform.services.Email

import com.squer.sfe.controller.EmailAttachment
import org.springframework.beans.factory.annotation.Value
import org.springframework.stereotype.Service
import java.util.*
import javax.activation.DataHandler
import javax.mail.BodyPart
import javax.mail.Message
import javax.mail.Session
import javax.mail.Transport
import javax.mail.internet.InternetAddress
import javax.mail.internet.MimeBodyPart
import javax.mail.internet.MimeMessage
import javax.mail.internet.MimeMultipart
import javax.mail.util.ByteArrayDataSource

@Service
class EmailUtil {
    @Value("\${smtp.smtp_from}")
    lateinit var mailFrom: String

    @Value("\${smtp.smtp_host_name}")
    lateinit var hostName: String

    @Value("\${smtp.smtp_password}")
    lateinit var mailPassword: String

    @Value("\${smtp.smtp_port}")
    lateinit var mailPort: String

    @Value("\${smtp.smtp_subject}")
    lateinit var mailSubject: String

    @Value("\${smtp.smtp_user_name}")
    lateinit var mailUserName: String


        fun sendMail(mailBody: String, subject : String, toMail: String , attachments: List<EmailAttachment>): Boolean {
            val props = Properties()
            props["mail.smtp.user"] = mailUserName
            props["mail.smtp.host"] = hostName
            props["mail.smtp.password"] = mailPassword
            props["mail.smtp.port"] = mailPort
            props["mail.debug"] = "true"
            props["mail.smtp.auth"] = "true"
            props["mail.smtp.starttls.enable"] = "true"
            props["mail.smtp.EnableSSL.enable"] = "true"

            val multipart = MimeMultipart("related")
            val authentication = SMTPAuthenticator(mailUserName,mailPassword)
            val mailSession: Session = Session.getDefaultInstance(props,authentication)
            mailSession.setDebug(true)

            val message = MimeMessage(mailSession)
            message.setSubject(subject)
            message.setFrom(InternetAddress(mailUserName, subject))
            message.setRecipients(Message.RecipientType.TO, InternetAddress.parse(toMail))
            var messageBodyPart: BodyPart = MimeBodyPart()
            messageBodyPart.setContent(mailBody, "text/html")
            multipart.addBodyPart(messageBodyPart)
            message.setContent(multipart)

            for (attachment in attachments) {
                messageBodyPart = MimeBodyPart()
                val ds = ByteArrayDataSource(attachment.fileContent, "application/octet-stream")
                messageBodyPart.setDataHandler(DataHandler(ds))
                messageBodyPart.setFileName(attachment.fileName)
                multipart.addBodyPart(messageBodyPart)
                message.setContent(multipart)
            }

            Transport.send(message)
            return true;
        }

}*/
