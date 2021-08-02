import { Request, Router } from "express";
import createHttpError from "http-errors";
import { Server } from "socket.io";
import { DefaultEventsMap } from "socket.io/dist/typed-events";
import { getConnection } from "typeorm";
import { DirectMessage } from "../../../entities/DirectMessage";
import { Message } from "../../../entities/Message";
import { Reward } from "../../../entities/Reward";
import { User } from "../../../entities/User";
import { limiter } from "../../../lib/rateLimit";
import { isAuth } from "../auth/isAuth";

export const createMessageSocket = (
  io: Server<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap>
) => {
  io.on("connection", (socket) => {
    socket.on("join room", async (roomId: string, cb) => {
      const { userId } = socket as any;
      const room = await DirectMessage.findOne(roomId);
      if (!room) {
        return cb(new Error("DM doesn't exist"));
      }
      if (!(room?.recipientId === userId || room?.senderId === userId)) {
        return cb(new Error("You are not in this DM"));
      }
      if (!room.open) {
        return cb(new Error("DM is closed"));
      }
      socket.join(roomId);
    });
    socket.on("leave room", async (roomId: string, cb) => {
      if (roomId in socket.rooms) {
        socket.leave(roomId);
      } else {
        cb(new Error("You are not in this DM"));
      }
    });
    socket.on("send message", async (data: any, cb) => {
      const { message, directMessageId } = data;
      const { userId } = socket as any;
      if (socket.rooms.has(directMessageId)) {
        if (message.trim().length === 0 || message.trim().length > 500) {
          cb(
            new Error("Message must be between 0 and 500 characters in length")
          );
        }
        const savedMessage = await Message.create({
          message: message.trim(),
          directMessageId,
          userId,
        }).save();
        const user = await User.findOne(userId);
        io.to(directMessageId).emit("new message", { ...savedMessage, user });
      } else {
        cb(new Error("Join the room before messaging"));
      }
    });
  });
};

const router = Router();

router.get(
  "/dms",
  limiter({ max: 50 }),
  isAuth(true),
  async (req: Request<{}, {}, {}, { type: string }>, res, next) => {
    try {
      const type = req.query.type;
      if (!(!type || type === "recipient" || type == "sender")) {
        return next(createHttpError(400, "Invalid type"));
      }
      const dms = await getConnection().query(
        `
          select 
            dm.*, 
            to_jsonb(rw) as reward,
            json_build_object(
              'id', r.id,
              'username', r.username,
              'displayName', r."displayName",
              'profilePicture', r."profilePicture"
            ) as recipient,
            json_build_object(
              'id', s.id,
              'username', s.username,
              'displayName', s."displayName",
              'profilePicture', s."profilePicture"
            ) as sender
          from direct_message dm
          left join claimed_reward cr on cr.id = dm."claimedRewardId"
          left join reward rw on rw.id = cr."rewardId"
          left join public.user r on r.id = dm."recipientId"
          left join public.user s on s.id = dm."senderId"
          ${
            type
              ? type === "recipient"
                ? `where dm."recipientId" = $1`
                : `where dm."senderId" = $1`
              : ""
          }
          order by dm.open desc, dm."lastMessageSentAt" desc;
        `,
        type ? [req.userId] : []
      );
      res.json(dms);
    } catch (error) {
      next(createHttpError(500, error));
    }
  }
);

router.get(
  "/:id",
  limiter({ max: 50 }),
  isAuth(true),
  async (req: Request<{ id: string }>, res, next) => {
    try {
      const messages = await Message.find({
        where: { directMessageId: req.params.id },
        order: { createdAt: "DESC" },
        relations: ["user"],
      });
      res.json(messages.reverse());
    } catch (error) {
      next(createHttpError(500, error));
    }
  }
);

router.get(
  "/dm/:id",
  limiter({ max: 50 }),
  isAuth(true),
  async (req: Request<{ id: string }>, res, next) => {
    try {
      const dm = await DirectMessage.findOne(req.params.id, {
        relations: ["recipient", "sender", "claimedReward"],
      });
      const reward = await Reward.findOne(dm?.claimedReward.rewardId);
      res.json({ ...dm, reward });
    } catch (error) {
      next(createHttpError(500, error));
    }
  }
);

export default router;
