import { defineType, defineField} from "sanity";

export const bannerType = defineType({
  name: "banner",
  title: "Banner",
  type: "document",
  fields: [
    defineField({
        name: 'image',
        title: 'Image',
        type: 'image',
        options:{
            hotspot: true,
        }
      }),
    defineField({
      name: "button",
      title: "Button",
      type: "string",
    }),
    defineField({
      name: "product",
      title: "Product",
      type: "string",
    }),
    defineField({
      name: "decs",
      title: "Decs",
      type: "string",
    }),
    defineField({
      name: "heading",
      title: "Heading",
      type: "string",
    }),
  ],
});
