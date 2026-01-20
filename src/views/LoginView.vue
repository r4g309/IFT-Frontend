<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useAuth } from '@/composables/useAuth'
import { toTypedSchema } from '@vee-validate/zod'
import { useForm } from 'vee-validate'
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { toast } from 'vue-sonner'
import { useI18n } from 'vue-i18n'
import { computed } from 'vue'
import { createLoginSchema } from '@/schemas/auth.schema'

const router = useRouter()
const { login } = useAuth()
const { t, locale } = useI18n()

const formSchema = computed(() => toTypedSchema(createLoginSchema(t)))

const { handleSubmit, isSubmitting } = useForm({
  validationSchema: formSchema,
})

const onSubmit = handleSubmit(async ({ email, password }) => {
  try {
    await login(email, password)
    router.replace({ name: 'home' })
  } catch (err) {
    toast.error(t('login.error'), {
      id: 'auth-feedback',
    })
  }
})
</script>

<template>
  <div
    class="min-h-screen flex items-center justify-center bg-linear-to-br from-slate-50 to-slate-100 p-4"
  >
    <div class="w-full max-w-md">
      <div class="bg-white rounded-lg shadow-lg p-8 space-y-6">
        <div class="text-center space-y-2">
          <h1 class="text-3xl font-bold tracking-tight">IFT DB</h1>
        </div>

        <form class="space-y-4" @submit="onSubmit">
          <FormField v-slot="{ componentField }" name="email">
            <FormItem>
              <FormLabel>{{ $t('login.email') }}</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  autocomplete="username"
                  :placeholder="$t('login.emailPlaceholder')"
                  v-bind="componentField"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>

          <FormField v-slot="{ componentField }" name="password">
            <FormItem>
              <FormLabel>{{ $t('login.password') }}</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  autocomplete="current-password"
                  :placeholder="$t('login.passwordPlaceholder')"
                  v-bind="componentField"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>

          <Button type="submit" class="w-full" :disabled="isSubmitting">
            {{ isSubmitting ? $t('login.submitting') : $t('login.submit') }}
          </Button>
        </form>
      </div>
    </div>

    <button
      class="fixed bottom-4 right-4 px-4 py-2 bg-slate-800 text-white rounded-lg text-sm"
      @click="locale = locale === 'es' ? 'en' : 'es'"
    >
      {{ locale === 'es' ? '🇬🇧 English' : '🇪🇸 Español' }}
    </button>
  </div>
</template>
