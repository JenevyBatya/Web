package com.example.lab41.resource;

import com.example.lab41.ResponseCreator;
import com.example.lab41.controller.UserController;
import com.example.lab41.model.User;
import com.example.lab41.security.JwtTokenService;

import javax.ejb.EJB;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

@Path("/starter")
public class LoginResource {

    @EJB
    UserController userController;
    JwtTokenService jwtTokenService = new JwtTokenService();

    ResponseCreator rc = new ResponseCreator();

    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response login(User user) {

        User foundUser = userController.findUser(user.getLogin(), user.getPassword());
        if (foundUser != null) {
            return Response.ok()
                    .header("Authorization", jwtTokenService.generateToken(foundUser.getLogin(), foundUser.getId()))
                    .entity(rc.createResponse("SuccessfulAuth"))
                    .build();
        }
        return Response.status(Response.Status.NOT_FOUND)
                .entity(rc.createResponse("User not found"))
                .build();
    }

}

