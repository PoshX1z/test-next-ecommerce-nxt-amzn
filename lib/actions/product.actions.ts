//How product actions ex.find product from database, find product for card, etc.
"use server";

import { connectToDatabase } from "@/lib/db";
import Product from "@/lib/db/models/product.model";

//Get all categories from product database
export async function getAllCategories() {
  await connectToDatabase();
  const categories = await Product.find({ isPublished: true }).distinct(
    "category"
  );
  return categories;
}
//Get 4 products for card and find from its tags.
export async function getProductsForCard({
  tag,
  limit = 4,
}: {
  tag: string;
  limit?: number;
}) {
  await connectToDatabase();
  const products = await Product.find(
    { tags: { $in: [tag] }, isPublished: true },
    {
      name: 1,
      href: { $concat: ["/product/", "$slug"] },
      image: { $arrayElemAt: ["$images", 0] },
    }
  )
    .sort({ createdAt: "desc" })
    .limit(limit);
  return JSON.parse(JSON.stringify(products)) as {
    name: string;
    href: string;
    image: string;
  }[];
}
