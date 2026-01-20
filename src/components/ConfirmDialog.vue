<script setup lang="ts">
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { useConfirm } from '@/composables/useConfirm'

const { isOpen, options, handleConfirm, handleCancel } = useConfirm()
</script>

<template>
  <AlertDialog :open="isOpen" @update:open="(v) => !v && handleCancel()">
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>{{ options?.title }}</AlertDialogTitle>
        <AlertDialogDescription>
          {{ options?.message }}
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel @click="handleCancel">
          {{ options?.cancelText || 'Cancelar' }}
        </AlertDialogCancel>
        <AlertDialogAction @click="handleConfirm">
          {{ options?.confirmText || 'Confirmar' }}
        </AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
</template>
