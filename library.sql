
DROP DATABASE IF EXISTS library;

CREATE DATABASE library;

USE library;


CREATE TABLE category (
    category_id INT PRIMARY KEY,
    category_name VARCHAR(40) NOT NULL UNIQUE,

    CHECK (
        category_name REGEXP '^[A-Za-z][A-Za-z &-]{1,39}$'
    )
);


-- =========================================================
-- 2. PUBLISHER
-- =========================================================

CREATE TABLE publisher (
    publisher_id INT PRIMARY KEY,
    publisher_name VARCHAR(60) NOT NULL,
    publication_language VARCHAR(30) NOT NULL,
    publication_type VARCHAR(30) NOT NULL,

    CHECK (
        publisher_name REGEXP '^[A-Za-z0-9 .,&''-]{2,60}$'
    ),

    CHECK (
        publication_language REGEXP '^[A-Za-z][A-Za-z -]{1,29}$'
    ),

    CHECK (
        publication_type REGEXP '^[A-Za-z][A-Za-z -]{1,29}$'
    )
);


-- =========================================================
-- 3. LOCATION
-- =========================================================

CREATE TABLE location (
    location_id INT PRIMARY KEY,
    shelf_no INT NOT NULL,
    shelf_name VARCHAR(30) NOT NULL,
    floor_no INT NOT NULL,

    CHECK (shelf_no > 0),

    CHECK (floor_no >= 0),

    CHECK (
        shelf_name REGEXP '^[A-Za-z0-9 -]{1,30}$'
    )
);


-- =========================================================
-- 4. AUTHOR
-- =========================================================

CREATE TABLE author (
    author_id INT PRIMARY KEY,
    first_name VARCHAR(20) NOT NULL,
    last_name VARCHAR(30) NOT NULL,

    CHECK (
        first_name REGEXP '^[A-Za-z][A-Za-z .''-]{1,19}$'
    ),

    CHECK (
        last_name REGEXP '^[A-Za-z][A-Za-z .''-]{1,29}$'
    )
);


-- =========================================================
-- 5. LIBRARY STAFF
-- =========================================================

CREATE TABLE library_staff (
    issued_by_id INT PRIMARY KEY,
    staff_name VARCHAR(40) NOT NULL,
    staff_designation VARCHAR(30) NOT NULL,

    CHECK (
        staff_name REGEXP '^[A-Za-z][A-Za-z .''-]{1,39}$'
    ),

    CHECK (
        staff_designation REGEXP '^[A-Za-z][A-Za-z -]{1,29}$'
    )
);


-- =========================================================
-- 6. MEMBER STATUS
-- =========================================================

CREATE TABLE member_status (
    active_status_id INT PRIMARY KEY,
    account_type VARCHAR(20) NOT NULL,
    account_status VARCHAR(25) NOT NULL,
    membership_start_date DATE NOT NULL,
    membership_end_date DATE,

    CHECK (
        account_type IN ('Student', 'Faculty', 'Staff', 'Guest')
    ),

    CHECK (
        account_status IN ('Active', 'Inactive', 'Suspended', 'Expired')
    ),

    CHECK (
        membership_end_date IS NULL
        OR membership_end_date >= membership_start_date
    )
);


-- =========================================================
-- 7. MEMBER
-- =========================================================

CREATE TABLE member (
    member_id INT PRIMARY KEY,

    first_name VARCHAR(20) NOT NULL,

    last_name VARCHAR(20) NOT NULL,

    city VARCHAR(40) NOT NULL,

    mobile_no VARCHAR(15) NOT NULL UNIQUE,

    email_id VARCHAR(254) NOT NULL UNIQUE,

    date_of_birth DATE NOT NULL,

    active_status_id INT NOT NULL,

    FOREIGN KEY (active_status_id)
        REFERENCES member_status(active_status_id),

    CHECK (
        mobile_no REGEXP '^[+]?[0-9]{10,15}$'
    ),

    CHECK (
        email_id REGEXP
        '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,}$'
    ),

    CHECK (
        first_name REGEXP '^[A-Za-z][A-Za-z .''-]{1,19}$'
    ),

    CHECK (
        last_name REGEXP '^[A-Za-z][A-Za-z .''-]{1,19}$'
    ),

    CHECK (
        city REGEXP '^[A-Za-z][A-Za-z .''-]{1,39}$'
    )
);


-- =========================================================
-- 8. BOOK
-- =========================================================

CREATE TABLE book (
    book_id INT PRIMARY KEY,

    ISBN_CODE VARCHAR(13) NOT NULL UNIQUE,

    book_title VARCHAR(100) NOT NULL,

    category_id INT NOT NULL,

    publisher_id INT NOT NULL,

    publication_year YEAR NOT NULL,

    book_edition VARCHAR(30),

    copies_total INT NOT NULL,

    copies_available INT NOT NULL,

    location_id INT NOT NULL,

    FOREIGN KEY (category_id)
        REFERENCES category(category_id),

    FOREIGN KEY (publisher_id)
        REFERENCES publisher(publisher_id),

    FOREIGN KEY (location_id)
        REFERENCES location(location_id),

    CHECK (
        ISBN_CODE REGEXP '^[0-9]{10}([0-9]{3})?$'
    ),

    CHECK (
        copies_total >= 0
    ),

    CHECK (
        copies_available >= 0
    ),

    CHECK (
        copies_available <= copies_total
    )
);


-- =========================================================
-- 9. BOOK AUTHOR
-- =========================================================

CREATE TABLE book_author (
    book_id INT NOT NULL,

    author_id INT NOT NULL,

    PRIMARY KEY (book_id, author_id),

    FOREIGN KEY (book_id)
        REFERENCES book(book_id),

    FOREIGN KEY (author_id)
        REFERENCES author(author_id)
);


-- =========================================================
-- 10. BOOK ISSUE
-- =========================================================

CREATE TABLE book_issue (
    issue_id INT PRIMARY KEY,

    book_id INT NOT NULL,

    member_id INT NOT NULL,

    issue_date DATE NOT NULL,

    return_date DATE,

    issue_status VARCHAR(22) NOT NULL,

    issued_by_id INT NOT NULL,

    FOREIGN KEY (book_id)
        REFERENCES book(book_id),

    FOREIGN KEY (member_id)
        REFERENCES member(member_id),

    FOREIGN KEY (issued_by_id)
        REFERENCES library_staff(issued_by_id),

    CHECK (
        issue_status IN
        ('Issued', 'Returned', 'Overdue', 'Lost')
    ),

    CHECK (
        return_date IS NULL
        OR return_date >= issue_date
    )
);


-- =========================================================
-- 11. BOOK REQUEST STATUS
-- =========================================================

CREATE TABLE book_request_status (
    available_status_id INT PRIMARY KEY,

    available_status VARCHAR(30) NOT NULL,

    nearest_available_date DATE,

    CHECK (
        available_status IN
        ('Available', 'Not Available', 'Reserved', 'Pending')
    )
);


-- =========================================================
-- 12. BOOK REQUEST
-- =========================================================

CREATE TABLE book_request (
    request_id INT PRIMARY KEY,

    book_id INT NOT NULL,

    member_id INT NOT NULL,

    request_date DATE NOT NULL,

    available_status_id INT NOT NULL,

    FOREIGN KEY (book_id)
        REFERENCES book(book_id),

    FOREIGN KEY (member_id)
        REFERENCES member(member_id),

    FOREIGN KEY (available_status_id)
        REFERENCES book_request_status(available_status_id)
);


-- =========================================================
-- 13. FINE DUE
-- =========================================================

CREATE TABLE fine_due (
    fine_id INT PRIMARY KEY,

    member_id INT NOT NULL,

    issue_id INT NOT NULL,

    fine_date DATE NOT NULL,

    fine_total DECIMAL(10,2) NOT NULL,

    FOREIGN KEY (member_id)
        REFERENCES member(member_id),

    FOREIGN KEY (issue_id)
        REFERENCES book_issue(issue_id),

    CHECK (
        fine_total >= 0
    )
);


-- =========================================================
-- 14. FINE PAYMENT
-- =========================================================

CREATE TABLE fine_payment (
    fine_payment_id INT PRIMARY KEY,

    member_id INT NOT NULL,

    payment_date DATE NOT NULL,

    payment_amount DECIMAL(10,2) NOT NULL,

    FOREIGN KEY (member_id)
        REFERENCES member(member_id),

    CHECK (
        payment_amount >= 0
    )
);


-- =========================================================
-- CHECK ALL TABLES
-- =========================================================

SHOW TABLES;




INSERT INTO category
(category_id, category_name)
VALUES
(1, 'Computer Science'),
(2, 'Science'),
(3, 'History'),
(4, 'Literature'),
(5, 'Mathematics');

INSERT INTO publisher
(publisher_id, publisher_name, publication_language, publication_type)
VALUES
(1, 'Pearson', 'English', 'Academic'),
(2, 'McGraw Hill', 'English', 'Academic'),
(3, 'Oxford Press', 'English', 'Academic'),
(4, 'Penguin Books', 'English', 'Fiction'),
(5, 'Cambridge Press', 'English', 'Academic');

INSERT INTO location
(location_id, shelf_no, shelf_name, floor_no)
VALUES
(1, 101, 'Computer Science A', 1),
(2, 102, 'Science A', 1),
(3, 201, 'History A', 2),
(4, 202, 'Literature A', 2),
(5, 301, 'Mathematics A', 3);

INSERT INTO author
(author_id, first_name, last_name)
VALUES
(1, 'Robert', 'Martin'),
(2, 'Thomas', 'Cormen'),
(3, 'Stephen', 'Hawking'),
(4, 'William', 'Shakespeare'),
(5, 'George', 'Orwell');

INSERT INTO library_staff
(issued_by_id, staff_name, staff_designation)
VALUES
(1, 'Rahul Sharma', 'Librarian'),
(2, 'Amit Patil', 'Assistant Librarian'),
(3, 'Sneha Khan', 'Librarian'),
(4, 'Priya Shah', 'Library Assistant');

INSERT INTO member_status
(active_status_id, account_type, account_status, membership_start_date, membership_end_date)
VALUES
(1, 'Student', 'Active', '2026-01-01', '2027-01-01'),
(2, 'Faculty', 'Active', '2026-01-01', '2028-01-01'),
(3, 'Staff', 'Active', '2026-02-01', '2027-02-01'),
(4, 'Student', 'Suspended', '2026-01-15', '2027-01-15'),
(5, 'Guest', 'Inactive', '2026-03-01', '2026-12-31');

INSERT INTO member
(member_id, first_name, last_name, city, mobile_no, email_id, date_of_birth, active_status_id)
VALUES
(1, 'Aseel', 'Shaikh', 'Nanded', '9876543210', 'aseel@gmail.com', '2005-05-15', 1),
(2, 'Rahul', 'Patil', 'Pune', '9876543211', 'rahul@gmail.com', '2004-08-20', 1),
(3, 'Sneha', 'Sharma', 'Mumbai', '9876543212', 'sneha@gmail.com', '2003-11-10', 2),
(4, 'Amit', 'Khan', 'Nashik', '9876543213', 'amit@gmail.com', '2005-02-25', 1),
(5, 'Priya', 'Shah', 'Aurangabad', '9876543214', 'priya@gmail.com', '2004-07-18', 3);

INSERT INTO book
(book_id, ISBN_CODE, book_title, category_id, publisher_id, publication_year, book_edition, copies_total, copies_available, location_id)
VALUES
(1, '9780132350884', 'Clean Code', 1, 1, 2008, '1st Edition', 10, 8, 1),
(2, '9780262033848', 'Introduction to Algorithms', 1, 2, 2009, '3rd Edition', 8, 5, 1),
(3, '9780553380163', 'A Brief History of Time', 2, 3, 1988, '1st Edition', 6, 4, 2),
(4, '9780141439518', 'Hamlet', 4, 4, 2003, '2nd Edition', 5, 5, 4),
(5, '9780451524935', '1984', 3, 4, 1949, '1st Edition', 7, 6, 3);

INSERT INTO book_author
(book_id, author_id)
VALUES
(1, 1),
(2, 2),
(3, 3),
(4, 4),
(5, 5),
(1, 2);

INSERT INTO book_issue
(issue_id, book_id, member_id, issue_date, return_date, issue_status, issued_by_id)
VALUES
(1, 1, 1, '2026-08-01', NULL, 'Issued', 1),
(2, 2, 2, '2026-07-20', '2026-08-01', 'Returned', 2),
(3, 3, 3, '2026-07-25', NULL, 'Overdue', 1),
(4, 4, 4, '2026-08-05', NULL, 'Issued', 3),
(5, 5, 5, '2026-07-10', '2026-07-20', 'Returned', 4);

INSERT INTO book_request_status
(available_status_id, available_status, nearest_available_date)
VALUES
(1, 'Available', '2026-08-11'),
(2, 'Not Available', '2026-08-20'),
(3, 'Reserved', '2026-08-15'),
(4, 'Pending', NULL);

INSERT INTO book_request
(request_id, book_id, member_id, request_date, available_status_id)
VALUES
(1, 1, 2, '2026-08-01', 1),
(2, 2, 3, '2026-08-02', 2),
(3, 3, 4, '2026-08-03', 3),
(4, 4, 5, '2026-08-04', 4);

INSERT INTO fine_due
(fine_id, member_id, issue_id, fine_date, fine_total)
VALUES
(1, 3, 3, '2026-08-10', 50.00),
(2, 1, 1, '2026-08-10', 20.00),
(3, 4, 4, '2026-08-10', 30.00);

INSERT INTO fine_payment
(fine_payment_id, member_id, payment_date, payment_amount)
VALUES
(1, 3, '2026-08-10', 50.00),
(2, 1, '2026-08-11', 20.00),
(3, 4, '2026-08-11', 10.00);

SELECT * FROM category;
SELECT * FROM publisher;
SELECT * FROM location;
SELECT * FROM author;
SELECT * FROM library_staff;
SELECT * FROM member_status;
SELECT * FROM member;
SELECT * FROM book;
SELECT * FROM book_author;
SELECT * FROM book_issue;
SELECT * FROM book_request_status;
SELECT * FROM book_request;
SELECT * FROM fine_due;
SELECT * FROM fine_payment;
