import { createParamDecorator } from "@nestjs/common";

export const UserId = createParamDecorator((_, req) => {
  return req.user ? req.user.id : null;
});
