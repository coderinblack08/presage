import { Arg, Query, Resolver } from "type-graphql";
import { BaseEntity, FindOneOptions } from "typeorm";

export const createBaseResolver = (
  suffix: string,
  entity: typeof BaseEntity,
  props: FindOneOptions<BaseEntity> = {}
) => {
  @Resolver({ isAbstract: true })
  abstract class BaseResolver {
    @Query(() => entity, { name: `get${suffix}` })
    get(@Arg("id") id: string) {
      return entity.findOne(id, props);
    }
    @Query(() => [entity], {
      name: `paginate${suffix}s`,
      complexity: ({ args }) => args.limit,
    })
    paginate(
      @Arg("limit") limit: number,
      @Arg("offset", { defaultValue: 0 }) offset: number
    ) {
      return entity.find({ skip: offset, take: limit, ...props });
    }
  }
  return BaseResolver;
};
