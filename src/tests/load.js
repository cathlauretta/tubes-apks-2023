// untuk badan tes yang akan diterapkan nantinya
import {mainTest} from './main.js'

module.exports.options = {
    stages: [
        { duration: '5m', target: 250 }, // selama 5 menit, pengguna akan meningkat dari 0 sampai 250
        { duration: '20m', target: 250 }, // selama 20 menit, pengguna dipertahankan stagnan sebesar 250 pengguna
        { duration: '5m', target: 0 }, // 5 menit berikutnya, pengguna akan diturunkan menjadi 0
    ],
};

module.exports.default = () => {
    // localhost yang digunakan oleh docker
    const baseUrl = 'http://localhost:5001'
    mainTest(baseUrl) // pemanggilan fungsi untuk diuji
}