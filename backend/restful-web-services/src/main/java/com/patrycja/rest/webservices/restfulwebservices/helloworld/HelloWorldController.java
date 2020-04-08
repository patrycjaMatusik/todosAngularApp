package com.patrycja.rest.webservices.restfulwebservices.helloworld;

import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
public class HelloWorldController {

    @RequestMapping(method = RequestMethod.GET, path = "/helloWorld")
    public String helloWorld(){
        return "Hello World!";
    }

    @RequestMapping(method = RequestMethod.GET, path = "/helloWorldBean")
    public HelloWorldBean helloWorldBean(){
        return new HelloWorldBean("Hello World!");
    }

    @RequestMapping(method = RequestMethod.GET, path = "/helloWorldBean/{name}")
    public HelloWorldBean helloWorldBeanWithPathVar(@PathVariable String name){
        return new HelloWorldBean(String.format("Hello World! %s", name));
    }
}
