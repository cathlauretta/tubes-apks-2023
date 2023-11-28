import http from "k6/http";
import { check } from "k6";
// const http = require("k6/http");
// const path = require("path");

// 5 kali looping selama 20 detik
module.exports.options = {
  stages: [
    {
      target: 5, duration: '20s'
    },
    {
      target: 0, duration: '10s'
    },
  ]
};


module.exports.default = function () {
  // const port = process.env.APP_PORT || 5000;
  const port = 5001;
  const baseUrl = `http://localhost:${port}`;

  let res;

  // pemakaian kredensial gadungan
  const CREDENTIALS_DUMMY1 = {
    username: "pege",
    password: "pw123456",
  };

  let token;

  // sinema acak
  const CINEMA_DUMMY1 = {
    name: "PGMOL",
    ticketPrice: 51000,
    city: "Bandung",
    seats: ["A", "B", "C", "D"],
    seatsAvailable: 4,
  };

  const CINEMA_DUMMY2 = {
    name: "CGVA",
    ticketPrice: 30500,
    city: "Jakarta",
    seats: ["A", "B"],
    seatsAvailable: 2,
  };

  let cinemaId = "";

  const CINEMA_PHOTO_DUMMY_PATH1 = "https://www.google.com";

  // film acak
  const MOVIE_DUMMY1 = {
    title: "Moncunduit 1",
    image: "https://drive.google.com/uc?id=1Z_rehuaguhawgu9821iApawaw",
    language: "french",
    genre: "fantasy, comedy",
    director: "baryetdil",
    cast: "baryetdil",
    description:
      "A lonely man on search of happiness",
    duration: 122,
    releaseDate: "2021/08/14",
    endDate: "2021/09/14",
  };

  const MOVIE_DUMMY2 = {
    title: "Moncunduit 1",
    image: "https://drive.google.com/uc?id=taniawqf_125129512591af",
    language: "french",
    genre: "fantasy, comedy",
    director: "baryetdil",
    cast: "baryetdil",
    description:
      "After happiness, what shall be seeketh?",
    duration: 91,
    releaseDate: "2022/10/12",
    endDate: "2025/10/26",
  };

  const MOVIE_PHOTO_DUMMY_PATH1 = "https://www.google.com";

  let movieId = "";

  // waktu penunjukan acak
  const SHOWTIME_DUMMY1 = {
    startAt: "bandung",
    startDate: "2019-10-25T00:00:00.000Z",
    endDate: "2019-10-26T00:02:00.000Z",
    movieId: "650d3fa4dd4dc152125a7f6c",
    cinemaId: "650e53ee2712512afafaf001",
  };

  const SHOWTIME_DUMMY2 = {
    startAt: "jakarta",
    startDate: "2022-04-20T00:00:00.000Z",
    endDate: "2022-04-25T00:02:00.000Z",
    movieId: "650d124124afc724ef947f6c",
    cinemaId: "6614363ee27d92c7c0c511001",
  };

  let showtimeId = "";

  // waktu reservasi acak
  const RESERVATION_DUMMY1 = {
    date: "2019/10/25",
    startAt: "bandung",
    seats: ["A"],
    ticketPrice: 49000,
    total: 1,
    movieId: "650d3fa4dd4dc152125a7f6c",
    cinemaId: "650e53ee2712512afafaf001",
    username: "wisnuas",
    phone: "08123456789",
    checkin: false,
  };

  const RESERVATION_DUMMY2 = {
    date: "2022/04/20",
    startAt: "jakarta",
    seats: ["A"],
    ticketPrice: 51000,
    total: 1,
    username: "wisnuas",
    phone: "08123456789",
    checkin: false,
  };

  let reservationId = "";

  // Users
  const userSmoke = () => {
    // Login
    const login = () => {
      res = http.post(
        `${baseUrl}/users/login`,
        JSON.stringify(CREDENTIALS_DUMMY1),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (
        check(res, {
          "Login status is OK": (r) => r.status === 200,
          // "Response is an object": (r) => typeof res.json() === "object",
        })
      )
        token = res.json().token;
    };

    const run = () => {
      login();
    };

    return { run };
  };

  // Cinemas
  const cinemaSmoke = () => {
    // Add new cinema
    const create = (data = CINEMA_DUMMY1) => {
      res = http.post(`${baseUrl}/cinemas`, JSON.stringify(data), {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      });

      if (
        check(res, {
          "Create cinema is Created": (r) => r.status === 201,
          // "Response is an object": (r) => typeof res.json() === "object",
        })
      ) {
        cinemaId = res.json()._id;
      }
    };

    // Get all cinemas
    const getAll = () => {
      res = http.get(`${baseUrl}/cinemas`);

      check(res, {
        "Get all cinemas is OK": (r) => r.status === 200,
        // "Response is an array": (r) => Array.isArray(res.json()),
      });
    };

    // Get cinema by id
    const getOne = (id = cinemaId) => {
      res = http.get(`${baseUrl}/cinemas/${id}`);

      check(res, {
        "Get one cinema is OK": (r) => r.status === 200,
        // "Response is an object": (r) => typeof res.json() === "object",
      });
    };

    // Update cinema by id
    const update = (data = CINEMA_DUMMY2, id = cinemaId) => {
      res = http.patch(`${baseUrl}/cinemas/${id}`, JSON.stringify(data), {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      });

      check(res, {
        "Update cinema is OK": (r) => r.status === 200,
        // "Response is an object": (r) => typeof res.json() === "object",
      });
    };

    // Upload cinema photo
    const uploadPhoto = (path = CINEMA_PHOTO_DUMMY_PATH1) => {
      res = http.post(
        `${baseUrl}/cinemas/photo/${cinemaId}`,
        {
          files: {
            file: path,
          },
        },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );

      check(res, {
        "Upload cinema photo is OK": (r) => r.status === 200,
        // "Response is an object": (r) => typeof res.json() === "object",
      });
    };

    // Delete cinema by id
    const deleteOne = (id = cinemaId) => {
      res = http.del(`${baseUrl}/cinemas/${id}`, null, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      });

      check(res, {
        "Delete cinema is OK": (r) => r.status === 200,
        // "Response is an object": (r) => typeof res.json() === "object",
      });
    };

    const run = () => {
      create();
      getAll();
      getOne();
      update();
      // uploadPhoto();
      deleteOne();
    };

    return { run };
  };

  // Movies
  const movieSmoke = () => {
    // Add new movie
    const create = (data = MOVIE_DUMMY1) => {
      res = http.post(`${baseUrl}/movies`, JSON.stringify(data), {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      });

      if (
        check(res, {
          "Create movie is Created": (r) => r.status === 201,
          // "Response is an object": (r) => typeof res.json() === "object",
        })
      ) {
        movieId = res.json()._id;
      }
    };

    // Get all movies
    const getAll = () => {
      res = http.get(`${baseUrl}/movies`);

      check(res, {
        "Get all movies is OK": (r) => r.status === 200,
        // "Response is an array": (r) => Array.isArray(res.json()),
      });
    };

    // Get movie by id
    const getOne = (id = movieId) => {
      res = http.get(`${baseUrl}/movies/${id}`);

      check(res, {
        "Get one movie is OK": (r) => r.status === 200,
        // "Response is an object": (r) => typeof res.json() === "object",
      });
    };

    // Update movie by id
    const update = (data = MOVIE_DUMMY2, id = movieId) => {
      res = http.put(`${baseUrl}/movies/${id}`, JSON.stringify(data), {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      });

      check(res, {
        "Update movie is OK": (r) => r.status === 200,
        // "Response is an object": (r) => typeof res.json() === "object",
      });
    };

    // Upload movie photo
    const uploadPhoto = (id = movieId, path = MOVIE_PHOTO_DUMMY_PATH1) => {
      res = http.post(
        `${baseUrl}/movies/photo/${id}`,
        {
          files: {
            file: path,
          },
        },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );

      check(res, {
        "Upload movie photo is OK": (r) => r.status === 200,
        // "Response is an object": (r) => typeof res.json() === "object",
      });
    };

    // Delete movie by id
    const deleteOne = (id = movieId) => {
      res = http.del(`${baseUrl}/movies/${id}`, null, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });

      check(res, {
        "Delete movie is OK": (r) => r.status === 200,
        // "Response is an object": (r) => typeof res.json() === "object",
      });
    };

    const run = () => {
      create();
      getAll();
      getOne();
      update();
      // uploadPhoto();
      deleteOne();
    };

    return { run };
  };

  // showtimes
  const showtimeSmoke = () => {
    // Add new showtime
    const create = (data = SHOWTIME_DUMMY1) => {
      res = http.post(`${baseUrl}/showtimes`, JSON.stringify(data), {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      });

      if (
        check(res, {
          "Create showtime is Created": (r) => r.status === 201,
          // "Response is an object": (r) => typeof res.json() === "object",
        })
      ) {
        showtimeId = res.json()._id;
      }
    };

    // Get all showtimes
    const getAll = () => {
      res = http.get(`${baseUrl}/showtimes`);

      check(res, {
        "Get all showtime is OK": (r) => r.status === 200,
        // "Response is an array": (r) => Array.isArray(res.json()),
      });
    };

    // Get showtime by id
    const getOne = (id = showtimeId) => {
      res = http.get(`${baseUrl}/showtimes/${id}`);

      check(res, {
        "Get one showtime is OK": (r) => r.status === 200,
        // "Response is an object": (r) => typeof res.json() === "object",
      });
    };

    // Update showtime by id
    const update = (data = SHOWTIME_DUMMY2, id = showtimeId) => {
      res = http.patch(`${baseUrl}/showtimes/${id}`, JSON.stringify(data), {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      });

      check(res, {
        "Update showtime is OK": (r) => r.status === 200,
        // "Response is an object": (r) => typeof res.json() === "object",
      });
    };

    // Delete showtime by id
    const deleteOne = (id = showtimeId) => {
      res = http.del(`${baseUrl}/showtimes/${id}`, null, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });

      check(res, {
        "Delete showtime is OK": (r) => r.status === 200,
        // "Response is an object": (r) => typeof res.json() === "object",
      });
    };

    const run = () => {
      create();
      getAll();
      getOne();
      update();
      deleteOne();
    };

    return { run };
  };

  // reservations
  const reservationSmoke = () => {
    // Add new reservation
    const create = (data = RESERVATION_DUMMY1) => {
      res = http.post(`${baseUrl}/reservations`, JSON.stringify(data), {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      });

      if (
        check(res, {
          "Create reservation is Created": (r) => r.status === 201,
          // "Response is an object": (r) => typeof res.json() === "object",
        })
      ) {
        reservationId = res.json().reservation._id;
      }
    };

    // Get all reservations
    const getAll = () => {
      res = http.get(`${baseUrl}/reservations`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      });

      check(res, {
        "Get all reservation is OK": (r) => r.status === 200,
        "Response is an array": (r) => Array.isArray(res.json()),
      });
    };

    // Get reservation by id
    const getOne = (id = reservationId) => {
      res = http.get(`${baseUrl}/reservations/${id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      });

      check(res, {
        "Get one reservation is OK": (r) => r.status === 200,
        // "Response is an object": (r) => typeof res.json() === "object",
      });

    };

    // Update reservation by id
    const update = (data = RESERVATION_DUMMY2, id = reservationId) => {
      res = http.patch(`${baseUrl}/reservations/${id}`, JSON.stringify(data), {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      });

      check(res, {
        "Update reservation is OK": (r) => r.status === 200,
        // "Response is an object": (r) => typeof res.json() === "object",
      });
    };

    // Delete reservation by id
    const deleteOne = (id = reservationId) => {
      res = http.del(`${baseUrl}/reservations/${id}`, null, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });

      check(res, {
        "Delete reservation is OK": (r) => r.status === 200,
        // "Response is an object": (r) => typeof res.json() === "object",
      });
    };

    const run = () => {
      create();
      getAll();
      getOne();
      update();
      deleteOne();
    };

    return { run };
  };

  // menjalankan fungsi smoke
  const run = () => {
    userSmoke().run();
    cinemaSmoke().run();
    movieSmoke().run();
    showtimeSmoke().run();
    reservationSmoke().run();
  };

  run();
};