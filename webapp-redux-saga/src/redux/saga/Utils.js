import axios from "axios";

const sendRequest = (data) =>{
    let contacts_url = "http://localhost:3006/contacts"
    let products_url = "http://localhost:3006/products"
            switch (data.method) {
                case "GET":
                    switch (data.tcd) {
                        case "GET_CONTACTS":
                            return axios.get(contacts_url).then(response => response)
                                .catch(err => {
                                    return {
                                        status: "Error",
                                        request: data,
                                        error: err
                                    }
                                })
                        case "GET_PRODUCTS":
                            return axios.get(products_url).then(response => response)
                                .catch(err => {
                                    return {
                                        status: "Error",
                                        request: data,
                                        error: err
                                    }
                                });
                        case "GET_PRODUCT_BY_ID":
                            const prod_id = data.tmg.id;
                            return axios.get(products_url + `/${prod_id}`).then(response => response)
                                .catch(err => {
                                    return {
                                        status: "Error",
                                        request: data,
                                        error: err
                                    }
                                });
                        case "GET_CONTACT_BY_ID":
                            const cont_id = JSON.parse(data.tmg);
                            console.log(cont_id.id)
                            return axios.get(contacts_url+ `/${cont_id.id}`).then(response => response)
                                .catch(err => {
                                    return {
                                        status: "Error",
                                        request: data,
                                        error: err
                                    }
                                });
                    }
                case "POST":
                    switch (data.tcd) {
                        case "ADD_CONTACT":
                            console.log(data.tmg)
                            return axios.post(contacts_url, data.tmg).then(response => response)
                                .catch(err => {
                                    return {
                                        status: "Error",
                                        request: data,
                                        error: err
                                    }
                                });

                    }
                case "PUT":
                    switch (data.tcd) {
                        case "UPDATE_CONTACT":
                            const cont_id = data.tmg.id;
                            return axios.put(contacts_url + `/${cont_id}`, data.tmg).then(response => response)
                                .catch(err => {
                                    return {
                                        status: "Error",
                                        request: data,
                                        error: err
                                    }
                                });

                    }
                case "DELETE":
                    switch (data.tcd) {
                        case "DELETE_CONTACT":
                            const cont_id = data.tmg.id;
                            return axios.delete(contacts_url + `/${cont_id}`).then(response => response)
                                .catch(err => {
                                    return {
                                        status: "Error",
                                        request: data,
                                        error: err
                                    }
                                });

                    }
            }
}

export {sendRequest}