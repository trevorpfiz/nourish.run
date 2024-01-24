import { desc, schema } from "@nourish/db";

import { createTRPCRouter, protectedProcedure } from "../trpc";

export const foodItemRouter = createTRPCRouter({
  all: protectedProcedure.query(({ ctx }) => {
    return ctx.db.query.foodItem.findMany({
      orderBy: desc(schema.foodItem.id),
    });
  }),
});
