import mongoose, { Schema } from "mongoose";

export type PageStatus = "Published" | "Draft";

export interface PageDoc {
  _id: mongoose.Types.ObjectId;
  slug: string;
  title: string;
  route: string;
  status: PageStatus;
  createdAt: Date;
  updatedAt: Date;
}

const pageSchema = new Schema<PageDoc>(
  {
    slug: { type: String, required: true, unique: true, trim: true },
    title: { type: String, required: true, trim: true },
    route: { type: String, required: true, trim: true },
    status: { type: String, enum: ["Published", "Draft"], required: true },
  },
  { timestamps: true },
);

pageSchema.index({ slug: 1 }, { unique: true });
pageSchema.index({ route: 1 }, { unique: true });

export const Page = mongoose.model<PageDoc>("Page", pageSchema);
