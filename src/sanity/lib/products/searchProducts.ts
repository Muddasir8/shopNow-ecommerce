import { defineQuery } from 'next-sanity'
import { sanityFetch } from '../live';

export const searchProducts = async (searchParam : string) => {
    const PRODUCT_SEARCH_QUERY = defineQuery(`
        *[_type == "product" && name match $searchParam]`);

        try {
            //use sanity to send query and pass the search parameter with a wild card
            const products = await sanityFetch({
                query: PRODUCT_SEARCH_QUERY,
                params:{
                    searchParam:`${searchParam}*`,
                },
            });

            //Return the list of product, or empty array if none are found
            return products.data || [];
        } catch (error) {
            console.error("Error fetching Product by Name:", error);
            return [];
        }
};
