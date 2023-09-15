-- Create the user table
CREATE TABLE if not exists user (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    firstName TEXT NOT NULL,
    surname TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    username TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL UNIQUE,
    userType TEXT NOT NULL CHECK (userType IN ('admin', 'attendee'))
);

-- Create the admin table linked to the user table
CREATE TABLE if not exists admin (
    adminId INTEGER PRIMARY KEY AUTOINCREMENT,
    userId INTEGER NOT NULL,
    username TEXT NOT NULL UNIQUE,
    FOREIGN KEY (userId) REFERENCES user (id)
);

-- Create the attendee table linked to the user table
CREATE TABLE if not exists attendee (
    attendeeId INTEGER PRIMARY KEY AUTOINCREMENT,
    userId INTEGER NOT NULL,
    username TEXT NOT NULL UNIQUE,
    FOREIGN KEY (userId) REFERENCES user (id)
);

-- Create the registration table linked to admin and attendee
CREATE TABLE if not exists register (
    registrationId INTEGER PRIMARY KEY AUTOINCREMENT,
    adminId INTEGER NOT NULL,
    attendeeId INTEGER NOT NULL,
    FOREIGN KEY (adminId) REFERENCES admin (adminId),
    FOREIGN KEY (attendeeId) REFERENCES attendee (attendeeId)
);

