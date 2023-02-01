package teamproject.backend.utils;

import teamproject.backend.response.BaseException;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.security.SecureRandom;

import static teamproject.backend.response.BaseExceptionStatus.FAIL_ENCRYPT_PASSWORD;

public class SHA256 {
    // 무작위 문자열 Salt
    public static String getSalt() {
        //1. Random, salt 생성
        SecureRandom sr = new SecureRandom();
        byte[] salt = new byte[20];

        //2. 난수 생성
        sr.nextBytes(salt);

        //3. byte To String (10진수 문자열로 변경)
        StringBuffer sb = new StringBuffer();
        for(byte b : salt) {
            sb.append(String.format("%02x", b));
        }

        return sb.toString();
    }

    // SHA-256 알고리즘 적용
    public static String encrypt(String password, String salt) {
        String result = "";
        try {
            MessageDigest md = MessageDigest.getInstance("SHA-256");

            md.update((password + salt).getBytes());
            byte[] pwdSalt = md.digest();

            StringBuffer sb = new StringBuffer();
            for(byte b : pwdSalt) {
                sb.append(String.format("%02x", b));
            }

            result = sb.toString();

        } catch (NoSuchAlgorithmException e) {
            e.printStackTrace();
            throw new BaseException(FAIL_ENCRYPT_PASSWORD);

        }

        return result;
    }
}
