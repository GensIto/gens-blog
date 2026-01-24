import { useState, useTransition } from "hono/jsx"
import { client } from "../lib/client"
import { Input, Button, EnsoCircle } from "../components"

export default function LoginForm() {
  const [error, setError] = useState('')
  const [isPending, startTransition] = useTransition()

  const handleSubmit = (e: Event) => {
    e.preventDefault()
    const formData = new FormData(e.target as HTMLFormElement)

    startTransition(async () => {
      setError('')
      try {
        const response = await client.api.auth.login.$post({
          json: {
            email: formData.get('email') as string,
            password: formData.get('password') as string,
          },
        })

        const data = await response.json()

        if (response.ok && data.success) {
          window.location.href = '/admin/top'
        } else if (!data.success) {
          setError(data.error || 'ログインに失敗しました')
        }
      } catch {
        setError('通信エラーが発生しました')
      }
    })
  }

  return (
    <form class="space-y-6" onSubmit={handleSubmit}>
      {error && (
        <div class="p-3 text-sm text-red-600 bg-red-50 rounded-md">
          {error}
        </div>
      )}
      <div class="flex justify-center">
        <EnsoCircle size={64} />
      </div>
      <div class="space-y-4">
        <Input
          label="メールアドレス"
          name="email"
          type="email"
        />
        <Input
          label="パスワード"
          name="password"
          type="password"
        />
      </div>
      <Button class="w-full" type="submit" disabled={isPending}>
        {isPending ? 'ログイン中...' : 'ログイン'}
      </Button>
    </form>
  )
}
