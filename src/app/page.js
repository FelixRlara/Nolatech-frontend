
import Link from "next/link";

export default function Home() {
  return (
    <main>
      <Link href="/auth/login">
        login
      </Link>
      <Link href="/auth/register">
        register
      </Link>
      <Link href="/user/1">
        user
      </Link>
    </main>
  )
}
