
// function callApiGetPagination(activePage) {
//     // const { page, search, limit } = activePage
//     return new Promise((resolve, reject) => {
//         const url = `https://6050183ac20143001744e15e.mockapi.io/money`
//         fetch(url, {
//             method: 'GET'
//         })
//             .then((response) => response.json())
//             .then((res) => {
//                 resolve(res)
//                 console.log(res, "data okeeeeeeeeeeeeee");
//             })
//             .catch((error) => {
//                 reject(error)
//             })
//     })
// }

// function addAPIPagination(data) {
//     return new Promise((resolve, reject) => {
//         const url = `https://6050183ac20143001744e15e.mockapi.io/money`;
//         fetch(url, {
//             method: 'POST',
//             headers: { "Content-type": "application/json" },
//             body: JSON.stringify(data)
//         })
//             .then((response) => {
//                 response.json()
//             })
//             .then((res) => {
//                 resolve(res);
//             })
//             .catch((error) => {
//                 reject(error);
//             });
//     })
// }
// function updateAPI(player) {
//     return new Promise((resolve, reject) => {
//         const url = 'https://6050183ac20143001744e15e.mockapi.io/money/' + player.id;
//         fetch(url, {
//             method: 'PUT',
//             headers: { "Content-type": "application/json" },
//             body: JSON.stringify(player)
//         })
//             .then((response) => response.json())
//             .then((res) => {
//                 resolve(res);
//             })
//             .catch((error) => {
//                 reject(error);
//             });
//     })
// }
// export {
//     callApiGetPagination,
//     addAPIPagination,
//     updateAPI
// }