CREATE TABLE user(
    phone VARCHAR(100),
    full_name VARCHAR(200),
    pw VARCHAR(100),
    address VARCHAR(200),
    email VARCHAR(100),
    card_number INTEGER(20),
    PRIMARY KEY (phone)
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
    FOREIGN KEY(user_phone) REFERENCES user (phone)
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

CREATE TABLE employee_work(
    empl_phone VARCHAR(100),
    id_work VARCHAR(100),
    paid INTEGER,
    PRIMARY KEY(empl_phone),
    PRIMARY KEY(id_work),
    FOREIGN KEY(empl_phone) REFERENCES employee(phone)
);