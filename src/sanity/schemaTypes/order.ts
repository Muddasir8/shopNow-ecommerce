import {defineType} from 'sanity'
import { BasketIcon } from '@sanity/icons'

export const order = defineType({
  name: 'order',
  title: 'Order',
  type: 'document',
  icon: BasketIcon,
  fields: [
    {
      name: 'orderNumber',
      title: 'Oustomer Number',
      type: 'string',
      validation: (Rule) => Rule.required(),
      description: 'Name of the customer placing the order',
    },
    {
      name: 'stripeCheckoutSessionId',
      title: 'Stripe Checkout Session Id',
      type: 'string',
    },
    {
      name: 'stripeCustomerId',
      title: 'Stripe Customer ID',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'clerkUserId',
      title: 'Clerk User Id',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'customerName',
      title: 'Customer Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'email',
      title: 'Customer Email',
      type: 'string',
      validation: (Rule) => Rule.required().email(),
    },
    {
      name: 'stripePaymentIntentId',
      title: 'Stripe Payment Intent Id',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'products',
      title: 'Products',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'product',
              title: 'Product Bought',
              type: 'reference',
              to: [{type: 'product'}], // Reference to the product schema
            },
            {
              name: 'quantity',
              title: 'Quantity Purchased',
              type: 'number',
              validation: (Rule) => Rule.min(1),
            },
          ],
          preview: {
            select:{
              production: "product Name",
              quantity: "quantity",
              image: "product.image",
              price:"product.price",
              currency: "product.currency"
            },
            prepare(select){
              return {
                title:`${select.product} x ${select.quantity}`,
                subtitle:`${select.price * select.quantity}`,
                media: select.image,
              };
            },
          },
        },
      ],
    },
    {
      name: 'totalPrice',
      title: 'Total Price',
      type: 'number',
      validation: (Rule) => Rule.required().min(0),
      description: 'Total price for the order',
    },
    {
      name: 'currency',
      title: 'Currency',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'amountDiscount',
      title: 'Amount Discount',
      type: 'number',
      validation: (Rule) => Rule.min(0),
    },
    {
      name: 'status',
      title: 'Order Status',
      type: 'string',
      options: {
        list: [
          {title: 'Pending', value: 'pending'},
          {title: 'Paid', value: 'paid'},
          {title: 'Shipped', value: 'shipped'},
          {title: 'Delivered', value: 'delivered'},
          {title: 'Cancelled', value: 'cancelled'},
        ],
        layout: 'radio', // Display options as radio buttons
      },
      initialValue: 'pending',
    },
    {
      name: 'orderDate',
      title: 'Order Date',
      type: 'datetime',
      description: 'Date and time the order was placed',
      validation: (Rule) => Rule.required(),
      initialValue: () => new Date().toISOString(), // Auto-set the current date
    },
  ],
  preview:{
    select:{
      name: "customerName",
      amount: "totalPrice",
      currency: "currency",
      orderId: "orderNumber",
      email: "email",
    },
    prepare(select){
      const orderIdSnippet = `${select.orderId.slice(0, 5)}...${select.orderId.slice(-5)}`;
      return {
        title: `${select.name}(${orderIdSnippet})`,
        subtitle: `${select.amount} ${select.currency}, ${select.email}`,
        media: BasketIcon,
      };
    },
  },
});
