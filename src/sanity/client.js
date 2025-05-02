import createClient from "@sanity/client"

export const client = createClient({
    projectId: "phh1hdr7",
    dataset: "production",
    apiVersion: "v2025-05-02",
    useCdn: false,
})