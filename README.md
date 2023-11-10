# <span style="color: cyan;"> <p style="text-align: center;"> TUGAS BESAR ANALISIS DAN PERANCANGAN KINERJA SISTEM
# <span style="color: cyan;">  <p style="text-align: center;"> II4032 - 2023/2024 </span>

## <span style="color: orange;">Kelompok 8
## <span style="color: orange;"> 18221045 - Ivan Aldy Ganesen
## <span style="color: orange;"> 18221157 - Cathleen Lauretta
## <span style="color: orange;"> 18221171 - Hans Stephano Edbert N 

### <p style="text-align: center;"> <b> Selamat datang ke <i>repository </i> Github untuk Tugas Besar II4032 (Analisis dan Perancangan Kinerja Sistem) milik kelompok 8!</b>
<br>

#### <p style="text-align: center;"> <b> Keperluan Running Aplikasi </n>
#### 1. Docker (Pastikan spesifikasi laptop memadai)
#### 2. NPM (untuk keperluan perjalanan Docker)
#### 3. Semangat Pengerjaan Tugas (sangat langka di tengah pertemanan antara mahasiswa dan tugas-tugas besar)

#### <p style="text-align: center;"> <b> Setting Up Aplikasi </b>
#### 1. Pada terminal lokal, jalankan barisan kode ini (wajib):
```
docker network create prometheus_grafana
```
#### ini bertujuan untuk menciptakan network yang nantinya akan dipakai untuk setup Prometheus dan Grafana

#### 2. Pada terminal lokal, jalankan barisan kode ini (opsional):
```
docker pull prom/prometheus:latest
```
#### ini akan menarik image untuk container Prometheus nantinya.

#### 3. Pada terminal lokal, jalankan barisan kode ini (wajib):
```
docker pull grafana/grafana-oss:latest
```
#### ini akan menarik image untuk container Grafana nantinya.

#### 4. Jalankan npm install
#### 5. Jalankan `./up.sh` pada terminal Git Bash
#### jika menemukan barisan ini di Git Bash:
```
docker: Error response from daemon: Conflict. The container name "/my-prometheus" is already in use by container "6ed959e979a55eb4db0826e3bcab17f79f0cece487459b543941eaf8dba6eabd". You have to remove (or rename) that container to be able to reuse that name.
See 'docker run --help'.
```
dan/atau
```
docker: Error response from daemon: Conflict. The container name "/grafana" is already in use by container "a60f6bd25c01d289ab74e93f5c87a8d1aba67ad2fc1ca6a25114fbf68d27d208". You have to remove (or rename) that container to be able to reuse that name.
See 'docker run --help'.
```
abaikan saja.<br>
Jika masih bersikeras tidak nyaman, stop saja container Prometheus dan/atau Grafana secara manual di Docker, lalu jalankan kembali `./up.sh`


#### 6. Pergi ke port [Prometheus](localhost:9090) untuk memastikan container Prometheus berjalan dengan sukses.

#### 7. Pergi ke port [Grafana](localhost:3000) lalu login dengan ketentuan `username` dan `password` sama-sama `admin`. Lakukan perubahan password jika diperlukan

#### 8. `Ctrl-K` lalu cari `"Data Sources`.  Tekan `Add Data Source` lalu pilih opsi `Prometheus`. Tetapkan URL Prometheus sebagai `http://prometheus:9090`. Tekan `Save and Test` di paling bawah.

#### 9. Anda siap menguli menggunakan `Postman` untuk <i> testing requests </i> ~