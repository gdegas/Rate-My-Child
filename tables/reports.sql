DROP TABLE IF EXISTS reports;

CREATE TABLE reports (
  id            serial,
  log_date      date,
  color         text,
  student_id    integer,
  log_comment   text
);
