export default class ApiClient {

    get(url: string): Promise<any> {
        return this.handleFetch(fetch(url), true);
    }

    post<T>(url: string, model: T): Promise<any> {
        return this.handleFetch(
            fetch(
                url,
                {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(model)
                }),
            true
        );
    }

    put<T>(url: string, id: (number | string), model: T): Promise<any> {
        return this.handleFetch(
            fetch(
                `${url}/${id}`,
                {
                    method: 'PUT',
                    headers: {
                        'Accept': 'application/json',
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(model)
                }),
            true
        );
    }

    delete(url: string, id: (number | string)): Promise<any> {
        return this.handleFetch(
            fetch(
                `${url}/${id}`,
                {
                    method: 'DELETE',
                    headers: {
                        'Accept': 'application/json',
                        "Content-Type": "application/json"
                    },
                }),
            false
        );
    }

    private handleFetch(response: Promise<Response>, jsonResponse: boolean): Promise<any> {
        return response
            .then((response: Response) => {
                if (!response.ok) {
                    const errorMsg = 'Looks like there was a problem. Status Code: ' + response.status;
                    console.log(errorMsg);

                    throw new Error(errorMsg);
                }
                return response;
            })
            .then(resp => jsonResponse ? resp.json() : resp)
            .catch((err) => {
                console.log('Fetch Error :-S', err);
                throw err;
            });
    }
}