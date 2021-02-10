create table users
(
    user_id text UNIQUE,
    name text,
    insert_date timestamp with time zone,
    update_date timestamp with time zone
);

INSERT INTO users(user_id, name) VALUES
  ('user1', 'name1'),
  ('user2', 'name2'),
  ('user3', '名前3')
;
