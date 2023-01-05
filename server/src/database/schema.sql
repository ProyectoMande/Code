CREATE TABLE client(
    phone VARCHAR(100),
    full_name VARCHAR(200),
    pw VARCHAR(100),
    address VARCHAR(200),
    email VARCHAR(100),
    card_number INTEGER,
    PRIMARY KEY (phone)
);


CREATE TABLE employee (
    phone VARCHAR(100),
    full_name VARCHAR(200),
    pw VARCHAR(100),
    stars INTEGER,
    availability BOOLEAN,
    address VARCHAR(200),
    PRIMARY KEY(phone)
);

CREATE TABLE request(
    id SERIAL,
    description VARCHAR(500),
    state VARCHAR(100),
    empl_phone VARCHAR(100),
    user_phone VARCHAR(100),
    id_work VARCHAR(100),
    PRIMARY KEY(id),
    FOREIGN KEY(empl_phone) REFERENCES employee (phone),
    FOREIGN KEY(user_phone) REFERENCES client (phone)
);

CREATE TABLE work(
    id SERIAL,
    PRIMARY KEY(id),
    name VARCHAR(100)
);  

CREATE TABLE employee_work(
    empl_phone VARCHAR(100),
    id_work SERIAL,
    paid INTEGER,
    PRIMARY KEY(empl_phone, id_work),
    FOREIGN KEY(empl_phone) REFERENCES employee(phone),
    FOREIGN KEY(id_work) REFERENCES work(id)
);

