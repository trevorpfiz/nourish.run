import { desc, schema } from "@nourish/db";

import { createTRPCRouter, protectedProcedure } from "../trpc";

export const nutrientRouter = createTRPCRouter({
  all: protectedProcedure.query(({ ctx }) => {
    return ctx.db.query.nutrient.findMany({
      orderBy: desc(schema.nutrient.id),
    });
  }),
});
