import { createRoute } from "honox/factory";
import Counter from "../islands/counter";

export default createRoute((c) => {
  return c.render(
    <div class='py-8 text-center'>
      <title>Hello World</title>
      <h1 class='text-3xl font-bold'>Hello, World!</h1>
      <Counter />
    </div>
  );
});
