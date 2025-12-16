import { instantMeiliSearch } from "@meilisearch/instant-meilisearch"

export function getSearchClient() {
  const host = process.env.NEXT_PUBLIC_MEILISEARCH_HOST
  const apiKey = process.env.NEXT_PUBLIC_MEILISEARCH_API_KEY

  if (!host || !apiKey) {
    return null
  }

  return instantMeiliSearch(host, apiKey).searchClient
}
