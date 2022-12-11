package pl.io.opinioncollector.infrastracture;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import pl.io.opinioncollector.domain.client.model.Client;
import pl.io.opinioncollector.domain.client.model.ClientId;
import pl.io.opinioncollector.domain.client.model.ClientUsername;

import java.util.Optional;

@Repository
public interface ClientRepository extends CrudRepository<Client, ClientId> {

    Optional<Client> findByUsername(ClientUsername username);

}