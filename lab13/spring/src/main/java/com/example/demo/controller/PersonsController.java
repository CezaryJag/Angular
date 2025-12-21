package com.example.demo.controller;

import com.example.demo.entity.PersonEntity;
import com.example.demo.repository.PersonRepository;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.*;

@RestController
@RequestMapping("/persons")
@CrossOrigin(origins = "*", allowedHeaders = "*", methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE, RequestMethod.OPTIONS})
public class PersonsController {

    private final PersonRepository personRepository;

    public PersonsController(PersonRepository personRepository) {
        this.personRepository = personRepository;
    }

    private Person toDto(PersonEntity e) {
        Person p = new Person();
        p.setId(e.getId());
        p.setFirstName(e.getFirstName());
        p.setFamilyName(e.getFamilyName());
        p.setAge(e.getAge());
        if (e.getAddress() != null) {
            Person.Address a = new Person.Address();
            a.setCity(e.getAddress().getCity());
            a.setStreet(e.getAddress().getStreet());
            a.setPostCode(e.getAddress().getPostCode());
            p.setAddress(a);
        }
        return p;
    }

    private PersonEntity toEntity(Person p) {
        PersonEntity e = new PersonEntity();
        e.setId(p.getId());
        e.setFirstName(p.getFirstName());
        e.setFamilyName(p.getFamilyName());
        e.setAge(p.getAge());
        if (p.getAddress() != null) {
            PersonEntity.Address a = new PersonEntity.Address();
            a.setCity(p.getAddress().getCity());
            a.setStreet(p.getAddress().getStreet());
            a.setPostCode(p.getAddress().getPostCode());
            e.setAddress(a);
        }
        return e;
    }

    @GetMapping
    public List<Person> listAll() {
        List<Person> out = new ArrayList<>();
        for (PersonEntity e : personRepository.findAll()) {
            out.add(toDto(e));
        }
        return out;
    }

    @GetMapping("/{id}")
    public ResponseEntity<Person> getOne(@PathVariable("id") Long id) {
        Optional<PersonEntity> oe = personRepository.findById(id);
        if (oe.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
        return ResponseEntity.ok(toDto(oe.get()));
    }

    @PostMapping
    public ResponseEntity<Person> create(@RequestBody Person person) {
        PersonEntity e = toEntity(person);
        PersonEntity saved = personRepository.save(e);
        URI location = URI.create(String.format("/persons/%d", saved.getId()));
        HttpHeaders headers = new HttpHeaders();
        headers.setLocation(location);
        return new ResponseEntity<>(toDto(saved), headers, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Person> update(@PathVariable("id") Long id, @RequestBody Person person) {
        Optional<PersonEntity> existing = personRepository.findById(id);
        if (existing.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
        PersonEntity e = existing.get();
        e.setFirstName(person.getFirstName());
        e.setFamilyName(person.getFamilyName());
        e.setAge(person.getAge());
        if (person.getAddress() != null) {
            PersonEntity.Address a = e.getAddress();
            if (a == null) a = new PersonEntity.Address();
            a.setCity(person.getAddress().getCity());
            a.setStreet(person.getAddress().getStreet());
            a.setPostCode(person.getAddress().getPostCode());
            e.setAddress(a);
        }
        PersonEntity saved = personRepository.save(e);
        return ResponseEntity.ok(toDto(saved));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable("id") Long id) {
        boolean exists = personRepository.existsById(id);
        if (!exists) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
        personRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
