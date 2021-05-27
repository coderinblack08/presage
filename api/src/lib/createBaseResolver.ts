import { Arg, Query, Resolver } from "type-graphql";
import { BaseEntity } from "typeorm";

export const createBaseResolver = (
  suffix: string,
  entity: typeof BaseEntity
) => {
  @Resolver({ isAbstract: true })
  abstract class BaseResolver {
    @Query(() => entity, { name: `get${suffix}` })
    get(@Arg("id") id: string) {
      return entity.findOne(id);
    }
    @Query(() => [entity], {
      name: `paginate${suffix}s`,
      complexity: ({ args }) => args.limit,
    })
    paginate(@Arg("limit") limit: number, @Arg("offset") offset: number) {}
  }
  return BaseResolver;
};
