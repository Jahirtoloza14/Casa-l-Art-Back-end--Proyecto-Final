import { Request, Response } from "express";
import { User } from "../models/User";
import bcrypt from 'bcrypt';
import { TokenData } from "../types/types";
import { dataSource } from "../database/data-source";
import jwt from "jsonwebtoken";
import { StatusCodes } from "http-status-codes";
import { UserRoles } from "../constants/Roles";




export const UserControler = {

  // Create user client
  async register(req: Request, res: Response): Promise<void> {
    const userRepository = dataSource.getRepository(User);
    const { first_name, last_name, email, password } = req.body;
    try {
      const newUser = userRepository.create({
        first_name: first_name,
        last_name: last_name,
        email: email,
        password: bcrypt.hashSync(password, 10),
        role: UserRoles.CLIENT



      });

      await userRepository.save(newUser);
      res.status(StatusCodes.CREATED).json({
        message: "User created Successfull",
      });
      return
    } catch (error: any) {

      res.status(500).json({
        message: "Error register",
        error: error.message,
      }); return
    }
  },
 



   // Create user admin
  async registerAdmin(req: Request, res: Response): Promise<void> {
    const userRepository = dataSource.getRepository(User);
    const { first_name, last_name, email, password } = req.body;
    try {
     
            const newUser = userRepository.create({
        first_name: first_name,
        last_name: last_name,
        email: email,
        password: bcrypt.hashSync(password, 10),
        role: UserRoles.ADMIN
      });

      await userRepository.save(newUser);
      res.status(StatusCodes.CREATED).json({
        message: "User created Successfull",
      });
      return
    } catch (error: any) {

      res.status(500).json({
        message: "Error Register",
        error: error.message,
      }); return
    }
  },


  // login 
  async login(req: Request, res: Response): Promise<void> {

    try {
      const { email, password } = req.body;
      if (!email || !password) {
        res.status(400).json({
          message: "You Need Email or Password wrong",
        });
        return;
      }
      const user = await User.findOne({
        relations: { role: true },
        where: {
          email: email,
        },
        select: {
          id: true, email: true, password: true,


        },
      });
      if (!user) {
        res.status(400).json({
          message: "Email or Password wrong",
        });
        return;
      }
      const ispasswordValid = bcrypt.compareSync(password, user.password);
      if (!ispasswordValid) {
        res.status(500).json({
          message: "Email or Password wrong",
        });
        return;
      }
      const roleName = user.role.name;
      const tokenPayload: TokenData = {
        id: user.id,
        
        role: roleName,
      };
      const token = jwt.sign(tokenPayload, process.env.JWT_SECRET as string, {
        expiresIn: '150h'
      });
      res.status(StatusCodes.OK).json({
        message: "Login Successfull",
        token,
      });
      return;
    } catch (error) {
      res.status(400).json({
        message: "Error Login",
        error: (error as any).message,
      }); return
  }},

  //Show all users
  async getAll(req: Request, res: Response) {
    try {


      const [users] = await User.findAndCount(

        {
          relations: {
            role: true

          }


        }
      );
      res.json(users);
    } catch (error) {
      res.status(500).json({ message: "Something went wrong" });
    }
  },
  // Show porfile by user loged
  async getLogedUser(req: Request, res: Response) {
    try {
      const userId = req.tokenData.id;
      const user = await User.findOne({
        relations: {
          role: true
        },
        where: {
          id: userId,
        }
      });
      if (!user) {
        res.status(404).json({ message: "User not found" });
        return;
      }
      res.json(user);
    } catch (error) {
      res.status(500).json({
        message: "Failed to get user profile"
      })
    }
  },
  // update user
  async updateLogedUser(req: Request, res: Response) {
    try {
      const userId = req.tokenData?.id;
      const { first_name, last_name, email } = req.body;
      const user = await User.findOne({ where: { id: userId } });
      if (!user) {
        res.status(StatusCodes.NOT_FOUND).json({ message: "User not found" });
        return;
      }
      user.first_name = first_name;
      user.last_name = last_name;
      user.email = email;
      await user.save();
      res.status(StatusCodes.OK).json(user);
      return;
    } catch (error) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "Something went wrong" });
      return;
    }
  },
  // delete reservation
  async deleteUser(req: Request, res: Response)  {
    try {
  
      const usersId= Number(req.params.id);
      const userDate = await User.findOne({ where: { id: usersId} });
      if (!userDate) {
        res.status(404).json({ message: "user not found" });
        return;
      }
      await userDate.remove();
      res.json({ message: "user deleted" });
    } catch (error) {
      res.status(500).json({ message: "Something went wrong" });
    }
}






}