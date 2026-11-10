# Umira CMS — Admin Panel Company Profile

CMS untuk website company profile **Umira Sinergi Global** (folder `frontend/website/`).
Backend dan frontend dipisah:

```
Template-compro-umira/
├── backend/            ← API NestJS + MySQL (TypeORM) — repo terpisah
│   └── websitelama/    ← salinan website lama, sumber impor konten & gambar
├── frontend/
│   ├── website/        ← website Next.js (dulu package/), kini membaca konten dari CMS
│   └── admin/          ← Admin panel React + Vite + Tailwind
├── docker-compose.yml  ← MySQL + backend + admin sekaligus
└── CMS-README.md
```

## Fitur

| Menu | Isi |
|---|---|
| **Dashboard** | Ringkasan jumlah konten, pesan baru, grafik pesan per bulan, aktivitas terbaru |
| **Blog & Aktivitas** | CRUD artikel 2 bahasa (ID/EN), editor Markdown + pratinjau, sisip gambar, status draf/terbit/arsip, tanggal terbit, SEO per bahasa, duplikat, aksi massal |
| **Proyek** | CRUD proyek 2 bahasa, galeri foto, luas area, lokasi, klien, tahun, lingkup pekerjaan (tag), urutan tampil |
| **Karir** | Lowongan 2 bahasa, tanggal tutup (otomatis hilang dari website), divisi, lokasi, jenis kerja, email/link lamaran |
| **Media** | Upload gambar/video/PDF (drag & drop), folder, teks alternatif, salin URL, hapus |
| **Konten halaman** | Layanan, statistik, tim, testimoni, FAQ, partner, avatar, marquee, menu header, link footer, kantor, media sosial — tambah, ubah, urutkan, sembunyikan |
| **Teks website** | Semua teks statis next-intl (judul section, visi-misi, label tombol) dalam 2 bahasa |
| **Pengaturan** | Identitas & logo, file company profile, video hero, kontak, SEO & Google Analytics |
| **Pesan masuk** | Pesan dari formulir kontak: status, catatan internal, balas via email/WhatsApp, ekspor CSV |
| **Pengguna** | Kelola akun & peran (Super admin / Admin / Editor) |
| **Log aktivitas** | Jejak setiap perubahan & login |

Hak akses:
- **Editor** — semua konten, media, konten halaman, teks website, pesan masuk.
- **Admin** — editor + pengaturan + log aktivitas.
- **Super admin** — admin + kelola pengguna.

---

## Menjalankan di komputer (development)

Butuh **Node.js 20+** dan **MySQL 8** (atau MariaDB 10.6+).

### 1. Database
```sql
CREATE DATABASE umira_cms CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

### 2. Backend
```bash
cd backend
cp .env.example .env        # isi DB_USERNAME, DB_PASSWORD, JWT_SECRET
npm install
npm run seed                # buat tabel + super admin + impor konten website lama
npm run start:dev           # http://localhost:4000/api  (Swagger: /api/docs)
```
Seeder mengimpor 14 artikel, 5 proyek, 1 lowongan dari `backend/websitelama/markdown`, seluruh teks dari
`backend/websitelama/src/message`, serta data layanan/tim/FAQ/menu/footer dari website lama.
Aman dijalankan ulang (data yang sudah ada tidak ditimpa).

Login awal: **admin@umiraglobal.com / Admin@12345** → segera ganti di menu *Profil saya*.

### 3. Admin panel
```bash
cd frontend/admin
cp .env.example .env        # VITE_API_URL=http://localhost:4000
npm install
npm run dev                 # http://localhost:5173
```

### 4. Website
```bash
cd frontend/website
cp .env.example .env.local  # CMS_API_URL & NEXT_PUBLIC_CMS_API_URL=http://localhost:4000
npm run dev                 # http://localhost:3005
```

---

## Cara website memakai CMS

Perubahan di folder `frontend/website/` dibuat seminimal mungkin dan **selalu punya cadangan**:
jika `CMS_API_URL` kosong atau CMS mati, website memakai data lama (markdown & JSON) seperti sebelumnya.

| File website | Sekarang mengambil dari |
|---|---|
| `src/lib/cms.ts`, `src/lib/cms-core.ts` | (baru) helper koneksi ke CMS + fallback |
| `src/i18n/request.ts` | `GET /api/public/messages/:locale` (digabung dengan JSON lokal) |
| `src/app/api/page-data`, `layout-data` | `GET /api/public/page-data`, `/layout-data` |
| `src/app/api/blogs-data`, `careers-data`, `projects` | `GET /api/public/blogs`, `/careers`, `/projects` |
| halaman detail blog / proyek / karir & daftar proyek | `GET /api/public/{blogs,projects,careers}/:slug` |
| formulir kontak | `POST /api/public/inquiries` (+ tetap kirim email via formsubmit) |

Konten di-cache 60 detik (`CMS_REVALIDATE`), jadi perubahan di admin tampil di website maksimal ±1 menit.
Gambar yang diupload lewat CMS disajikan backend di `/uploads/...` dan dikirim ke website sebagai URL lengkap.
Gambar lama di `frontend/website/public/images` tetap dipakai apa adanya.

## API

Semua endpoint ada di Swagger: `http://localhost:4000/api/docs`.

- `POST /api/auth/login` · `GET /api/auth/me` · `PATCH /api/auth/profile` · `POST /api/auth/change-password`
- `/api/admin/*` — butuh header `Authorization: Bearer <token>` (blogs, projects, careers, collections, site-texts, settings, media, inquiries, users, activity-logs, dashboard)
- `/api/public/*` — tanpa login, dipakai website (blogs, projects, careers, collections/:key, settings, messages/:locale, page-data, layout-data, POST inquiries — dibatasi 5 kali/menit per IP)

## Deploy dengan Docker

```bash
cp docker.env.example .env       # isi JWT_SECRET, password, APP_URL, SITE_URL
docker compose up -d --build
docker compose exec backend node dist/database/seeds/run-seed.js
```
Backend menjalankan migrasi otomatis saat start (`DB_SYNCHRONIZE=false`).
Untuk server tanpa Docker: `npm run build && npm run migration:run:prod && npm run start:prod` di `backend/`,
lalu `npm run build` di `frontend/admin/` dan sajikan folder `frontend/admin/dist` (contoh konfigurasi Nginx di `frontend/admin/nginx.conf`).

Catatan production:
- Ganti `JWT_SECRET` (backend menolak start di production bila masih default).
- Isi `CORS_ORIGINS` dengan domain admin & website, `APP_URL` dengan domain API publik.
- Folder `backend/uploads` (atau volume `uploads`) harus di-backup bersama database.

## Menambah jenis konten halaman baru

Tambahkan definisi di `backend/src/modules/content-schemas/collections.schemas.ts`
(tipe field: text, textarea, markdown, number, boolean, image, file, url, email, select, tags, list).
Form di admin panel terbentuk otomatis — tidak perlu mengubah frontend.
Ambil datanya di website lewat `GET /api/public/collections/<key>?locale=id`.
