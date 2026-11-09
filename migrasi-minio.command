#!/bin/bash
# =====================================================================
#  Migrasi gambar Umira CMS ke MinIO
#  Klik dua kali file ini di Finder (atau jalankan: bash migrasi-minio.command)
#
#  Langkah:
#   1. Pastikan MinIO berjalan (bila MINIO_ENDPOINT = localhost dan belum
#      aktif, MinIO dijalankan lewat Docker sebagai container "umira-minio")
#   2. npm install di folder backend
#   3. Backup tabel konten ke backend/backups/*.json
#   4. Simulasi (dry-run), lalu migrasi: file lama → MinIO + perbarui rujukan
#  Log lengkap: backend/migrasi-minio.log
# =====================================================================
cd "$(dirname "$0")/backend" || exit 1
LOG="$(pwd)/migrasi-minio.log"
exec > >(tee "$LOG") 2>&1

export PATH="/opt/homebrew/bin:/usr/local/bin:$PATH"
[ -s "$HOME/.nvm/nvm.sh" ] && . "$HOME/.nvm/nvm.sh"

fail() { echo; echo "❌ GAGAL: $1"; echo "Log: $LOG"; echo; read -r -p "Tekan Enter untuk menutup..." _; exit 1; }
envval() { grep -E "^$1=" .env | tail -1 | cut -d= -f2- | sed 's/\r$//'; }

echo "== Migrasi gambar ke MinIO — $(date) =="
[ -f .env ] || fail "backend/.env tidak ditemukan"
command -v node >/dev/null || fail "Node.js tidak ditemukan. Install dari https://nodejs.org (versi 20+)"
command -v npm  >/dev/null || fail "npm tidak ditemukan"
echo "Node $(node -v)"

[ "$(envval STORAGE_DRIVER)" = "minio" ] || fail "STORAGE_DRIVER di backend/.env harus = minio"
EP=$(envval MINIO_ENDPOINT); AK=$(envval MINIO_ACCESS_KEY); SK=$(envval MINIO_SECRET_KEY)
EP=${EP:-http://localhost:9000}

# ---------- 1. MinIO ----------
echo; echo "== 1/4 Memeriksa MinIO di $EP"
if curl -sf -m 5 "$EP/minio/health/live" >/dev/null; then
  echo "✔ MinIO aktif"
elif [[ "$EP" =~ ^https?://(localhost|127\.0\.0\.1)(:|/|$) ]]; then
  command -v docker >/dev/null && docker info >/dev/null 2>&1 \
    || fail "MinIO belum berjalan dan Docker tidak aktif. Buka Docker Desktop lalu jalankan file ini lagi, atau jalankan MinIO secara manual."
  PORT=$(echo "$EP" | sed -E 's#^https?://[^:/]+:?([0-9]*).*#\1#'); PORT=${PORT:-9000}
  if docker ps -a --format '{{.Names}}' | grep -qx umira-minio; then
    echo "Menyalakan container umira-minio..."; docker start umira-minio >/dev/null || fail "container umira-minio gagal start"
  else
    echo "Membuat container MinIO (umira-minio)..."
    docker run -d --name umira-minio --restart unless-stopped \
      -p "$PORT:9000" -p 9001:9001 \
      -e MINIO_ROOT_USER="${AK:-minioadmin}" -e MINIO_ROOT_PASSWORD="${SK:-minioadmin}" \
      -v umira-minio-data:/data minio/minio server /data --console-address ":9001" >/dev/null \
      || fail "docker run MinIO gagal"
  fi
  for i in $(seq 1 30); do curl -sf -m 2 "$EP/minio/health/live" >/dev/null && break; sleep 2; done
  curl -sf -m 2 "$EP/minio/health/live" >/dev/null || fail "MinIO tidak merespons di $EP"
  echo "✔ MinIO aktif (console: http://localhost:9001)"
else
  fail "MinIO di $EP tidak bisa dihubungi. Periksa MINIO_ENDPOINT di backend/.env"
fi

# ---------- 2. npm install ----------
echo; echo "== 2/4 Memasang dependency backend"
npm install --no-audit --no-fund || fail "npm install gagal"

# ---------- 3. Backup ----------
echo; echo "== 3/4 Backup database"
node scripts/backup-db.js || fail "backup gagal (MySQL belum jalan / database belum di-seed?)"

# ---------- 4. Migrasi ----------
echo; echo "== 4/4 Migrasi file ke MinIO"
echo "-- simulasi:"
npm run --silent media:migrate -- --dry-run || fail "simulasi migrasi gagal"
echo "-- migrasi:"
npm run --silent media:migrate || fail "migrasi gagal — data bisa dipulihkan dengan: node scripts/restore-backup.js backups/<file>.json"

echo
echo "✅ SELESAI. Semua gambar kini ada di MinIO dan bisa diganti dari menu Media."
echo "   Jalankan backend lagi (npm run start:dev) bila sedang berjalan."
echo "   Log: $LOG"
echo
read -r -p "Tekan Enter untuk menutup..." _
