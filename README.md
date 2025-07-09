# Notes App — Quarkus + Angular

This is a simple test project to integrate a Quarkus backend API with an Angular frontend application.

---

## Technologies Used

- **Backend:** [Quarkus](https://quarkus.io/) (Java 21)
- **Frontend:** [Angular](https://angular.io/) (version X.X)
- **Database:** PostgreSQL
- **Test:** Junit & Jest

---

## Prerequisites

- Java 21 or higher
- Maven
- Node.js and npm
- PostgreSQL



---

## Running the Backend (Quarkus)

1. Configure your database connection in `back/src/main/resources/application.properties`:

```sh
quarkus.datasource.db-kind=postgresql
quarkus.datasource.username=postgres
quarkus.datasource.password=1234
quarkus.datasource.jdbc.url=jdbc:postgresql://localhost:5432/notes-test
quarkus.hibernate-orm.database.generation=drop-and-create
```

2. Start the backend
```sh
cd back
./mvnw quarkus:dev
```


## Running the Frontend (Angular)
1. Install frontend dependencies:
```sh
cd frontend
npm install
```

2. Run the Angular development server:

```sh
npm start
```
The frontend will be available at http://localhost:4200.


## Testing

### Run backend tests with:
```sh
cd back
./mvnw test
```

### Run frontend tests with:
```sh
cd front
npm test
```
