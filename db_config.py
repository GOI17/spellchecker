import sqlite3
from sqlite3 import Error


def create_connection():
    conn = None
    print("Opening Database...")
    try:
        conn = sqlite3.connect("spellchecker.db")
        print("Opened Database")
        create_table(conn)
    except Error as e:
        raise e
    finally:
        if conn:
            conn.close()


def create_table(db):
    db.execute(
        """
               CREATE TABLE REQUESTS (
               ID INTEGER PRIMARY KEY AUTOINCREMENT,
               HOST BLOB NOT NULL,
               METHOD TEXT NOT NULL,
               INPUT BLOB NOT NULL);
            """
    )
    print("Created Requests table")


def get_data():
    conn = None
    try:
        conn = sqlite3.connect("spellchecker.db")
        print("Opened Database")
        sql = "SELECT HOST 'host', METHOD 'method', INPUT 'input'\
            FROM REQUESTS"
        conn.row_factory = sqlite3.Row
        cursor = conn.cursor()
        cursor.execute(sql)
        rows = cursor.fetchall()

        return [dict(row) for row in rows]
    except Error:
        raise Error
    finally:
        if conn:
            conn.close()


def insert_into_table(host, method, input):
    conn = None
    try:
        conn = sqlite3.connect("spellchecker.db")
        print("Opened Database")
        sql = """ INSERT INTO REQUESTS(HOST, METHOD, INPUT)
            VALUES(?,?,?) """
        cursor = conn.cursor()
        cursor.execute(sql, (host, method, input))
        conn.commit()
        print(f"Inserted ID: {cursor.lastrowid}")
    except Error as e:
        raise e
    finally:
        if conn:
            conn.close()


if __name__ == "__main__":
    create_connection()
