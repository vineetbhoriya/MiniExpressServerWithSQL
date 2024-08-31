import { NextFunction, Request, Response } from "express";
import bcrypt from "bcrypt";
import { IUser, UserModel } from "../models/User";
import dotenv from "dotenv";

dotenv.config();

// Create a new user
export const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { name, email, password, role } = req.body;

    // Check if the user already exists
    const existingUser = await UserModel.findByEmail(email);
    if (existingUser) {
      throw new Error(`User ${email} already exists`);
    }

    // Validate and parse salt rounds
    const saltRounds = parseInt(process.env.SALT_KEY || "10", 10);
    if (isNaN(saltRounds) || saltRounds <= 0) {
      throw new Error("Invalid salt rounds value");
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create new user object including the role
    const newUser: IUser = { name, email, password: hashedPassword, role };
    await UserModel.create(newUser);

    res.status(201).json({ message: "User added successfully" });
  } catch (error) {
    next(error);
  }
};

// Get all users
export const getUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const users = await UserModel.findAll();
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};

// Update a user by ID
export const updateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const userId = parseInt(req.params.id);
    const userUpdates: Partial<IUser> = req.body;

    const existingUser = await UserModel.findById(userId);
    if (!existingUser) {
      throw new Error(`User with ID ${userId} does not exist`);
    }

    // Update user details
    await UserModel.update(userId, userUpdates);

    res.status(200).json({ message: "User updated successfully" });
  } catch (error) {
    next(error);
  }
};

// Delete a user by ID
export const deleteUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const userId = parseInt(req.params.id);

    const existingUser = await UserModel.findById(userId);
    if (!existingUser) {
      throw new Error(`User with ID ${userId} does not exist`);
    }
    await UserModel.delete(userId);

    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    next(error);
  }
};
