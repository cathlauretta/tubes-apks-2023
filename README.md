# Pengujian Perangkat Lunak pada Domain Ticketing dan Reservation
## Tugas Besar II4032 Analisis dan Perancangan Kinerja Sistem
## Semester Ganjil Tahun 2023/2024

## Table of Contents
- [Requirements](#requirements)
- [How to Run The Program](#how-to-run-the-program)
- [Author](#authors)

## Requirements
1. [Docker](https://docs.docker.com/get-docker/)
2. [Node JS](https://nodejs.org/en/download/current)
3. Semangat Pengerjaan Tugas (sangat langka di tengah pertemanan antara mahasiswa dan tugas-tugas besar)

## How to Run The Program
1. Clone repository ini
```sh
git clone https://github.com/cathlauretta/tubes-apks-2023.git
```

2. Ubah directory ke repository yang baru saja di-clone
```sh
cd tubes-apks-2023
```

3. Pada terminal lokal, jalankan perintah berikut untuk menciptakan network yang akan dipakai untuk setup Prometheus dan Grafana
```sh
docker network create prometheus_grafana
```

4. Jalankan perintah berikut (opsional) untuk menarik image dalam container Prometheus
```sh
docker pull prom/prometheus:latest
```

5. Jalankan perintah berikut (wajib) untuk menarik image dalam container Grafana
```sh
docker pull grafana/grafana-oss:latest
```

6. Install package yang dibutuhkan
```sh
npm install
```

7. Jangan lupa untuk mengubah `PATH_TO_YOUR_PROMETHEUS` pada file `.env` dengan directory path 

8. Buka terminal Git Bash dan jalankan perintah berikut
```sh
./up.sh
```
Jika menemukan barisan ini di Git Bash:
```
docker: Error response from daemon: Conflict. The container name "/my-prometheus" is already in use by container "6ed959e979a55eb4db0826e3bcab17f79f0cece487459b543941eaf8dba6eabd". You have to remove (or rename) that container to be able to reuse that name.
See 'docker run --help'.
```
dan/atau
```
docker: Error response from daemon: Conflict. The container name "/grafana" is already in use by container "a60f6bd25c01d289ab74e93f5c87a8d1aba67ad2fc1ca6a25114fbf68d27d208". You have to remove (or rename) that container to be able to reuse that name.
See 'docker run --help'.
```
abaikan saja.
Jika masih bersikeras tidak nyaman, stop saja container Prometheus dan/atau Grafana secara manual di Docker, lalu jalankan kembali `./up.sh`

9. Pergi ke port [Prometheus](localhost:9090) untuk memastikan container Prometheus berjalan dengan sukses.

10. Pergi ke port [Grafana](localhost:3000) lalu login dengan ketentuan `username` dan `password` sama-sama `admin`. Lakukan perubahan password jika diperlukan

11. `Ctrl-K` lalu cari `"Data Sources`.  Tekan `Add Data Source` lalu pilih opsi `Prometheus`. Tetapkan URL Prometheus sebagai `http://prometheus:9090`. Tekan `Save and Test` di paling bawah.

12. Anda siap menguli menggunakan `Postman` untuk <i> testing requests </i> ~

## Authors
| NIM | Nama |
|---|---|
| 18221045 | Ivan Aldy Ganesen |
| 18221157 | Cathleen Lauretta |
| 18221171 | Hans Stephano Edbert N |