package com.example.lab41.resource;

import com.example.lab41.ResponseCreator;
import com.example.lab41.controller.HitController;
import com.example.lab41.model.HitCheck;
import com.example.lab41.security.JwtTokenService;

import javax.ejb.EJB;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.util.List;

@Path("/main")
public class MainResource {
    @EJB
    HitController hitController;

    ResponseCreator rc = new ResponseCreator();
    JwtTokenService jwtTokenService = new JwtTokenService();

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public Response getData(@HeaderParam("Authorization") String token) {
        if (jwtTokenService.isTokenValid(token)) {
            int userId = jwtTokenService.getIdFromToken(token);
            List<HitCheck> hitCheckList = hitController.getAllUserResult(userId);
            return Response.ok()
                    .entity(rc.createResponseList(hitCheckList))
                    .build();
        }
        return Response.status(Response.Status.UNAUTHORIZED)
                .entity(rc.createResponse("Invalid token"))
                .build();
    }

    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response addHit(@HeaderParam("Authorization") String token, HitCheck hitCheck) {
        if (jwtTokenService.isTokenValid(token)) {
            int userId = jwtTokenService.getIdFromToken(token);
            HitCheck hitCheck1 = hitController.saveHitResult(hitCheck, userId);
            return Response.ok()
                    .entity(rc.createResponseFromObject(hitCheck1))
                    .build();
        }
        return Response.status(Response.Status.UNAUTHORIZED)
                .entity(rc.createResponse("Invalid token"))
                .build();
    }

    @DELETE
    @Produces(MediaType.APPLICATION_JSON)
    public Response clearHits(@HeaderParam("Authorization") String token) {

        if (jwtTokenService.isTokenValid(token)) {
            int userId = jwtTokenService.getIdFromToken(token);
            hitController.clear(userId);
            return Response.ok()
                    .entity(rc.createResponse("History is cleared"))
                    .build();
        }
        return Response.status(Response.Status.UNAUTHORIZED)
                .entity(rc.createResponse("Invalid token"))
                .build();
    }
}
