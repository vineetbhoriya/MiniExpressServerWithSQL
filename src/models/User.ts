import { ResultSetHeader, RowDataPacket } from 'mysql2';
import db from '../config/db';

export interface IUser {
  id?: number;
  name: string;
  email: string;
  password: string;
  role: 'Student' | 'Teacher' | 'Institute';
  created_at?: Date;
}

export class UserModel {
  // Create a new user
  static async create(user: IUser): Promise<number> {
    const [result] = await db.query<ResultSetHeader>(
      'INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)',
      [user.name, user.email, user.password, user.role]
    );
    return result.insertId;
  }

  // Find a user by ID
  static async findById(id: number): Promise<IUser | null> {
    const [rows] = await db.query<RowDataPacket[]>('SELECT * FROM users WHERE id = ?', [id]);
    const users = rows as IUser[];
    if (users.length === 0) return null;
    return users[0];
  }

  // Find a user by email
  static async findByEmail(email: string): Promise<IUser | null> {
    const [rows] = await db.query<RowDataPacket[]>('SELECT * FROM users WHERE email = ?', [email]);
    const users = rows as IUser[];
    if (users.length === 0) return null;
    return users[0];
  }

  // Get all users
  static async findAll(): Promise<IUser[]> {
    const [rows] = await db.query<RowDataPacket[]>('SELECT * FROM users');
    return rows as IUser[];
  }

  // Find a user by email for authentication
  static async findOne(query: { email: string }): Promise<IUser | null> {
    const [rows] = await db.query<RowDataPacket[]>('SELECT id, name, email, password, role FROM users WHERE email = ?', [query.email]);
    const users = rows as IUser[];
    if (users.length === 0) return null;
    return users[0];
  }

  // Update a user by ID
  static async update(id: number, userUpdates: Partial<IUser>): Promise<void> {
    const { name, email, password, role } = userUpdates;
    const query = 'UPDATE users SET name = ?, email = ?, password = ?, role = ? WHERE id = ?';
    const values = [name, email, password, role, id];
    await db.query<ResultSetHeader>(query, values);
  }

  // Delete a user by ID
  static async delete(id: number): Promise<void> {
    await db.query<ResultSetHeader>('DELETE FROM users WHERE id = ?', [id]);
  }
}
