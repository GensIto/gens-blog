import { useState } from "hono/jsx"
import { hc } from "hono/client"
import type { App } from "../server"
import { Input, Button } from "../components"

const client = hc<App>('/')

export default function LoginForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: Event) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    try {
      const response = await client.api.auth.login.$post({
        json: { email, password },
      })

      const data = await response.json()

      if (response.ok && data.success) {
        window.location.href = '/admin/top'
      } else if (!data.success) {
        setError(data.error || 'ログインに失敗しました')
      }
    } catch {
      setError('通信エラーが発生しました')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form class="space-y-6" onSubmit={handleSubmit}>
      {error && (
        <div class="p-3 text-sm text-red-600 bg-red-50 rounded-md">
          {error}
        </div>
      )}
      <div class="space-y-4">
        <Input
          label="メールアドレス"
          name="email"
          type="email"
          value={email}
          onInput={(e: Event) => setEmail((e.target as HTMLInputElement).value)}
        />
        <Input
          label="パスワード"
          name="password"
          type="password"
          value={password}
          onInput={(e: Event) => setPassword((e.target as HTMLInputElement).value)}
        />
      </div>
      <Button type="submit" disabled={isLoading}>
        {isLoading ? 'ログイン中...' : 'ログイン'}
      </Button>
    </form>
  )
}
