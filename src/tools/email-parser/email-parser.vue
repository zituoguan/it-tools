<script setup lang="ts">
import PostalMime from 'postal-mime';

const { t } = useI18n();

const inputType = ref<'file' | 'content'>('file');
const emailContent = ref('');
const fileInput = ref() as Ref<File | null>;
const error = ref('');

const parsedEmail = computedAsync(async () => {
  const emailContentValue = emailContent.value;
  const file = fileInput.value;
  error.value = '';
  try {
    if (inputType.value === 'file' && file) {
      return await PostalMime.parse(await file.arrayBuffer());
    }
    else if (inputType.value === 'content' && emailContentValue) {
      return await PostalMime.parse(emailContentValue);
    }
    else {
      return null;
    }
  }
  catch (e: any) {
    error.value = e.toString();
    return null;
  }
});

function downloadFile(data: ArrayBuffer | string, fileName: string, fileType: string) {
  const blob = new Blob([data], { type: fileType || 'application/octet-stream' });
  const downloadUrl = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = downloadUrl;
  a.download = fileName;
  document.body.appendChild(a);
  a.click();
  URL.revokeObjectURL(downloadUrl);
}

function onUpload(file: File) {
  if (file) {
    fileInput.value = file;
  }
}
</script>

<template>
  <div>
    <c-card :title="t('tools.email-parser.input-title')" mb-2>
      <n-radio-group v-model:value="inputType" name="radiogroup" mb-2 flex justify-center>
        <n-space>
          <n-radio
            value="file"
            :label="t('tools.email-parser.file-option')"
          />
          <n-radio
            value="content"
            :label="t('tools.email-parser.content-option')"
          />
        </n-space>
      </n-radio-group>

      <c-file-upload
        v-if="inputType === 'file'"
        :title="t('tools.email-parser.file-upload-title')"
        @file-upload="onUpload"
      />

      <c-input-text
        v-if="inputType === 'content'"
        v-model:value="emailContent"
        :label="t('tools.email-parser.content-label')"
        multiline
        :placeholder="t('tools.email-parser.content-placeholder')"
        rows="15"
        mb-2
      />
    </c-card>

    <c-alert v-if="error">
      {{ error }}
    </c-alert>

    <c-card v-if="!error && parsedEmail" :title="t('tools.email-parser.output-title')">
      <input-copyable v-if="fileInput?.name" :label="t('tools.email-parser.file-name')" :value="fileInput?.name" />
      <input-copyable v-if="parsedEmail.date" :label="t('tools.email-parser.date')" :value="parsedEmail.date" />
      <input-copyable v-if="parsedEmail.from?.name" :label="t('tools.email-parser.from-name')" :value="parsedEmail.from?.name" />
      <input-copyable v-if="parsedEmail.from" :label="t('tools.email-parser.from-address')" :value="parsedEmail.from?.address || parsedEmail.from" />
      <input-copyable v-if="parsedEmail.to" :label="t('tools.email-parser.to')" :value="JSON.stringify(parsedEmail.to)" />
      <input-copyable v-if="parsedEmail.cc" :label="t('tools.email-parser.cc')" :value="JSON.stringify(parsedEmail.cc)" />
      <input-copyable v-if="parsedEmail.bcc" :label="t('tools.email-parser.bcc')" :value="JSON.stringify(parsedEmail.bcc)" />
      <input-copyable v-if="parsedEmail.replyTo" :label="t('tools.email-parser.reply-to')" :value="JSON.stringify(parsedEmail.replyTo)" />
      <input-copyable v-if="parsedEmail.subject" :label="t('tools.email-parser.subject')" :value="parsedEmail.subject" />
      <c-card v-if="parsedEmail.text" :title="t('tools.email-parser.plain-content')" mb-2>
        <details>
          <summary>{{ t('tools.email-parser.see-content') }}</summary>
          <textarea-copyable :value="parsedEmail.text" word-wrap />
        </details>
      </c-card>
      <c-card v-if="parsedEmail.html" :title="t('tools.email-parser.html-content')" mb-2>
        <details>
          <summary>{{ t('tools.email-parser.see-content') }}</summary>
          <textarea-copyable :value="parsedEmail.html" word-wrap />
        </details>
      </c-card>
      <c-card v-if="parsedEmail?.attachments?.length" :title="t('tools.email-parser.attachments')" mb-2>
        <n-table>
          <thead>
            <tr>
              <th scope="col">
                {{ t('tools.email-parser.attachment') }}
              </th><th scope="col" />
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(h, index) in parsedEmail.attachments || []"
              :key="index"
            >
              <td>
                {{ `${h.filename || h.contentId || 'noname'} (${h.mimeType}) / ${h.disposition}` }}
              </td>
              <td>
                <c-button @click="downloadFile(h.content, h.filename || h.contentId || 'noname', h.mimeType)">
                  {{ t('tools.email-parser.download') }}
                </c-button>
              </td>
            </tr>
          </tbody>
        </n-table>
      </c-card>

      <input-copyable v-if="parsedEmail.messageId" :label="t('tools.email-parser.message-id')" :value="parsedEmail.messageId" />
      <input-copyable v-if="parsedEmail.inReplyTo" :label="t('tools.email-parser.in-reply-to')" :value="parsedEmail.inReplyTo" />
      <input-copyable v-if="parsedEmail.references" :label="t('tools.email-parser.references')" :value="parsedEmail.references" />
      <input-copyable v-if="parsedEmail.deliveredTo" :label="t('tools.email-parser.delivered-to')" :value="parsedEmail.deliveredTo" />
      <input-copyable v-if="parsedEmail.returnPath" :label="t('tools.email-parser.return-path')" :value="parsedEmail.returnPath" />
      <input-copyable v-if="parsedEmail.sender?.name" :label="t('tools.email-parser.sender-name')" :value="parsedEmail.sender?.name" />
      <input-copyable v-if="parsedEmail.sender" :label="t('tools.email-parser.sender-address')" :value="parsedEmail.sender?.address || parsedEmail.sender" />

      <c-card :title="t('tools.email-parser.all-headers')" mt-2>
        <input-copyable
          v-for="(h, index) in parsedEmail.headers || []"
          :key="index"
          :label="h.key"
          :value="h.value"
        />
      </c-card>
    </c-card>
  </div>
</template>
