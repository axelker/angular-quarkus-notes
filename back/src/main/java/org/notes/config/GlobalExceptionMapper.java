package org.notes.config;
import jakarta.ws.rs.ext.ExceptionMapper;
import jakarta.ws.rs.ext.Provider;
import jakarta.ws.rs.core.Response;

import java.util.NoSuchElementException;

import jakarta.ws.rs.core.MediaType;

@Provider
public class GlobalExceptionMapper implements ExceptionMapper<Throwable> {

    @Override
    public Response toResponse(Throwable exception) {
        int status = 500;
        String code = "INTERNAL_ERROR";

        if (exception instanceof NoSuchElementException) {
            status = 404;
            code = "NOT_FOUND";
        } else if (exception instanceof jakarta.ws.rs.BadRequestException) {
            status = 400;
            code = "BAD_REQUEST";
        }

        return Response.status(status)
            .entity(new ErrorResponse(code, exception.getMessage()))
            .type(MediaType.APPLICATION_JSON)
            .build();
    }

    public static class ErrorResponse {
        public String code;
        public String message;

        public ErrorResponse(String code, String message) {
            this.code = code;
            this.message = message;
        }
    }
}
