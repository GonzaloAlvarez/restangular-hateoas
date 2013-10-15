Restangular HATEOAS
=============================

This project aims to present a way for [Restangular](https://github.com/mgonto/restangular)
to interact with a [HATEOAS](https://en.wikipedia.org/wiki/HATEOAS) based backend such as
[Spring Data Rest](http://projects.spring.io/spring-data-rest/).

HATEOAS JSON
-----------------------------

For our example, the data provided by the backend was similiar to the following:

```JSON
{
    "links": [
        {
            "rel": "next",
            "href": "http://localhost:8090/spring-rest-bootstrap/api/books?page=2&size=2"
        },
        {
            "rel": "prev",
            "href": "http://localhost:8090/spring-rest-bootstrap/api/books?page=0&size=2"
        }
    ],
    "content": [
        {
            "name": "The Lord of the Rings",
            "links": [
                {
                    "rel": "self",
                    "href": "http://localhost:8090/spring-rest-bootstrap/api/books/6"
                }
            ]
        },
        {
            "name": "The Silence of the Lambs",
            "links": [
                {
                    "rel": "self",
                    "href": "http://localhost:8090/spring-rest-bootstrap/api/books/7"
                }
            ]
        }
    ],
    "page": {
        "size": 2,
        "totalElements": 5,
        "totalPages": 3,
        "number": 1
    }
}
```

In this example we have a Books backend entity with only the name field.
The response extractor would be transformed by the ResponseExtractor hook in the Main.js file 
into something the AngularJS library could use, like this:

```JSON
{
    [
        {
            "name": "The Lord of the Rings",
            "href": "http://localhost:8090/spring-rest-bootstrap/api/books/6"
        },
        {
            "name": "The Silence of the Lambs",
            "href": "http://localhost:8090/spring-rest-bootstrap/api/books/7"
        }
    ],
    "links": [
        {
            "rel": "next",
            "href": "http://localhost:8090/spring-rest-bootstrap/api/books?page=2&size=2"
        },
        {
            "rel": "prev",
            "href": "http://localhost:8090/spring-rest-bootstrap/api/books?page=0&size=2"
        }
    ],
    "page": {
        "size": 2,
        "totalElements": 5,
        "totalPages": 3,
        "number": 1
    }
}
```

The two main differences are:
* The main element already contains the content, so the array is in the first level
* Within each element, the href tag is set to the self link. Also, the links array is removed, 
because it was sent back to the server as part of the element.

Authors
----------------------------------

Copyright [Gonzalo Alvarez](http://www.gonzaloalvarez.es), 2013.

Big thanks to [Martin Gontovnikas](http://www.gon.to/).

License
----------------------------------

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program.  If not, see <http://www.gnu.org/licenses/>.
