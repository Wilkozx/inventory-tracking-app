const baseUrl = process.env.REACT_APP_API_URL

export async function getSearch(
    target: string = "",
    query: string = "",
    sort_by: string = "",
    page: number = 0,
    limit: number = 20,
) {
    let response;
    if (query) {
        response = await fetch(baseUrl + target + "/?filter_by=" + query + "&sort_by=" + sort_by + "&limit=" + limit + "&page=" + page)
    } else {
        response = await fetch(baseUrl + target + "/?sort_by=" + sort_by + "&limit=" + limit + "&page=" + page)
    }

    let data = await response.json()
    return data
}

export async function getFromID(
    target: string = "",
    id: number,
) {
    let response;
    response = await fetch(baseUrl + target + "/" + id)
    let data = await response.json()
    return data
}

export async function postRequest(
    target: string = "",
    payload: FormData
) {
    let response;
    response = await fetch(baseUrl + target + "", {
        method: "POST",
        body: payload
    });
}