import axios from "axios";

const URL = "http://ratingcard.sundryhrms.website/api/";

export default {
    name: "Request",

    makeRequest: function (type, request) {
        var type = type;

        if (request !== undefined) {
            var request_urls = {
                stores: "allsundrystores",
                store: "createstore",
                delete: "deleteStore",
                update: "updatestore"
            };

            switch (type) {
                case "GET":
                    if (request.id !== undefined) {
                        var request_url =
                            URL + request_urls[request.what] + "/" + request.id;
                    }
                    else if (request.code !== undefined) {
                        var request_url =
                            URL + request_urls[request.what] + "?store_code=" + request.code;
                    }
                    else {
                        var request_url = URL + request_urls[request.what];
                    }

                    console.log(
                        "%cSending GET request to: " + request_url,
                        "background: #000;color: #00ff00;"
                    );

                    return new Promise((resolve, reject) => {
                        axios
                            .get(request_url)
                            .then(res => {
                                if (
                                    res.data.status == true ||
                                    res.data.status == "true" ||
                                    res.data.status == "True"
                                ) {
                                    var response = {
                                        type: request.what,
                                        data: res.data,
                                        url: request_url
                                    };

                                    resolve(response);
                                } else {
                                    reject(res);
                                }
                            })
                            .catch(err => {
                                console.log(err);
                                reject(err);
                            });
                    });
                    break;

                case "POST":
                    if (request.id !== undefined) {
                        var request_url =
                            URL + request_urls[request.what] + "/" + request.id;
                    } else {
                        var request_url = URL + request_urls[request.what];
                    }

                    console.log(
                        "%cSending POST request to: " + request_url,
                        "background: #000;color: #00ff00;"
                    );

                    return new Promise((resolve, reject) => {
                        axios
                            .post(request_url, request.data)
                            .then(res => {
                                if (
                                    res.data.status == true ||
                                    res.data.status == "true" ||
                                    res.data.status == "True"
                                ) {
                                    var response = {
                                        type: request.what,
                                        data: res.data,
                                        url: request_url
                                    };
                                    resolve(response);
                                } else {
                                    reject(res);
                                }
                            })
                            .catch(err => {
                                console.log(err);
                                reject(err);
                            });
                    });
                    break;


                case "PUT":

                    var request_url =
                        URL + request_urls[request.what] + "?store_id=" + request.id;


                    console.log(
                        "%cSending UPDATE request to: " + request_url,
                        "background: #000;color: #00ff00;"
                    );

                    return new Promise((resolve, reject) => {
                        axios
                            .put(request_url, request.data)
                            .then(res => {
                                if (
                                    res.data.status == true ||
                                    res.data.status == "true" ||
                                    res.data.status == "True"
                                ) {
                                    var response = {
                                        type: request.what,
                                        data: res.data,
                                        url: request_url
                                    };
                                    resolve(response);
                                } else {
                                    reject(res);
                                }
                            })
                            .catch(err => {
                                console.log(err);
                                reject(err);
                            });
                    });
                    break;

                case "DELETE":
                    if (request.data !== undefined) {
                        var request_url =
                            URL + request_urls[request.what] + "?store_id=" + request.data;
                    }

                    else {
                        var request_url = URL + request_urls[request.what];
                    }
                    console.log(request_url)
                    console.log(
                        "%cSending DELETE request to: " + request_url,
                        "background: #000;color: #00ff00;"
                    );

                    return new Promise((resolve, reject) => {
                        axios
                            .delete(request_url)
                            .then(res => {
                                if (
                                    res.data.status == true ||
                                    res.data.status == "true" ||
                                    res.data.status == "True"
                                ) {
                                    var response = {
                                        type: request.what,
                                        data: res.data,
                                        url: request_url
                                    };
                                    resolve(response);
                                } else {
                                    reject(res);
                                }
                            })
                            .catch(err => {
                                console.log(err);
                                reject(err);
                            });
                    });
                    break;
            }
        }
    }
};
