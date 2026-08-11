# 📚 Library Management System — MySQL Database

A relational **Library Management System database** built using **MySQL**.

This project manages books, categories, publishers, authors, library members, staff, book issues, book requests, fines, and fine payments using a structured relational database design.

## 🗂️ Project Overview

The database is designed to represent the complete workflow of a library:

- Manage book categories
- Store publisher information
- Manage authors and their books
- Track book locations and shelves
- Manage library members and membership status
- Record book issues and returns
- Handle book requests
- Track fines and payments
- Maintain relationships between all entities using primary and foreign keys
- Apply data validation using `CHECK`, `UNIQUE`, `NOT NULL`, and `REGEXP`

## 🛠️ Technologies Used

- **MySQL**
- SQL
- Relational Database Management System (RDBMS)

## 🗃️ Database Structure

The database contains the following 14 tables:

| # | Table | Purpose |
|---|---|---|
| 1 | `category` | Stores book categories |
| 2 | `publisher` | Stores publisher information |
| 3 | `location` | Stores shelf and floor information |
| 4 | `author` | Stores author details |
| 5 | `library_staff` | Stores library staff information |
| 6 | `member_status` | Stores membership and account status |
| 7 | `member` | Stores library member details |
| 8 | `book` | Stores book information |
| 9 | `book_author` | Connects books with authors |
| 10 | `book_issue` | Records book issue and return transactions |
| 11 | `book_request_status` | Stores book request availability status |
| 12 | `book_request` | Records member book requests |
| 13 | `fine_due` | Stores fines associated with issued books |
| 14 | `fine_payment` | Records fine payments |

## 🔗 Database Relationships

The database uses **Primary Keys (PK)** and **Foreign Keys (FK)** to maintain referential integrity.

### Main Relationships

- `category` → `book`
- `publisher` → `book`
- `location` → `book`
- `book` → `book_author`
- `author` → `book_author`
- `book` → `book_issue`
- `member` → `book_issue`
- `library_staff` → `book_issue`
- `member_status` → `member`
- `book` → `book_request`
- `member` → `book_request`
- `book_request_status` → `book_request`
- `member` → `fine_due`
- `book_issue` → `fine_due`
- `member` → `fine_payment`

The `book_author` table acts as a **junction table** to represent the many-to-many relationship between books and authors.

## 🔐 Data Integrity & Validation

The database includes multiple SQL constraints to prevent invalid data.

### Primary Keys

Every major entity has a unique primary key:

```sql
PRIMARY KEY
