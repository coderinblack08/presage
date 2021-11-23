import { NextApiRequest, NextApiResponse } from "next";

type HandlerParams = [NextApiRequest, NextApiResponse];

export class RouteController {
  public get(...p: HandlerParams) {}
  public post(...p: HandlerParams) {}
  public put(...p: HandlerParams) {}
  public delete(...p: HandlerParams) {}

  public handleRoutes() {
    return async (req: NextApiRequest, res: NextApiResponse) => {
      switch (req.method) {
        case "GET":
          await this.get(req, res);
          break;
        case "POST":
          await this.post(req, res);
          break;
        case "PUT":
          await this.put(req, res);
          break;
        case "DELETE":
          await this.delete(req, res);
          break;
        default:
          res.status(405).end(`Method ${req.method} Not Allowed`);
      }
    };
  }
}
