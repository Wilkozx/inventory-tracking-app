export async function getSearch(
    target: string = "",
    query: string = "",
    sort_by: string = "",
    page: number = 0,
) {
    let response;
    if (query) {
        response = await fetch("/api/" + target + "/?filter_by=" + query + "&sort_by=" + sort_by + "&limit=20" + "&page=" + page)
    } else {
        response = await fetch("/api/" + target + "/?sort_by=" + sort_by + "&limit=20" + "&page=" + page)
    }

    let data = await response.json()
    return data
}