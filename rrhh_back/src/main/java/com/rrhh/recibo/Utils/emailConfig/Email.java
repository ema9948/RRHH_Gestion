package com.rrhh.recibo.Utils.emailConfig;


import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;

public class Email {

    @Value("${email}")
    private static String emailFrom;
    @Value("${frontUri}")
    private static String frontEnd;

    public static SimpleMailMessage generateEmail(String jwt, String emailTo, String authority) {

        String link = "";

        if (authority.equals("admin")) {
            link = frontEnd + "/reset/admin/" + jwt;
        }
        if (authority.equals("user")) {
            link = frontEnd + "/reset/" + jwt;
        }

        SimpleMailMessage email = new SimpleMailMessage();
        email.setTo(emailTo);
        email.setFrom(emailFrom);
        email.setSubject("Restablecer  Contraseña");
        email.setText("(Importante Cuenta con 5 minutos para cambiar la contraseña.Transucrido ese tiempo, debe solicitar  otra vez el cambio). " + "</br>" + "  Ingresa al siguiente link para restablecer la contraseña =>  " + "</br>" + link);

        return email;
    }
}
