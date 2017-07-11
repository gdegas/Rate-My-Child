DROP TABLE IF EXISTS students;

CREATE TABLE students (
  id          serial,
  name        text,
  parent_name text,
  parent_sms  integer
  );
