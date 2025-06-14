<script setup lang="ts">
import { Buffer } from 'node:buffer';
import MsgReader, { type FieldsData } from '@kenjiuno/msgreader';
import { getProps } from '@kenjiuno/msgreader/lib/Defs.js';
import { deEncapsulateSync } from 'rtf-stream-parser';
import { decompressRTF } from '@kenjiuno/decompressrtf';
import iconv from 'iconv-lite';

const { t } = useI18n();

const fileInput = ref() as Ref<File | null>;
const error = ref('');

function getPropertyName(tag: string | undefined) {
  if (!tag) {
    return '';
  }
  const tagLower = tag.toLocaleLowerCase();
  const prop = getProps().find(p => p.key?.toLocaleLowerCase() === tagLower);
  if (!prop) {
    return tag;
  }
  return `${prop.name} (${prop.area})`;
}

const parsedEmailRaw = computedAsync(async () => {
  const file = fileInput.value;
  error.value = '';
  if (file == null) {
    return null;
  }
  try {
    const msg = new MsgReader(await file.arrayBuffer());
    msg.parserConfig = {
      includeRawProps: true,
    };
    return msg;
  }
  catch (e: any) {
    error.value = e.toString();
    return null;
  }
});
const parsedEmail = computed(() => parsedEmailRaw.value?.getFileData());
const parsedRtf = computed(() => {
  if (!parsedEmail.value?.compressedRtf) {
    return { rtf: '', html: '' };
  }
  try {
    const rtfBlob = decompressRTF(Array.from(parsedEmail.value?.compressedRtf));
    const rtfText = iconv.decode(
      Buffer.from(rtfBlob),
      'latin1',
    );
    try {
      return { rtf: rtfText, html: deEncapsulateSync(rtfText, { decode: iconv.decode })?.text };
    }
    catch (dex: any) {
      return { rtf: rtfText, html: dex.toString() };
    }
  }
  catch (ex: any) {
    return { rtf: ex.toString(), html: '' };
  }
});

function downloadFile(attachment: FieldsData) {
  const attachmentData = parsedEmailRaw.value?.getAttachment(attachment);
  if (!attachmentData) {
    return;
  }
  const blob = new Blob([attachmentData.content], { type: 'application/octet-stream' });
  const downloadUrl = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = downloadUrl;
  a.download = attachmentData.fileName;
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
    <c-card :title="t('tools.outlook-parser.input')" mb-2>
      <c-file-upload
        :title="t('tools.outlook-parser.upload-title')"
        @file-upload="onUpload"
      />
    </c-card>

    <c-alert v-if="error">
      {{ error }}
    </c-alert>

    <c-card v-if="!error && parsedEmail" :title="t('tools.outlook-parser.output')">
      <input-copyable v-if="fileInput?.name" :label="t('tools.outlook-parser.file-name')" :value="fileInput?.name" />
      <input-copyable v-if="parsedEmail.creationTime" :label="t('tools.outlook-parser.creation-date')" :value="parsedEmail.creationTime" />
      <input-copyable v-if="parsedEmail.clientSubmitTime" :label="t('tools.outlook-parser.submit-date')" :value="parsedEmail.clientSubmitTime" />
      <input-copyable v-if="parsedEmail.messageDeliveryTime" :label="t('tools.outlook-parser.delivery-date')" :value="parsedEmail.messageDeliveryTime" />
      <input-copyable v-if="parsedEmail.lastModificationTime" :label="t('tools.outlook-parser.last-mod-date')" :value="parsedEmail.lastModificationTime" />
      <c-card :title="t('tools.outlook-parser.recipients')" mt-2>
        <input-copyable
          v-for="(h, index) in parsedEmail.recipients || []"
          :key="index"
          :label="h.recipType || t('tools.outlook-parser.unknown')"
          :value="`${h.name}/${h.email}`"
        />
      </c-card>
      <input-copyable v-if="parsedEmail.subject" :label="t('tools.outlook-parser.subject')" :value="parsedEmail.subject" />
      <c-card v-if="parsedEmail.body" :title="t('tools.outlook-parser.plain-content')" mb-2>
        <details>
          <summary>{{ t('tools.outlook-parser.see-content') }}</summary>
          <textarea-copyable :value="parsedEmail.body" />
        </details>
      </c-card>
      <c-card v-if="parsedEmail.bodyHtml" :title="t('tools.outlook-parser.html-content')" mb-2>
        <details>
          <summary>{{ t('tools.outlook-parser.see-content') }}</summary>
          <textarea-copyable :value="parsedEmail.bodyHtml" word-wrap />
        </details>
      </c-card>
      <c-card v-if="parsedRtf.rtf || parsedRtf.html" :title="t('tools.outlook-parser.rtf-content')" mb-2>
        <details>
          <summary>{{ t('tools.outlook-parser.see-raw-rtf') }}</summary>
          <textarea-copyable :value="parsedRtf.rtf" word-wrap />
        </details>
        <details>
          <summary>{{ t('tools.outlook-parser.see-rtf-html') }}</summary>
          <textarea-copyable :value="parsedRtf.html" word-wrap />
        </details>
      </c-card>
      <c-card v-if="parsedEmail?.attachments?.length" :title="t('tools.outlook-parser.attachments')" mb-2>
        <n-table>
          <thead>
            <tr>
              <th scope="col">
                {{ t('tools.outlook-parser.attachment') }}
              </th><th scope="col" />
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(h, index) in parsedEmail.attachments || []"
              :key="index"
            >
              <td>
                {{ `${h.fileName || h.fileNameShort || t('tools.outlook-parser.noname')}` }}
              </td>
              <td>
                <c-button @click="downloadFile(h)">
                  {{ t('tools.outlook-parser.download') }}
                </c-button>
              </td>
            </tr>
          </tbody>
        </n-table>
      </c-card>

      <input-copyable v-if="parsedEmail.messageId" :label="t('tools.outlook-parser.message-id')" :value="parsedEmail.messageId" />
      <input-copyable v-if="parsedEmail.senderName" :label="t('tools.outlook-parser.sender-name')" :value="parsedEmail.senderName" />
      <input-copyable v-if="parsedEmail.senderEmail" :label="t('tools.outlook-parser.sender-email')" :value="parsedEmail.senderEmail" />

      <c-card v-if="parsedEmail.headers" :title="t('tools.outlook-parser.all-headers')" mt-2>
        <textarea-copyable :value="parsedEmail.headers" />
      </c-card>

      <c-card :title="t('tools.outlook-parser.all-rawprops')" mt-2>
        <input-copyable
          v-for="(h, index) in parsedEmail.rawProps || []"
          :key="index"
          :label="h.propertyName || getPropertyName(h.propertyTag)"
          :value="h.value"
        />
      </c-card>
    </c-card>
  </div>
</template>
