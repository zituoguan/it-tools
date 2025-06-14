<script setup lang="ts">
import type { CKeyValueListItems } from '@/ui/c-key-value-list/c-key-value-list.types';

const { t } = useI18n();

const ip = ref('8.8.8.8');
const errorMessage = ref('');

const fields: Array<{ field: string; name: string }> = [
  { field: 'ip', name: t('tools.ip-geo-location.ip') },
  { field: 'hostname', name: t('tools.ip-geo-location.hostName') },
  { field: 'country', name: t('tools.ip-geo-location.countryCode') },
  { field: 'region', name: t('tools.ip-geo-location.regionStateCode') },
  { field: 'city', name: t('tools.ip-geo-location.city') },
  { field: 'postal', name: t('tools.ip-geo-location.postalCode') },
  { field: 'loc', name: t('tools.ip-geo-location.latitudeLongitude') },
  { field: 'timezone', name: t('tools.ip-geo-location.timezone') },
  { field: 'org', name: t('tools.ip-geo-location.organizationName') },
];

const geoInfos = ref<CKeyValueListItems>([]);
const geoInfosData = ref<{
  loc?: string
}>({});
const status = ref<'pending' | 'error' | 'success'>('pending');
const token = useStorage('ip-geoloc:token', '');

const openStreetMapUrl = computed(
  () => {
    const [gpsLatitude, gpsLongitude] = geoInfosData.value.loc?.split(',') || [];
    return gpsLatitude && gpsLongitude ? `https://www.openstreetmap.org/?mlat=${gpsLatitude}&mlon=${gpsLongitude}#map=18/${gpsLatitude}/${gpsLongitude}` : undefined;
  },
);

async function onGetInfos() {
  try {
    status.value = 'pending';

    const geoInfoQueryResponse = await fetch(
      token.value !== ''
        ? `//ipinfo.io/${ip.value}/json?token=${token.value}`
        : `//ipinfo.io/${ip.value}/json`);
    if (!geoInfoQueryResponse.ok) {
      throw geoInfoQueryResponse.statusText;
    }

    const data = await geoInfoQueryResponse.json();

    const allGeoInfos = [];
    for (const field of fields) {
      if (data[field.field]) {
        allGeoInfos.push({
          label: field.name,
          value: data[field.field],
        });
      }
    }

    status.value = 'success';
    geoInfos.value = allGeoInfos;
    geoInfosData.value = data;
  }
  catch (e: any) {
    errorMessage.value = e.toString();
    status.value = 'error';
    return [];
  }
}
</script>

<template>
  <div>
    <div flex items-center gap-2>
      <c-input-text
        v-model:value="ip"
        :placeholder="t('tools.ip-geo-location.enterIPv4v6')"
        @update:value="() => { status = 'pending' }"
      />
      <c-button align-center @click="onGetInfos">
        {{ t('tools.ip-geo-location.getGeoLocationInfos') }}
      </c-button>
    </div>

    <details mt-2>
      <summary>{{ t('tools.ip-geo-location.optionalToken') }}</summary>
      <c-input-text
        v-model:value="token"
        :placeholder="t('tools.ip-geo-location.optionalTokenPlaceholder')"
        @update:value="() => { status = 'pending' }"
      />
      <n-p>
        <n-a href="https://ipinfo.io/">
          {{ t('tools.ip-geo-location.signupFreeToken') }}
        </n-a>
      </n-p>
    </details>

    <n-divider />

    <c-card v-if="status === 'pending'" mt-5>
      {{ t('tools.ip-geo-location.clickButtonMessage') }}
    </c-card>

    <c-card v-if="status === 'success' && openStreetMapUrl" mt-4>
      <c-button :href="openStreetMapUrl" target="_blank">
        {{ t('tools.ip-geo-location.localizeOnMap') }}
      </c-button>
    </c-card>

    <c-card v-if="status === 'success'" mt-5>
      <c-key-value-list :items="geoInfos" />
    </c-card>

    <n-alert v-if="status === 'error'" :title="t('tools.ip-geo-location.errorsOccurred')" type="error" mt-5>
      {{ errorMessage }}
    </n-alert>
  </div>
</template>
