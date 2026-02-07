# 📚 MateriKu

Platform pembelajaran berbasis web untuk membuat dan berbagi materi dengan dukungan Markdown. Dibangun dengan teknologi modern untuk pengalaman pengguna yang optimal.

![Nuxt](https://img.shields.io/badge/Nuxt-4.x-00DC82?style=for-the-badge&logo=nuxt.js&logoColor=white)
![Vue.js](https://img.shields.io/badge/Vue.js-3.x-4FC08D?style=for-the-badge&logo=vue.js&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-ORM-2D3748?style=for-the-badge&logo=prisma&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind-CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

## ✨ Fitur

- 📝 **Markdown Editor** - Tulis materi dengan sintaks Markdown dan preview real-time
- 🔍 **Pencarian** - Cari materi dengan cepat berdasarkan judul
- 🌙 **Dark Mode** - Tampilan gelap yang nyaman untuk mata
- 🔐 **Autentikasi Admin** - Sistem login untuk mengelola materi
- 📱 **Responsif** - Tampilan optimal di berbagai ukuran layar

## 🛠️ Tech Stack

| Teknologi | Deskripsi |
|-----------|-----------|
| [Nuxt 4](https://nuxt.com/) | Framework Vue.js untuk full-stack web apps |
| [Vue 3](https://vuejs.org/) | JavaScript framework untuk UI |
| [Prisma](https://www.prisma.io/) | Next-generation ORM untuk database |
| [SQLite](https://www.sqlite.org/) | Database ringan dan portabel |
| [Tailwind CSS](https://tailwindcss.com/) | Utility-first CSS framework |
| [Marked](https://marked.js.org/) | Markdown parser dan compiler |

## 📦 Instalasi

### Prasyarat

- Node.js 18+ 
- npm atau yarn

### Langkah-langkah

1. **Clone repository**
   ```bash
   git clone https://github.com/farhanzsani/Materiku.git
   cd Materiku
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Setup database**
   ```bash
   npx prisma generate
   npx prisma db push
   ```

4. **Seed data awal (opsional)**
   ```bash
   npx prisma db seed
   ```

5. **Jalankan development server**
   ```bash
   npm run dev
   ```

6. **Buka di browser**
   ```
   http://localhost:3000
   ```



## 📁 Struktur Proyek

```
materiku/
├── app/
│   ├── pages/              # Halaman aplikasi
│   │   ├── index.vue       # Halaman utama (daftar materi)
│   │   ├── login.vue       # Halaman login admin
│   │   ├── materi/
│   │   │   └── [slug].vue  # Halaman detail materi
│   │   └── admin/
│   │       ├── tambah.vue  # Halaman tambah materi
│   │       └── edit/
│   │           └── [id].vue # Halaman edit materi
│   ├── middleware/         # Route middleware
│   └── assets/             # CSS dan assets
├── server/
│   └── api/                # API endpoints
│       ├── auth/           # Autentikasi (login, logout, me)
│       ├── materi/         # CRUD materi
│       └── login.post.ts   # Login handler
├── prisma/
│   ├── schema.prisma       # Database schema
│   └── seed.ts             # Database seeder
└── public/                 # Static files
```

## 🔌 API Endpoints

### Autentikasi

| Method | Endpoint | Deskripsi |
|--------|----------|-----------|
| `POST` | `/api/login` | Login admin |
| `POST` | `/api/auth/logout` | Logout |
| `GET` | `/api/auth/me` | Cek status autentikasi |

### Materi

| Method | Endpoint | Deskripsi |
|--------|----------|-----------|
| `GET` | `/api/materi` | Daftar semua materi |
| `GET` | `/api/materi/:id` | Detail materi (by ID atau slug) |
| `POST` | `/api/materi/create` | Buat materi baru |
| `PUT` | `/api/materi/:id` | Update materi |
| `DELETE` | `/api/materi/:id` | Hapus materi |

## 🚀 Deployment

### Build untuk Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## 📝 Penggunaan

### Membuat Materi Baru

1. Login sebagai admin di `/login`
2. Klik tombol **"+ Tambah Materi"**
3. Tulis judul dan konten (mendukung Markdown)
4. Klik **"Terbitkan"**

### Sintaks Markdown yang Didukung

```markdown
# Heading 1
## Heading 2
### Heading 3

**Teks tebal** dan *teks miring*

- Item list
- Item lainnya

1. Numbered list
2. Item kedua

`inline code`

\`\`\`javascript
// Code block
console.log('Hello World!')
\`\`\`

> Blockquote

[Link](https://example.com)
```

## 🤝 Kontribusi

Kontribusi sangat diterima! Silakan buat pull request atau buka issue untuk diskusi.

1. Fork repository
2. Buat branch fitur (`git checkout -b fitur-baru`)
3. Commit perubahan (`git commit -m 'Menambah fitur baru'`)
4. Push ke branch (`git push origin fitur-baru`)
5. Buat Pull Request


## 👨‍💻 Author

**Farhan Zsani**

- GitHub: [@farhanzsani](https://github.com/farhanzsani)

---

<p align="center">
  Made with ❤️ by <a href="https://github.com/farhanzsani">farhanzsani</a>
</p>
