import jwtDecode from 'jwt-decode'
import { cookies } from 'next/headers'

interface UserProps {
  sub: string
  name: string
  avatarUrl: string
}

export function getUser(): UserProps {
  const token = cookies().get('token')?.value

  if (!token) {
    throw new Error('Unauthenticated')
  }

  const user: UserProps = jwtDecode(token)

  return user
}
