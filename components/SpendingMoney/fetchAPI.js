
function callApiGetPagination(activePage) {
    // const { page, search, limit } = activePage
    return new Promise((resolve, reject) => {
        const url = `https://5ff2c99828c3980017b189ba.mockapi.io/localhost3001/item/dien-nuoc`
        fetch(url, {
            method: 'GET'
        })
            .then((response) => response.json())
            .then((res) => {
                resolve(res)
                console.log(res, "data okeeeeeeeeeeeeee");
            })
            .catch((error) => {
                reject(error)
            })
    })
}

function addAPIPagination(data) {
    console.log(data, "dataa");
    return new Promise((resolve, reject) => {
        const url = `https://5ff2c99828c3980017b189ba.mockapi.io/localhost3001/item/dien-nuoc`;
        fetch(url, {
            method: 'POST',
            headers: { "Content-type": "application/json" },
            body: JSON.stringify(data)
        })
            .then((response) => {
                response.json()
            })
            .then((res) => {
                resolve(res);
            })
            .catch((error) => {
                reject(error);
            });
    })
}
function updateAPI(player) {
    return new Promise((resolve, reject) => {
        const url = 'https://5ff2c99828c3980017b189ba.mockapi.io/localhost3001/item/dien-nuoc/' + player.id;
        fetch(url, {
            method: 'PUT',
            headers: { "Content-type": "application/json" },
            body: JSON.stringify(player)
        })
            .then((response) => response.json())
            .then((res) => {
                resolve(res);
            })
            .catch((error) => {
                reject(error);
            });
    })
}
export {
    callApiGetPagination,
    addAPIPagination,
    updateAPI
}