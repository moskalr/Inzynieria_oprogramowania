package pl.io.opinioncollector.application.controllers;

import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import pl.io.opinioncollector.domain.client.ClientFacade;
import pl.io.opinioncollector.domain.client.model.Client;

import java.security.Principal;

@RequiredArgsConstructor
@RestController
@RequestMapping("client")
public class ClientController {

    private final ClientFacade clientFacade;
    @GetMapping("/self")
    @PreAuthorize("hasAuthority('SCOPE_ADMIN')")
    public Client getClient(Principal principal) {
        String username = principal.getName();

        return clientFacade.getClient(username);
    }


    @PostMapping("changeEmail")
    public void changeEmail(String clientId, String email) {

        clientFacade.changeEmail(clientId, email);
    }

}
