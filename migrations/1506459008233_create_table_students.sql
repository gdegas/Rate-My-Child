-- up
CREATE TABLE students (
  id          serial,
  name        text,
  parent_name text,
  parent_sms  bigint
  );
---
DROP TABLE IF EXISTS students;
-- down
