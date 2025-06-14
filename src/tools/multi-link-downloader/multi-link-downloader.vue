<script lang="ts">
import { defineComponent, ref } from 'vue';
import { downloadLinks } from './multi-link-downloader.service';

export default defineComponent({
  setup() {
    const { t } = useI18n();

    const links = ref<string>('');
    const isDownloading = ref(false);

    const downloadMultiLinks = async () => {
      if (links.value && !isDownloading.value) {
        isDownloading.value = true;
        try {
          await downloadLinks(links.value);
        }
        catch (error) {
          console.error('Download failed:', error);
        }
        finally {
          isDownloading.value = false;
        }
      }
    };

    const clearInput = () => {
      links.value = '';
    };

    return {
      t,
      links,
      isDownloading,
      downloadMultiLinks,
      clearInput,
    };
  },
});
</script>

<template>
  <c-card>
    <div class="mb-4">
      <div class="mb-2 text-sm text-gray-600">
        {{ t('tools.multi-link-downloader.instructions') }}
      </div>
      <div class="flex justify-between">
        <c-button
          class="mr-2"
          :disabled="!links || isDownloading"
          :loading="isDownloading"
          @click="downloadMultiLinks"
        >
          {{ isDownloading ? t('tools.multi-link-downloader.downloading') : t('tools.multi-link-downloader.start-download') }}
        </c-button>
        <c-button
          class="ml-2"
          :disabled="isDownloading"
          @click="clearInput"
        >
          {{ t('tools.multi-link-downloader.clear') }}
        </c-button>
      </div>
    </div>

    <c-input-text
      v-model:value="links"
      :placeholder="t('tools.multi-link-downloader.add-links-separated-by-new-lines')"
      multiline
      :rows="20"
    />
  </c-card>
</template>
