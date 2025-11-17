import { useState } from "hono/jsx";

export default function Counter() {
  const [count, setCount] = useState(0);
  return (
    <div>
      <p class='py-2 text-2xl'>{count}</p>
      <button class='btn btn-neutral' onClick={() => setCount(count + 1)}>
        Increment
      </button>
    </div>
  );
}
