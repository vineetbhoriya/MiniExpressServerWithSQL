CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role ENUM('Student', 'Teacher', 'Institute') NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO users (name, email, password, role) VALUES 
('John Doe', 'john.doe@example.com', 'hashed_password_1', 'Student'),
('Mark Wilson', 'mark.wilson@example.com', 'hashed_password_3', 'Institute');
