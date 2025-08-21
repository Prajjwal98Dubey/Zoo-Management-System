
create table animals(
    animal_id varchar(255) primary key,
    animal_name varchar(255) not null,
    species varchar(255) not null,
    health_status varchar(255) not null,
    age int not null,
    weight int not null,
    enclosure text not null,
    last_checkup timestamp default current_timestamp,
    diet text not null,
    notes text not null,
    category varchar(255) not null,
)

create table staff (
    staff_id varchar(255) primary key,
    staff_name varchar(255) not null,
    phone varchar(15) not null,
    staff_email varchar(255) unique not null,
    hired_date varchar(255) not null,
    shiff_time varchar(255) not null,
    staff_profession varchar(255) not null,
    staff_specialist varchar(255) not null
)

create table visitors(
    id varchar(255) primary key,
    number_of_tickets int not null,
    created_at timestamp default current_timestamp
)