package com.example.lab41.resource;

import com.example.lab41.ResponseCreator;
import com.example.lab41.controller.UserController;
import com.example.lab41.model.User;
import com.example.lab41.security.JwtTokenService;

import javax.ejb.EJB;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

@Path("/signup")
public class SignUpResource {
    @EJB
    UserController userController;
    JwtTokenService jwtTokenService = new JwtTokenService();
    ResponseCreator rc = new ResponseCreator();

    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response signup(User user) {
        User newUser = userController.newUser(user.getLogin(), user.getPassword());
        if (newUser != null) {
            return Response.ok()
                    .header("Authorization", jwtTokenService.generateToken(newUser.getLogin(), newUser.getId()))
                    .entity(rc.createResponse("Successful registration"))
                    .build();
        }
        return Response.status(Response.Status.CONFLICT)
                .entity(rc.createResponse("User already registered"))
                .build();
    }
}
