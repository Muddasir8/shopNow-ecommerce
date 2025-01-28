import { defineQuery } from "next-sanity";
import { sanityFetch } from "../live";

export const getBanner = async () => {
  const BANNER_QUERY = defineQuery(`
        *[_type == "banner"]
`);

try {
    const banners = await sanityFetch({
        query: BANNER_QUERY,
    });
    return banners.data || [];
} catch (error) {
    console.log("ERROR fetching data", error)
    return[];
}
};
