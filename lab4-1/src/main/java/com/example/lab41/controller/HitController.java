package com.example.lab41.controller;

import com.example.lab41.model.HitCheck;

import javax.ejb.Stateless;
import javax.persistence.*;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.TimeZone;

@Stateless
public class HitController {
    TimeZone timeZone = TimeZone.getTimeZone("Europe/Moscow");
    SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
    //    @PersistenceContext(unitName = "MurderTimeTrio")
//    EntityManager entityManager;
    EntityManagerFactory ENTITY_MANAGER_FACTORY = Persistence.createEntityManagerFactory("MurderTimeTrio");//
    EntityManager entityManager = ENTITY_MANAGER_FACTORY.createEntityManager();
    EntityTransaction transaction = entityManager.getTransaction();

    public List<HitCheck> getAllUserResult(int userId) {
        return entityManager.createQuery("select h from HitCheck h where h.user_id=?1")
                .setParameter(1, userId)
                .getResultList();
    }

    public void clear(int userId) {
        entityManager.createQuery("delete from HitCheck h where h.user_id=?1")
                .setParameter(1, userId)
                .executeUpdate();
    }

    public HitCheck saveHitResult(HitCheck hitCheck, int userId) {
        sdf.setTimeZone(timeZone);
        long startTime = System.nanoTime();
        String status;
        if (hitCheck.getR() == 0) {
            status = "Гном";
        } else if (hitCheck.getX() <= 0 && hitCheck.getY() <= 0 && hitCheck.getX() >= (-hitCheck.getR()) && hitCheck.getY() >= (-hitCheck.getR())) {
            status = "Эльф";
        } else if (hitCheck.getX() <= 0 && hitCheck.getY() >= 0 && (hitCheck.getX() * hitCheck.getX() + hitCheck.getY() * hitCheck.getY()) <= (hitCheck.getR() * hitCheck.getR())) {
            status = "Эльф";
        } else if (hitCheck.getX() >= 0 && hitCheck.getY() <= 0 && hitCheck.getY() >= (0.5 * hitCheck.getX() - hitCheck.getR() * 0.5)) {
            status = "Эльф";
        } else {
            status = "Гном";
        }
        long endTime = System.nanoTime() - startTime;
        String currentTime = sdf.format(new Date());
        //TODO
        //Нужна ли здесь зависимость + поправить user_id
        HitCheck hitChecked = new HitCheck(hitCheck.getX(), hitCheck.getY(), hitCheck.getR(), endTime, status, currentTime, userId);
        transaction.begin();
        entityManager.persist(hitChecked);
        transaction.commit();
        return hitChecked;
    }

}
