package com.example.lab41.controller;

import com.example.lab41.model.User;

import javax.ejb.Stateless;
import javax.persistence.*;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

@Stateless
public class UserController {
    //    @PersistenceContext(unitName = "MurderTimeTrio")
//    EntityManager entityManager;
    EntityManagerFactory ENTITY_MANAGER_FACTORY = Persistence.createEntityManagerFactory("MurderTimeTrio");//
    EntityManager entityManager = ENTITY_MANAGER_FACTORY.createEntityManager();
    EntityTransaction transaction = entityManager.getTransaction();

    public User newUser(String login, String password) {
        String encryptedPassword = encrypt(password);
        String s = "SELECT u from User u where u.login=?1";
        try {
            entityManager.createQuery(s, User.class)
                    .setParameter(1, login)
                    .getSingleResult();
            return null;
        } catch (NoResultException e) {
            User user = new User(login, encryptedPassword);
            transaction.begin();
            entityManager.persist(user);
            transaction.commit();
            //TODO
            //будет ли id у пользователя - yes
            return user;
        }

    }

    public User findUser(String login, String password) {
        String encryptedPassword = encrypt(password);
        String s = "SELECT u from User u where u.login=?1 and u.password=?2";
        //TODO
        //обработка ошибки на случай, если ничего не найдено
        try {
            return entityManager.createQuery(s, User.class)
                    .setParameter(1, login)
                    .setParameter(2, encryptedPassword)
                    .getSingleResult();
        } catch (NoResultException e) {
            return null;
        }


    }

    protected String encrypt(String password) {
        String generatedPassword = null;
        try {
            MessageDigest md = MessageDigest.getInstance("MD5");
            md.update(password.getBytes());
            byte[] bytes = md.digest();
            StringBuilder sb = new StringBuilder();
            for (byte aByte : bytes) {
                sb.append(Integer.toString((aByte & 0xff) + 0x100, 16).substring(1));
            }

            generatedPassword = sb.toString();
        } catch (NoSuchAlgorithmException e) {
            e.printStackTrace();
        }
        return generatedPassword;
    }

    protected String decrypt(String password) {
        return null;
    }

}
