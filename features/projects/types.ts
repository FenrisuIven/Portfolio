import type { InferSelectModel, InferInsertModel } from "drizzle-orm";
import { programmingProjectsTable } from "@/db/schema";

export type Project = InferSelectModel<typeof programmingProjectsTable>;
export type NewProject = InferInsertModel<typeof programmingProjectsTable>;
