import http from 'k6/http';
import { check, fail } from 'k6';

export function mainTest(baseUrl) {
    
    let res;

    const credentials = {
        username: __ENV.SUPERADMIN || "",
        password: __ENV.SUPERPASS || "",
    }

    // Login
    res = http.post(
        `${baseUrl}/users/login/`,
        JSON.stringify(
            credentials
        ),
        {
            headers: {
                'Content-Type': 'application/json'
            }
        }
    );

    const token = res.json().token

    // Get all cinemas
    res = http.get(`${baseUrl}/cinemas`);
    
    check(res, {
        'Status is OK' : (r) => r.status === 200,
        'Response is an array' : (r) => Array.isArray(res.json())
    })

    // Get all showtimes
    res = http.get(`${baseUrl}/showtimes`);
    
    check(res, {
        'Status is OK' : (r) => r.status === 200,
        'Response is an array' : (r) => Array.isArray(res.json())
    })

    // Get all reservations
    res = http.get(
        `${baseUrl}/reservations`,
        {
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + token,
            }
        }
    );

    check(res, {
        'Status is OK' : (r) => r.status === 200,
        'Response is an array' : (r) => Array.isArray(res.json())
    })

    // Add new reservation
    const reservation = {
        date: "2024/10/21",
        startAt: "Jakarta",
        seats: ["C"],
        ticketPrice: 40000,
        total: 2,
        movieId: "65658dc08d2090ce8d8dcd6f",
        cinemaId: "65658d488d209032e18dcd66",
        username: "kuntiBogel",
        phone: "08123456789"
}

    res = http.post(
        `${baseUrl}/reservations`,
        JSON.stringify(
            reservation
        ),
        {
            headers: {
                'Content-Type': 'application/json',
                Authorization: "Bearer " + token
            }
        }
    );

    check(res, {
        'Status is Created' : (r) => r.status === 201,
        'Response is an object' : (r) => typeof(res.json()) === "object"
    })

};