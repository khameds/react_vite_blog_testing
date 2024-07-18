DROP TABLE if exists user;
DROP TABLE if exists comment;
DROP TABLE if exists article;
DROP TABLE if exists category;
CREATE TABLE user (
    id INT PRIMARY KEY auto_increment,
    firstname VARCHAR(50) NOT NULL,
    lastname VARCHAR(50) NOT NULL,
    pseudo VARCHAR(50) NOT NULL DEFAULT 'unknown',
    email VARCHAR(255) UNIQUE NOT NULL,
    hashedPassword text NOT NULL,
    avatar VARCHAR(255),
    status BOOLEAN DEFAULT false,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
CREATE TABLE category (
    id INT PRIMARY KEY auto_increment,
    name VARCHAR(50) NOT NULL UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
CREATE TABLE article (
    id INT PRIMARY KEY auto_increment,
    title VARCHAR(50) NOT NULL,
    description VARCHAR(50) NOT NULL,
    category_id INT NOT NULL,
    user_id INT NOT NULL,
    CONSTRAINT fk_article_category FOREIGN KEY (category_id) REFERENCES category(id) ON DELETE CASCADE,
    CONSTRAINT fk_article_user FOREIGN KEY (user_id) REFERENCES user(id) ON DELETE CASCADE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
CREATE TABLE comment (
    id INT PRIMARY KEY auto_increment,
    description TEXT NOT NULL,
    user_id INT NOT NULL,
    article_id INT NOT NULL,
    CONSTRAINT fk_user_comment FOREIGN KEY (user_id) REFERENCES user(id) ON DELETE CASCADE,
    CONSTRAINT fk_article_comment FOREIGN KEY (article_id) REFERENCES article(id) ON DELETE CASCADE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);