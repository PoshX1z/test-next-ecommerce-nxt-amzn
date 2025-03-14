import { ProductInputSchema } from "@/lib/validator";
import { z } from "zod";
//Bring from validator.ts, pack them and export as 'IProductInput' for using in other codes
export type IProductInput = z.infer<typeof ProductInputSchema>;

//Now 'Data' type that we create now can implement in actual data because it's packed everything up
export type Data = {
  products: IProductInput[];
  headerMenus: {
    name: string;
    href: string;
  }[];
  carousels: {
    image: string;
    url: string;
    title: string;
    buttonCaption: string;
    isPublished: boolean;
  }[];
};
