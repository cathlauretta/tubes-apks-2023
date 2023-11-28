// Stress.js

// untuk badan tes yang akan diterapkan nantinya
import {mainTest} from './main.js'

module.exports.options = {
    stages: [
        { duration: '5m', target: 2000 }, // selama 5 menit, pengguna akan meningkat drastis dari 0 ke 2000
        { duration: '30m', target: 2000 }, // 2000 pengguna dipertahankan selama 30 menit
        { duration: '5m', target: 0 }, // 5 menit terakhir, pengguna akan terus berkurang menjadi 0
    ],
};

module.exports.default = () => {
    // pemanggilan localhost untuk penjalanan fungsi
    const baseUrl = 'http://localhost:5001'
    mainTest(baseUrl)
}
