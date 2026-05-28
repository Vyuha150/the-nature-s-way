import mongoose, { Schema } from "mongoose";

export interface SectionDoc {
  _id: mongoose.Types.ObjectId;
  pageSlug: string;
  pageTitle: string;
  key: string;
  heading: string;
  body: string;
  createdAt: Date;
  updatedAt: Date;
}

const sectionSchema = new Schema<SectionDoc>(
  {
    pageSlug: { type: String, required: true, trim: true },
    pageTitle: { type: String, required: true, trim: true },
    key: { type: String, required: true, trim: true },
    heading: { type: String, required: true, trim: true },
    body: { type: String, required: true },
  },
  { timestamps: true },
);

sectionSchema.index({ pageSlug: 1, key: 1 }, { unique: true });

export const Section = mongoose.model<SectionDoc>("Section", sectionSchema);
