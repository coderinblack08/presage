import { createParamDecorator, ExecutionContext } from "@nestjs/common";

export const CurrentUser = createParamDecorator((_, ctx: ExecutionContext) => {
  return ctx.switchToHttp().getRequest<Express.Request>().user?.id;
});
