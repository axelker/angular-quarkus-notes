package org.notes.api;

import org.notes.dto.PagedResponse;
import org.notes.service.NoteService;
import jakarta.inject.Inject;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import jakarta.ws.rs.core.UriBuilder;
import jakarta.ws.rs.*;

import java.net.URI;

import org.notes.dto.NoteDto;

@Path("/notes")
public class NoteResource {

    @Inject
    private NoteService noteService;

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public Response getAll(@QueryParam("page") @DefaultValue("0") int page,
                                       @QueryParam("size") @DefaultValue("10") int size) {
        var result = noteService.findAll(page, size);
        return Response.ok(result).build();
    }

    @GET
    @Path("/{id}")
    public Response getById(@PathParam("id") Long id) {
        return Response.ok(noteService.findById(id)).build();
    }

    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response create(NoteDto note) {
        NoteDto created = noteService.create(note);
        URI uri = UriBuilder.fromResource(NoteResource.class).path(String.valueOf(created.getId())).build();
        return Response.created(uri).entity(created).build();
    }

    @PUT
    @Path("/{id}")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response update(@PathParam("id") Long id,NoteDto note) {
        return Response.ok(noteService.update(id,note)).build();
    }
    

    @DELETE
    @Path("/{id}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response delete(@PathParam("id") Long id) {
        noteService.delete(id);
        return Response.noContent().build();
    }

}
