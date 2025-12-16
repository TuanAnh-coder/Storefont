import { 
  instantMeiliSearch,
} from "@meilisearch/instant-meilisearch"
export const { searchClient } = instantMeiliSearch(
  process.env.NEXT_PUBLIC_MEILISEARCH_HOST || "",
  process.env.NEXT_PUBLIC_MEILISEARCH_API_KEY || ""
)