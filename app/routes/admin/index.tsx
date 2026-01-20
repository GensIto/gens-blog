import { createRoute } from 'honox/factory'
import LoginForm from '../../islands/LoginForm'

export default createRoute((c) => {
  return c.render(
    <div class="max-w-96 mx-auto px-6 py-12">
      <LoginForm />
    </div>
  )
})
