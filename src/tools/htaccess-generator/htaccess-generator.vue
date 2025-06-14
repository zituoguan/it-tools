<script setup lang="ts">
const { t } = useI18n();

const formData = ref({
  domainName: '',
  redirects: [] as { key: string; value: string }[],
  cacheExtensions: '',
  cacheDuration: 60,
  cacheDurationMultiple: '60',
  cacheType: 'public',
  mustRevalidate: false,
  protectedFile: '',
  htpasswdPath: '',
  referrer: '',
  hotlinkExtensions: '',
  nohotlinkImageHref: '',
  errorPages: [] as { key: string; value: string }[],
  ipRules: [] as { key: string; value: string }[],
  blockBots: false,
  defaultPage: '',
  preventDirectoryListing: false,
  preventViewingHtaccess: true,
});

const htaccessContent = computed(() => {
  let content = '';

  if (formData.value.domainName) {
    content += `Options +FollowSymLinks\nRewriteEngine On\nRewriteCond %{HTTP_HOST} ^${formData.value.domainName}[nc]\nRewriteRule ^(.*)$ https://www.${formData.value.domainName}/$1 [R=301,nc]\n\n`;
  }

  formData.value.redirects.forEach(({ key, value }) => {
    if (!key || !value) {
      return;
    }
    content += `Redirect 301 ${key} ${value}\n`;
  });

  if (formData.value.cacheExtensions) {
    content += `<FilesMatch "\\.(${formData.value.cacheExtensions.split(',').join('|')})$">\nHeader set Cache-Control "${formData.value.cacheType}${(formData.value.mustRevalidate ? ', proxy-revalidate' : '')}, max-age=${formData.value.cacheDuration * Number(formData.value.cacheDurationMultiple)}"\n</FilesMatch>\n\n`;
  }

  if (formData.value.protectedFile && formData.value.htpasswdPath) {
    content += `<Files "${formData.value.protectedFile}">\nAuthType Basic\nAuthName "Restricted"\nAuthUserFile ${formData.value.htpasswdPath}\nRequire valid-user\n</Files>\n\n`;
  }

  if (formData.value.referrer && formData.value.hotlinkExtensions) {
    content += `RewriteCond %{HTTP_REFERER} !^$\nRewriteCond %{HTTP_REFERER} !^https?://(www\.)?${formData.value.referrer}/.*$ [NC]\nRewriteRule \\.(${formData.value.hotlinkExtensions.split(',').join('|')})$ ${formData.value.nohotlinkImageHref}[R=302,L]\n\n`;
  }

  formData.value.errorPages.forEach(({ key, value }) => {
    if (!key || !value) {
      return;
    }
    content += `ErrorDocument ${key} ${value}\n`;
  });

  formData.value.ipRules.forEach(({ key, value }) => {
    if (!key || !value) {
      return;
    }
    content += `${key === 'Block' ? 'Deny' : 'Allow'} from ${value}\n`;
  });

  if (formData.value.blockBots) {
    content += `//Block bad bots
RewriteEngine On 
RewriteCond %{HTTP_USER_AGENT} ^BlackWidow [OR]
RewriteCond %{HTTP_USER_AGENT} ^Bot\\ mailto:craftbot@yahoo.com [OR]
RewriteCond %{HTTP_USER_AGENT} ^ChinaClaw [OR]
RewriteCond %{HTTP_USER_AGENT} ^Custo [OR]
RewriteCond %{HTTP_USER_AGENT} ^DISCo [OR]
RewriteCond %{HTTP_USER_AGENT} ^Download\\ Demon [OR]
RewriteCond %{HTTP_USER_AGENT} ^eCatch [OR]
RewriteCond %{HTTP_USER_AGENT} ^EirGrabber [OR]
RewriteCond %{HTTP_USER_AGENT} ^EmailSiphon [OR]
RewriteCond %{HTTP_USER_AGENT} ^EmailWolf [OR]
RewriteCond %{HTTP_USER_AGENT} ^Express\\ WebPictures [OR]
RewriteCond %{HTTP_USER_AGENT} ^ExtractorPro [OR]
RewriteCond %{HTTP_USER_AGENT} ^EyeNetIE [OR]
RewriteCond %{HTTP_USER_AGENT} ^FlashGet [OR]
RewriteCond %{HTTP_USER_AGENT} ^GetRight [OR]
RewriteCond %{HTTP_USER_AGENT} ^GetWeb! [OR]
RewriteCond %{HTTP_USER_AGENT} ^Go!Zilla [OR]
RewriteCond %{HTTP_USER_AGENT} ^Go-Ahead-Got-It [OR]
RewriteCond %{HTTP_USER_AGENT} ^GrabNet [OR]
RewriteCond %{HTTP_USER_AGENT} ^Grafula [OR]
RewriteCond %{HTTP_USER_AGENT} ^HMView [OR]
RewriteCond %{HTTP_USER_AGENT} HTTrack [NC,OR]
RewriteCond %{HTTP_USER_AGENT} ^Image\\ Stripper [OR]
RewriteCond %{HTTP_USER_AGENT} ^Image\\ Sucker [OR]
RewriteCond %{HTTP_USER_AGENT} Indy\\ Library [NC,OR]
RewriteCond %{HTTP_USER_AGENT} ^InterGET [OR]
RewriteCond %{HTTP_USER_AGENT} ^Internet\\ Ninja [OR]
RewriteCond %{HTTP_USER_AGENT} ^JetCar [OR]
RewriteCond %{HTTP_USER_AGENT} ^JOC\\ Web\\ Spider [OR]
RewriteCond %{HTTP_USER_AGENT} ^larbin [OR]
RewriteCond %{HTTP_USER_AGENT} ^LeechFTP [OR]
RewriteCond %{HTTP_USER_AGENT} ^Mass\\ Downloader [OR]
RewriteCond %{HTTP_USER_AGENT} ^MIDown\\ tool [OR]
RewriteCond %{HTTP_USER_AGENT} ^Mister\\ PiX [OR]
RewriteCond %{HTTP_USER_AGENT} ^Navroad [OR]
RewriteCond %{HTTP_USER_AGENT} ^NearSite [OR]
RewriteCond %{HTTP_USER_AGENT} ^NetAnts [OR]
RewriteCond %{HTTP_USER_AGENT} ^NetSpider [OR]
RewriteCond %{HTTP_USER_AGENT} ^Net\\ Vampire [OR]
RewriteCond %{HTTP_USER_AGENT} ^NetZIP [OR]
RewriteCond %{HTTP_USER_AGENT} ^Octopus [OR]
RewriteCond %{HTTP_USER_AGENT} ^Offline\\ Explorer [OR]
RewriteCond %{HTTP_USER_AGENT} ^Offline\\ Navigator [OR]
RewriteCond %{HTTP_USER_AGENT} ^PageGrabber [OR]
RewriteCond %{HTTP_USER_AGENT} ^Papa\\ Foto [OR]
RewriteCond %{HTTP_USER_AGENT} ^pavuk [OR]
RewriteCond %{HTTP_USER_AGENT} ^pcBrowser [OR]
RewriteCond %{HTTP_USER_AGENT} ^RealDownload [OR]
RewriteCond %{HTTP_USER_AGENT} ^ReGet [OR]
RewriteCond %{HTTP_USER_AGENT} ^SiteSnagger [OR]
RewriteCond %{HTTP_USER_AGENT} ^SmartDownload [OR]
RewriteCond %{HTTP_USER_AGENT} ^SuperBot [OR]
RewriteCond %{HTTP_USER_AGENT} ^SuperHTTP [OR]
RewriteCond %{HTTP_USER_AGENT} ^Surfbot [OR]
RewriteCond %{HTTP_USER_AGENT} ^tAkeOut [OR]
RewriteCond %{HTTP_USER_AGENT} ^Teleport\\ Pro [OR]
RewriteCond %{HTTP_USER_AGENT} ^VoidEYE [OR]
RewriteCond %{HTTP_USER_AGENT} ^Web\\ Image\\ Collector [OR]
RewriteCond %{HTTP_USER_AGENT} ^Web\\ Sucker [OR]
RewriteCond %{HTTP_USER_AGENT} ^WebAuto [OR]
RewriteCond %{HTTP_USER_AGENT} ^WebCopier [OR]
RewriteCond %{HTTP_USER_AGENT} ^WebFetch [OR]
RewriteCond %{HTTP_USER_AGENT} ^WebGo\\ IS [OR]
RewriteCond %{HTTP_USER_AGENT} ^WebLeacher [OR]
RewriteCond %{HTTP_USER_AGENT} ^WebReaper [OR]
RewriteCond %{HTTP_USER_AGENT} ^WebSauger [OR]
RewriteCond %{HTTP_USER_AGENT} ^Website\\ eXtractor [OR]
RewriteCond %{HTTP_USER_AGENT} ^Website\\ Quester [OR]
RewriteCond %{HTTP_USER_AGENT} ^WebStripper [OR]
RewriteCond %{HTTP_USER_AGENT} ^WebWhacker [OR]
RewriteCond %{HTTP_USER_AGENT} ^WebZIP [OR]
RewriteCond %{HTTP_USER_AGENT} ^Wget [OR]
RewriteCond %{HTTP_USER_AGENT} ^Widow [OR]
RewriteCond %{HTTP_USER_AGENT} ^WWWOFFLE [OR]
RewriteCond %{HTTP_USER_AGENT} ^Xaldon\\ WebSpider [OR]
RewriteCond %{HTTP_USER_AGENT} ^Zeus
RewriteRule ^.* - [F,L]\n\n`;
  }

  if (formData.value.defaultPage) {
    content += `DirectoryIndex ${formData.value.defaultPage}\n\n`;
  }

  if (formData.value.preventDirectoryListing) {
    content += 'Options All -Indexes\n\n';
  }

  if (formData.value.preventViewingHtaccess) {
    content += `<Files .htaccess>
order allow,deny
deny from all
</Files>\n\n`;
  }

  return content;
});

function onCreateIpRule() {
  return {
    key: 'Allow',
    value: '',
  };
}
</script>

<template>
  <NCard :title="t('tools.htaccess-generator.htaccess_generator')">
    <NForm :model="formData" label-placement="left">
      <c-card :title="t('tools.htaccess-generator.rewrite_to_www')" mb-1>
        <NFormItem :label="t('tools.htaccess-generator.domain_name')">
          <NInput v-model:value="formData.domainName" :placeholder="t('tools.htaccess-generator.domain_name_placeholder')" />
        </NFormItem>
      </c-card>

      <c-card :title="t('tools.htaccess-generator.redirect_301_file_or_directory')" mb-1>
        <NDynamicInput
          v-model:value="formData.redirects"
          preset="pair"
          :key-placeholder="t('tools.htaccess-generator.old_path')"
          :value-placeholder="t('tools.htaccess-generator.new_path')"
        />
      </c-card>

      <c-card :title="t('tools.htaccess-generator.cache_settings')" mb-1>
        <NFormItem :label="t('tools.htaccess-generator.cache_extensions')">
          <NInput v-model:value="formData.cacheExtensions" :placeholder="t('tools.htaccess-generator.cache_extensions_placeholder')" />
        </NFormItem>
        <NFormItem :label="t('tools.htaccess-generator.cache_duration')">
          <NInputNumber v-model:value="formData.cacheDuration" mr-1 />
          <NSelect
            v-model:value="formData.cacheDurationMultiple"
            :options="[
              { label: t('tools.htaccess-generator.seconds'), value: '1' },
              { label: t('tools.htaccess-generator.minutes'), value: '60' },
              { label: t('tools.htaccess-generator.hours'), value: '3600' },
              { label: t('tools.htaccess-generator.days'), value: '86400' },
              { label: t('tools.htaccess-generator.weeks'), value: '36288000' },
              { label: t('tools.htaccess-generator.months'), value: '160704000' },
            ]"
          />
        </NFormItem>
        <NFormItem :label="t('tools.htaccess-generator.cache_type')">
          <NSelect
            v-model:value="formData.cacheType"
            :options="[
              { label: t('tools.htaccess-generator.public'), value: 'public' },
              { label: t('tools.htaccess-generator.private'), value: 'private' },
            ]"
          />
        </NFormItem>
        <NFormItem :label="t('tools.htaccess-generator.must_revalidate')">
          <NSwitch v-model:value="formData.mustRevalidate" />
        </NFormItem>
      </c-card>

      <c-card :title="t('tools.htaccess-generator.password_protection')" mb-1>
        <NFormItem :label="t('tools.htaccess-generator.path_to_protect')">
          <NInput v-model:value="formData.protectedFile" label-position="left" :placeholder="t('tools.htaccess-generator.path_to_protect_placeholder')" />
        </NFormItem>
        <NFormItem :label="t('tools.htaccess-generator.htpasswd_file_path')">
          <NInput v-model:value="formData.htpasswdPath" label-position="left" :placeholder="t('tools.htaccess-generator.htpasswd_file_path_placeholder')" />
        </NFormItem>
      </c-card>

      <c-card :title="t('tools.htaccess-generator.prevent_hotlinking')" mb-1>
        <NFormItem :label="t('tools.htaccess-generator.referring_url')">
          <NInput v-model:value="formData.referrer" :placeholder="t('tools.htaccess-generator.referring_url_placeholder')" />
        </NFormItem>
        <NFormItem :label="t('tools.htaccess-generator.file_extension')">
          <NInput v-model:value="formData.hotlinkExtensions" :placeholder="t('tools.htaccess-generator.file_extension_placeholder')" />
        </NFormItem>
        <NFormItem :label="t('tools.htaccess-generator.no_hotlinking_image')">
          <NInput v-model:value="formData.nohotlinkImageHref" :placeholder="t('tools.htaccess-generator.no_hotlinking_image_placeholder')" />
        </NFormItem>
      </c-card>

      <c-card :title="t('tools.htaccess-generator.custom_error_pages')" mb-1>
        <NDynamicInput
          v-model:value="formData.errorPages"
          preset="pair"
          :key-placeholder="t('tools.htaccess-generator.error_code')"
          :value-placeholder="t('tools.htaccess-generator.file_path')"
        />
      </c-card>

      <c-card :title="t('tools.htaccess-generator.block_or_allow_ip_addresses')" mb-1>
        <NDynamicInput v-model:value="formData.ipRules" preset="pair" :on-create="onCreateIpRule">
          <template #default="{ value }">
            <div style="display: flex; align-items: center; width: 100%">
              <n-select
                v-model:value="value.key"
                :options="[
                  { label: t('tools.htaccess-generator.allow'), value: 'Allow' },
                  { label: t('tools.htaccess-generator.block'), value: 'Block' },
                ]"
                :placeholder="t('tools.htaccess-generator.select_authorization')"
                style="width: 150px"
                mr-2
              />
              <n-input
                v-model:value="value.value"
                :placeholder="t('tools.htaccess-generator.ip_address')"
              />
            </div>
          </template>
        </NDynamicInput>
      </c-card>

      <c-card :title="t('tools.htaccess-generator.directory_settings')">
        <NFormItem :label="t('tools.htaccess-generator.default_directory_page')">
          <NInput v-model:value="formData.defaultPage" :placeholder="t('tools.htaccess-generator.default_directory_page_placeholder')" />
        </NFormItem>
        <NFormItem :label="t('tools.htaccess-generator.prevent_directory_listing')">
          <NSwitch v-model:value="formData.preventDirectoryListing" />
        </NFormItem>
      </c-card>

      <c-card :title="t('tools.htaccess-generator.other_settings')">
        <NFormItem :label="t('tools.htaccess-generator.block_bots')">
          <NSwitch v-model:value="formData.blockBots" />
        </NFormItem>

        <NFormItem :label="t('tools.htaccess-generator.prevent_viewing_htaccess_file')">
          <NSwitch v-model:value="formData.preventViewingHtaccess" />
        </NFormItem>
      </c-card>
    </NForm>

    <c-card :title="t('tools.htaccess-generator.generated_htaccess_file')" mt-2>
      <textarea-copyable :value="htaccessContent" />
    </c-card>
  </NCard>
</template>
