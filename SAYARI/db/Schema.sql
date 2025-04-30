DROP TABLE IF EXISTS answers;
DROP TABLE IF EXISTS questions;
DROP TABLE IF EXISTS users;

DROP SEQUENCE IF EXISTS answers_id_seq;
DROP SEQUENCE IF EXISTS questions_id_seq;
DROP SEQUENCE IF EXISTS users_id_seq;

CREATE SEQUENCE users_id_seq START 1;
CREATE SEQUENCE questions_id_seq START 1;
CREATE SEQUENCE answers_id_seq START 1;

CREATE TABLE users (
  id BIGINT PRIMARY KEY DEFAULT nextval('users_id_seq'),
  username VARCHAR(255) NOT NULL UNIQUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE questions (
  id BIGINT PRIMARY KEY DEFAULT nextval('questions_id_seq'),
  user_id BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  body TEXT NOT NULL,
  creation BIGINT NOT NULL,
  score INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE answers (
  id BIGINT PRIMARY KEY DEFAULT nextval('answers_id_seq'),
  question_id BIGINT NOT NULL REFERENCES questions(id) ON DELETE CASCADE,
  user_id BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  body TEXT NOT NULL,
  creation BIGINT NOT NULL,
  score INTEGER NOT NULL DEFAULT 0,
  accepted BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);


CREATE INDEX idx_answers_question_id ON answers(question_id);
