import { pgEnum } from "drizzle-orm/pg-core";

export const projectStatusEnum = pgEnum('projectStatus', ['draft', 'published']);
