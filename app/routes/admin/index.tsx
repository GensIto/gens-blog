import { createRoute } from 'honox/factory'
import LoginForm from '../../islands/LoginForm'
import { getCookie } from 'hono/cookie'

export default createRoute((c) => {
  const auth_token = getCookie(c, 'auth_token')
  if (auth_token) {
    return c.redirect('/admin/top')
  }

  return c.render(
    <div class="max-w-96 mx-auto px-6 py-12">
      <LoginForm />
    </div>
  )
})
