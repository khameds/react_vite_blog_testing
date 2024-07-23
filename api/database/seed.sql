-- Création de l'utilisateur avec le rôle "user"
INSERT INTO user (firstname, lastname, pseudo, email, hashedPassword, avatar, status, role)
VALUES ('userFirstname', 'userLastname', 'user', 'user@mail.com', 'hashed_password_here', '', true, 'user');

-- Création de l'utilisateur avec le rôle "admin"
INSERT INTO user (firstname, lastname, pseudo, email, hashedPassword, avatar, status, role)
VALUES ('adminFirstname', 'adminLastname', 'admin', 'admin@mail.com', 'hashed_password_here', '', true, 'admin');