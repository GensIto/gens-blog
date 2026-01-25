import { useState, useEffect } from 'hono/jsx'
import { client } from '../lib/client'
import { Modal } from '../components'
import WorkHistoryForm from './WorkHistoryForm'
import ContactLinkForm from './ContactLinkForm'
import DeleteButton from './DeleteButton'

type WorkHistoryData = {
  id: number
  period: string
  company: string
  role: string
  skills: string[]
  description: string
  achievements: string[]
  displayOrder: number
}

type ContactLinkData = {
  id: number
  label: string
  href: string
  displayOrder: number
}

type ModalState = {
  isOpen: boolean
  type: 'create-work' | 'edit-work' | 'create-contact' | 'edit-contact' | null
  editId?: string
}

export default function ResumeManagement() {
  const [workHistories, setWorkHistories] = useState<WorkHistoryData[]>([])
  const [contactLinks, setContactLinks] = useState<ContactLinkData[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [modalState, setModalState] = useState<ModalState>({
    isOpen: false,
    type: null,
  })

  const fetchData = async () => {
    try {
      const [workHistoriesRes, contactLinksRes] = await Promise.all([
        client.api['work-histories'].$get(),
        client.api['contact-links'].$get(),
      ])

      const workHistoriesData = await workHistoriesRes.json()
      const contactLinksData = await contactLinksRes.json()

      if (workHistoriesData.success) {
        setWorkHistories(workHistoriesData.workHistories)
      }
      if (contactLinksData.success) {
        setContactLinks(contactLinksData.contactLinks)
      }
    } catch (_error) {
      setError('データの取得に失敗しました')
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  const handleModalClose = () => {
    setModalState({ isOpen: false, type: null })
  }

  const handleSuccess = () => {
    handleModalClose()
    fetchData()
  }

  const getModalTitle = () => {
    switch (modalState.type) {
      case 'create-work':
        return '職歴を追加'
      case 'edit-work':
        return '職歴を編集'
      case 'create-contact':
        return '連絡先リンクを追加'
      case 'edit-contact':
        return '連絡先リンクを編集'
      default:
        return ''
    }
  }

  if (isLoading) {
    return (
      <div class="flex items-center justify-center py-16">
        <span class="font-['Noto_Sans_JP'] text-stone-500">読み込み中...</span>
      </div>
    )
  }

  if (error) {
    return (
      <div class="px-4 py-3 bg-red-50 border border-red-200 text-red-700 text-sm font-['Noto_Sans_JP']">
        {error}
      </div>
    )
  }

  return (
    <div class="space-y-12">
      {/* 職歴セクション */}
      <section>
        <div class="flex items-center justify-between mb-6">
          <h2 class="font-['Noto_Serif_JP'] font-medium text-xl text-stone-900">
            職歴
          </h2>
          <button
            type="button"
            onClick={() =>
              setModalState({ isOpen: true, type: 'create-work' })
            }
            class="inline-flex items-center gap-2 px-4 py-2 bg-stone-900 text-[#f8f6f1] font-['Noto_Sans_JP'] font-medium text-sm hover:bg-stone-800 transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
            追加
          </button>
        </div>

        {workHistories.length === 0 ? (
          <p class="text-stone-500 font-['Noto_Sans_JP'] text-sm">
            職歴がまだ登録されていません
          </p>
        ) : (
          <div class="border border-stone-200 divide-y divide-stone-200">
            {workHistories.map((work) => (
              <div
                key={work.id}
                class="p-4 bg-white flex items-start justify-between gap-4"
              >
                <div class="flex-1 min-w-0">
                  <div class="flex items-center gap-3 mb-1">
                    <span class="font-['Noto_Sans_JP'] text-xs text-stone-500">
                      #{work.displayOrder}
                    </span>
                    <span class="font-['Noto_Sans_JP'] text-xs text-stone-400">
                      {work.period}
                    </span>
                  </div>
                  <h3 class="font-['Noto_Serif_JP'] font-medium text-base text-stone-900 mb-1">
                    {work.company}
                  </h3>
                  <p class="font-['Noto_Sans_JP'] text-sm text-stone-600">
                    {work.role}
                  </p>
                  <div class="flex flex-wrap gap-1 mt-2">
                    {work.skills.map((skill) => (
                      <span
                        key={skill}
                        class="px-2 py-0.5 bg-stone-100 text-stone-600 font-['Noto_Sans_JP'] text-xs"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
                <div class="flex items-center gap-3 shrink-0">
                  <button
                    type="button"
                    onClick={() =>
                      setModalState({
                        isOpen: true,
                        type: 'edit-work',
                        editId: String(work.id),
                      })
                    }
                    class="text-stone-600 hover:text-stone-900 transition-colors font-['Noto_Sans_JP'] text-sm"
                  >
                    編集
                  </button>
                  <DeleteButton
                    id={work.id}
                    type="work-history"
                    itemName={work.company}
                    onSuccess={fetchData}
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* 連絡先リンクセクション */}
      <section>
        <div class="flex items-center justify-between mb-6">
          <h2 class="font-['Noto_Serif_JP'] font-medium text-xl text-stone-900">
            連絡先リンク
          </h2>
          <button
            type="button"
            onClick={() =>
              setModalState({ isOpen: true, type: 'create-contact' })
            }
            class="inline-flex items-center gap-2 px-4 py-2 bg-stone-900 text-[#f8f6f1] font-['Noto_Sans_JP'] font-medium text-sm hover:bg-stone-800 transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
            追加
          </button>
        </div>

        {contactLinks.length === 0 ? (
          <p class="text-stone-500 font-['Noto_Sans_JP'] text-sm">
            連絡先リンクがまだ登録されていません
          </p>
        ) : (
          <div class="border border-stone-200 divide-y divide-stone-200">
            {contactLinks.map((link) => (
              <div
                key={link.id}
                class="p-4 bg-white flex items-center justify-between gap-4"
              >
                <div class="flex-1 min-w-0">
                  <div class="flex items-center gap-3">
                    <span class="font-['Noto_Sans_JP'] text-xs text-stone-500">
                      #{link.displayOrder}
                    </span>
                    <span class="font-['Noto_Serif_JP'] font-medium text-base text-stone-900">
                      {link.label}
                    </span>
                  </div>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    class="font-['Inter'] text-sm text-[#7a9a7a] hover:underline truncate block mt-1"
                  >
                    {link.href}
                  </a>
                </div>
                <div class="flex items-center gap-3 shrink-0">
                  <button
                    type="button"
                    onClick={() =>
                      setModalState({
                        isOpen: true,
                        type: 'edit-contact',
                        editId: String(link.id),
                      })
                    }
                    class="text-stone-600 hover:text-stone-900 transition-colors font-['Noto_Sans_JP'] text-sm"
                  >
                    編集
                  </button>
                  <DeleteButton
                    id={link.id}
                    type="contact-link"
                    itemName={link.label}
                    onSuccess={fetchData}
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* モーダル */}
      <Modal
        isOpen={modalState.isOpen}
        onClose={handleModalClose}
        title={getModalTitle()}
        maxWidth="lg"
      >
        {(modalState.type === 'create-work' ||
          modalState.type === 'edit-work') && (
          <WorkHistoryForm
            id={modalState.editId}
            onSuccess={handleSuccess}
            onCancel={handleModalClose}
          />
        )}
        {(modalState.type === 'create-contact' ||
          modalState.type === 'edit-contact') && (
          <ContactLinkForm
            id={modalState.editId}
            onSuccess={handleSuccess}
            onCancel={handleModalClose}
          />
        )}
      </Modal>
    </div>
  )
}
