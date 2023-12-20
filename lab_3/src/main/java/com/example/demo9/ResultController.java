package com.example.lab_3;


import com.example.lab_3.model.Hit;

import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;
import javax.persistence.PersistenceContext;
import java.util.ArrayList;

@Stateless
public class ResultController {

    EntityManagerFactory ENTITY_MANAGER_FACTORY = Persistence.createEntityManagerFactory("myPersistenceUnit");//
    EntityManager entityManager = ENTITY_MANAGER_FACTORY.createEntityManager();

    public void saveHitResult(Hit hit) {
        entityManager.persist(hit);
    }

    public ArrayList<Hit> getAllResults(){
        return (ArrayList<Hit>) entityManager.createQuery("SELECT h from Hit h", Hit.class).getResultList();
    }

    public void clear(){
        entityManager.createQuery("DELETE FROM Hit").executeUpdate();
    }
}

