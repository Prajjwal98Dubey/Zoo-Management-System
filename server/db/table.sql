
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


CREATE TABLE feeding_schedules (
  id VARCHAR(255) PRIMARY KEY,
  animal_id VARCHAR(255) NOT NULL REFERENCES animals(animal_id),
  animal_name TEXT NOT NULL,
  feeding_time TIMESTAMP NOT NULL,
  food_type TEXT NOT NULL,
  amount TEXT NOT NULL,
  staff_id VARCHAR(255) NOT NULL REFERENCES staff(staff_id),
  staff_name TEXT NOT NULL,
  completed BOOLEAN DEFAULT FALSE,
  notes TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


create table recent_activity(
    id varchar(255) primary key,
    note varchar(255) not null,
    created_at default current_timestamp
)