Drop Table if exists  users;

CREATE TABLE users (
  ID SERIAL PRIMARY KEY,
  name VARCHAR(30),
  email VARCHAR(30)
);

INSERT INTO
  users (name, email)
VALUES
  ('Jerry', 'jerry@example.com'),
  ('George', 'george@example.com');

select
  *
from
  users;

  