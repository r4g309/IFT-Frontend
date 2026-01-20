import { ref } from 'vue'

interface ConfirmOptions {
  title: string
  message: string
  confirmText?: string
  cancelText?: string
}

const isOpen = ref(false)
const options = ref<ConfirmOptions | null>(null)
let resolvePromise: ((value: boolean) => void) | null = null

export const useConfirm = () => {
  const confirm = (opts: ConfirmOptions): Promise<boolean> => {
    return new Promise((resolve) => {
      options.value = opts
      isOpen.value = true
      resolvePromise = resolve
    })
  }

  const handleConfirm = () => {
    isOpen.value = false
    resolvePromise?.(true)
    resolvePromise = null
  }

  const handleCancel = () => {
    isOpen.value = false
    resolvePromise?.(false)
    resolvePromise = null
  }

  return {
    confirm,
    isOpen,
    options,
    handleConfirm,
    handleCancel
  }
}
