import { NextApiRequest, NextApiResponse } from "next";
import { admin } from "../../lib/admin";
import { RouteController } from "../../lib/RouteController";

class LoginController extends RouteController {
  private EXPIRES_IN = 5 * 24 * 60 * 60 * 1000;

  async post(req: NextApiRequest, res: NextApiResponse) {
    try {
      const { token } = req.headers;
      if (!token) {
        return res.status(401).json(new Error("Invalid token"));
      }
      const cookie = await admin.auth.createSessionCookie(token.toString(), {
        expiresIn: this.EXPIRES_IN,
      });
      console.log(cookie);
      // nookies.set({ res }, "jid", cookie, {
      //   path: "/",
      //   maxAge: this.EXPIRES_IN,
      //   httpOnly: true,
      //   secure: process.env.NODE_ENV === "production",
      // });
      res.status(200).end();
    } catch (error) {
      console.error(error);
      res.status(500).json(error);
    }
  }
}

export default new LoginController().handleRoutes();
