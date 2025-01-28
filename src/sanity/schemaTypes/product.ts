import { defineType } from "sanity"

export const product = defineType({
    name: "product",
    title: "Product",
    type: "document",
    fields: [
        {
            name: "productName",
            title: "Name",
            type: "string",
            validation: (rule) => rule.required(),
        },
        {
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: {
              source: "productName"},
        },
        {
            name:"description",
            type:"text",
            title:"Description",
            validation: (rule) => rule.required(),
        },
        {
            name: "productImage",
            type: "image",
            title: "Product Image",
            options: {hotspot: true,},
            validation: (rule) => rule.required(),
        },
        {
            name: "price",
            type: "number",
            title: "Price",
            validation: (rule) => rule.required().min(0),
        },
        {
            name: "categories",
            title: "Category",
            type: "array",
            of: [{type: "reference", to: {type: "category"}}],
        },
        {
            name: 'stock',
            title: 'Stock Status',
            type: 'string',
        },
        {
            name:"isNew",
            type:"boolean",
            title:"New Badge",
        },
    ],
});