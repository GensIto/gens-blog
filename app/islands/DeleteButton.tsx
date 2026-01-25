import { useState, useTransition } from 'hono/jsx'
import { client } from '../lib/client'
import { Modal } from '../components'

type DeleteButtonProps = {
  id: number
  type: 'work-history' | 'contact-link'
  itemName: string
  onSuccess?: () => void
}

export default function DeleteButton({
  id,
  type,
  itemName,
  onSuccess,
}: DeleteButtonProps) {
  const [isPending, startTransition] = useTransition()
  const [isConfirmOpen, setIsConfirmOpen] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleDelete = () => {
    startTransition(async () => {
      setError(null)
      try {
        let response
        if (type === 'work-history') {
          response = await client.api['work-histories'][':id'].$delete({
            param: { id: String(id) },
          })
        } else {
          response = await client.api['contact-links'][':id'].$delete({
            param: { id: String(id) },
          })
        }

        const result = (await response.json()) as {
          success: boolean
          error?: string
        }

        if (response.ok && result.success) {
          setIsConfirmOpen(false)
          onSuccess?.()
        } else if (!result.success) {
          setError(result.error || '削除に失敗しました')
        }
      } catch (_error) {
        setError('通信エラーが発生しました')
      }
    })
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setIsConfirmOpen(true)}
        class="text-red-600 hover:text-red-800 transition-colors font-['Noto_Sans_JP'] text-sm"
      >
        削除
      </button>

      <Modal
        isOpen={isConfirmOpen}
        onClose={() => setIsConfirmOpen(false)}
        title="削除の確認"
        maxWidth="sm"
      >
        <div class="flex flex-col gap-6">
          {error && (
            <div class="px-4 py-3 bg-red-50 border border-red-200 text-red-700 text-sm font-['Noto_Sans_JP']">
              {error}
            </div>
          )}
          <p class="font-['Noto_Sans_JP'] text-stone-700">
            「{itemName}」を削除してもよろしいですか？
            <br />
            この操作は取り消せません。
          </p>
          <div class="flex gap-4 justify-end">
            <button
              type="button"
              onClick={() => setIsConfirmOpen(false)}
              disabled={isPending}
              class="inline-flex items-center justify-center px-6 py-2.5 bg-transparent border border-stone-900 text-stone-900 font-['Noto_Sans_JP'] font-medium text-sm hover:bg-stone-100 transition-colors disabled:opacity-50"
            >
              キャンセル
            </button>
            <button
              type="button"
              onClick={handleDelete}
              disabled={isPending}
              class="inline-flex items-center justify-center px-6 py-2.5 bg-red-600 border border-red-600 text-white font-['Noto_Sans_JP'] font-medium text-sm hover:bg-red-700 transition-colors disabled:opacity-50"
            >
              {isPending ? '削除中...' : '削除する'}
            </button>
          </div>
        </div>
      </Modal>
    </>
  )
}
