// Spike.js

// Untuk badan tes yang akan diterapkan nantinya
import {mainTest} from './main.js'

module.exports.options = {
    stages: [
        { duration: '2m', target: 5000 }, // selama 2 menit, pengguna akan meningkat dari 0 ke 5000 pengguna
        { duration: '1m', target: 0 }, // 1 menit kemudian, pengguna akan menurun hingga mencapai 0 nantinya
    ],
};

module.exports.default = () => {
    // pemanggilan localhost untuk eksekusi fungsi
    const baseUrl = 'http://localhost:5001'
    mainTest(baseUrl)
}
