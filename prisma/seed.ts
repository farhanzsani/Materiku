import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient()

async function main() {

    console.log('seeding dimulai')

    await prisma.materi.deleteMany()
    await prisma.user.deleteMany()

    const hashedPassword = await bcrypt.hash('akuadmin', 100)
    console.log('password berhasil di hash')

    const admin = await prisma.user.create({
        data: {
            username    : "admin",
            password    : hashedPassword,
        }
    })
    console.log('admin berhasil dibuat')

    await prisma.materi.create({
    data: {
      title: 'Selamat Datang di Blog Materi',
      slug: 'welcome-materi',
      content: '# Halo Dunia!\n\nIni adalah materi pertama saya menggunakan **Markdown**.\n\n## Fitur:\n* Simpel\n* Cepat\n* Ringan',
      authorId: admin.id
    },
  })

  console.log('user admin dan materi satu berhasil di buat')

}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async(e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })