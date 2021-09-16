const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const validateUser = require("../helpers/validateUser");
const { ErrorHandler } = require("../helpers/error");

const {
  getUserByEmailDb,
  getUserByUsernameDb,
  createUserDb,
} = require("../db/user.db");
const { createCartDb } = require("../db/cart.db");

class AuthService {
  async signUp(user) {
    try {
      const { password, email, fullName, username } = user;
      if (!email || !password || !fullName || !username) {
        throw new ErrorHandler(401, "all fields required");
      }

      if (validateUser(email, password)) {
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt);

        const userByEmail = await getUserByEmailDb(email);
        const userByUsername = await getUserByUsernameDb(username);

        if (userByEmail) {
          throw new ErrorHandler(401, "email taken already");
        }

        if (userByUsername) {
          throw new ErrorHandler(401, "username taken already");
        }

        const newUser = await createUserDb({
          ...user,
          password: hashedPassword,
        });

        const { id: cartId } = await createCartDb(newUser.user_id);

        return {
          userId: newUser.user_id,
          cartId,
          fullName: newUser.fullName,
          email: newUser.email,
        };
      } else {
        throw new ErrorHandler(401, "Input validation error");
      }
    } catch (error) {
      throw new ErrorHandler(error.statusCode, error.message);
    }
  }

  async login(email, password) {
    try {
      if (!validateUser(email, password)) {
        throw new ErrorHandler(403, "Invalid login");
      }

      const user = await getUserByEmailDb(email);

      if (!user) {
        throw new ErrorHandler(403, "Email or password incorrect.");
      }

      const {
        password: dbPassword,
        user_id,
        roles,
        cart_id,
        fullName,
        username,
      } = user;
      const isCorrectPassword = await bcrypt.compare(password, dbPassword);

      if (!isCorrectPassword) {
        throw new ErrorHandler(403, "Email or password incorrect.");
      }

      const token = await this.signToken({ id: user_id, roles, cart_id });
      const refreshToken = await this.signRefreshToken({
        id: user_id,
        roles,
        cart_id,
      });
      return {
        token,
        refreshToken,
        user: {
          user_id,
          fullName,
          username,
        },
      };
    } catch (error) {
      throw new ErrorHandler(error.statusCode, error.message);
    }
  }

  async generateRefreshToken(data) {
    const payload = await this.verifyRefreshToken(data);

    const token = await this.signToken(payload);
    const refreshToken = await this.signRefreshToken(payload);

    return {
      token,
      refreshToken,
    };
  }

  async signToken(data) {
    try {
      return jwt.sign(data, process.env.SECRET, { expiresIn: "2h" });
    } catch (error) {
      throw new ErrorHandler(500, "An error occurred");
    }
  }

  async signRefreshToken(data) {
    try {
      return jwt.sign(data, process.env.REFRESH_SECRET, { expiresIn: "1h" });
    } catch (error) {
      throw new ErrorHandler(500, error.message);
    }
  }

  async verifyRefreshToken(token) {
    try {
      const payload = jwt.verify(token, process.env.REFRESH_SECRET);
      return {
        id: payload.id,
        roles: payload.roles,
        cart_id: payload.cart_id,
      };
    } catch (error) {
      throw new ErrorHandler(500, error.message);
    }
  }
}

module.exports = new AuthService();
