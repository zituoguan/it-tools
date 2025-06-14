<script setup lang="ts">
import { apcaContrastValue, hex, wcag, wcagContrastValue } from 'a11y-color-contrast';
import { useQueryParam } from '@/composable/queryParams';

const { t } = useI18n();

const forecolor = useQueryParam({ name: 'fg', defaultValue: '#000' });
const backcolor = useQueryParam({ name: 'bg', defaultValue: '#fff' });

const levels = [
  { score: 3, text: t('tools.color-contrast-checker.veryPoor'), bg: '#fbd0da', fg: '#5f071c', stars: 1 },
  { score: 4.5, text: t('tools.color-contrast-checker.poor'), bg: '#fbd0da', fg: '#5f071c', stars: 2 },
  { score: 7, text: t('tools.color-contrast-checker.good'), bg: '#fbf5d0', fg: '#5f5207', stars: 3 },
  { score: 12, text: t('tools.color-contrast-checker.veryGood'), bg: '#d2fbd0', fg: '#0d5f07', stars: 4 },
  { score: 9999, text: t('tools.color-contrast-checker.super'), bg: '#d2fbd0', fg: '#0d5f07', stars: 5 },
];
const smallLevels = [
  { score: 4.5, bg: '#fbd0da', fg: '#5f071c', stars: 1 },
  { score: 7, bg: '#fbf5d0', fg: '#5f5207', stars: 2 },
  { score: 9999, bg: '#d2fbd0', fg: '#0d5f07', stars: 3 },
];
const largeLevels = [
  { score: 3, bg: '#fbd0da', fg: '#5f071c', stars: 1 },
  { score: 4.5, bg: '#fbf5d0', fg: '#5f5207', stars: 2 },
  { score: 9999, bg: '#d2fbd0', fg: '#0d5f07', stars: 3 },
];

const result = computed(() => {
  try {
    const fgHex = hex(forecolor.value);
    const bgHex = hex(backcolor.value);

    const wcagLevel = wcagContrastValue(bgHex, fgHex);
    return {
      wcag21ConstrastValue: wcagLevel,
      aaNormal: wcag(bgHex, fgHex, { level: 'AA', size: 'normal' }).pass,
      aaaNormal: wcag(bgHex, fgHex, { level: 'AAA', size: 'normal' }).pass,
      aaLarge: wcag(bgHex, fgHex, { level: 'AA', size: 'large' }).pass,
      aaaLarge: wcag(bgHex, fgHex, { level: 'AAA', size: 'large' }).pass,
      level: levels.find(l => wcagLevel < l.score),
      largeLevel: largeLevels.find(l => wcagLevel < l.score),
      smallLevel: smallLevels.find(l => wcagLevel < l.score),
      apcaContrastValue: apcaContrastValue(bgHex, fgHex),
      error: '',
    };
  }
  catch (e: any) {
    return {
      error: e.toString(),
    };
  }
});
</script>

<template>
  <div max-w-600px>
    <n-form-item
      :label="t('tools.color-contrast-checker.forecolor')"
      label-placement="left"
      mb-1
    >
      <n-color-picker
        v-model:value="forecolor"
        :modes="['hex']"
        :show-alpha="false"
      />
    </n-form-item>
    <n-form-item
      :label="t('tools.color-contrast-checker.backcolor')"
      label-placement="left"
      mb-1
    >
      <n-color-picker
        v-model:value="backcolor"
        :modes="['hex']"
        :show-alpha="false"
      />
    </n-form-item>

    <n-divider />

    <c-alert v-if="result.error">
      {{ result.error }}
    </c-alert>

    <c-card v-if="!result.error" :title="t('tools.color-contrast-checker.wcag21Title')">
      <input-copyable readonly :label="t('tools.color-contrast-checker.wcagContrastLabel')" label-width="130px" label-position="left" :value="result.wcag21ConstrastValue" mb-3 />

      <n-form-item v-if="result.level" :label="t('tools.color-contrast-checker.contrastQualityLabel')" label-width="130px" label-placement="left">
        <n-tag :max="5" :color="{ color: result.level.bg, textColor: result.level.fg, borderColor: result.level.fg }" mr-2>
          <span>{{ result.wcag21ConstrastValue.toFixed(2) }} - {{ result.level.text }}</span>
        </n-tag>
        <n-tag :max="5" :color="{ color: result.level.bg, textColor: result.level.fg, borderColor: result.level.fg }">
          <n-rate :count="5" readonly :default-value="result.level.stars" :color="result.level.fg" />
        </n-tag>
      </n-form-item>
      <n-form-item v-if="result.smallLevel" :label="t('tools.color-contrast-checker.smallTextsLabel')" label-width="130px" label-placement="left">
        <n-tag :color="{ color: result.smallLevel.bg, textColor: result.smallLevel.fg, borderColor: result.smallLevel.fg }">
          <n-rate :count="3" readonly :default-value="result.smallLevel.stars" :color="result.smallLevel.fg" />
        </n-tag>
      </n-form-item>
      <n-form-item v-if="result.largeLevel" :label="t('tools.color-contrast-checker.largeTextsLabel')" label-width="130px" label-placement="left">
        <n-tag :color="{ color: result.largeLevel.bg, textColor: result.largeLevel.fg, borderColor: result.largeLevel.fg }">
          <n-rate :count="3" readonly :default-value="result.largeLevel.stars" :color="result.largeLevel.fg" />
        </n-tag>
      </n-form-item>

      <c-card :title="t('tools.color-contrast-checker.normalTextTitle')">
        <n-form-item :label="t('tools.color-contrast-checker.wcag21AALabel')" label-width="130px" label-placement="left">
          <n-tag :bordered="false" :type="result.aaNormal ? 'success' : 'error'">
            {{ result.aaNormal ? t('tools.color-contrast-checker.pass') : t('tools.color-contrast-checker.fail') }}
          </n-tag>
        </n-form-item>
        <n-form-item :label="t('tools.color-contrast-checker.wcag21AAALabel')" label-width="130px" label-placement="left">
          <n-tag :bordered="false" :type="result.aaaNormal ? 'success' : 'error'">
            {{ result.aaaNormal ? t('tools.color-contrast-checker.pass') : t('tools.color-contrast-checker.fail') }}
          </n-tag>
        </n-form-item>
      </c-card>
      <c-card :title="t('tools.color-contrast-checker.largeTextTitle')">
        <n-p><i>{{ t('tools.color-contrast-checker.largeTextDescription') }}</i></n-p>
        <n-form-item :label="t('tools.color-contrast-checker.wcag21AALabel')" label-width="130px" label-placement="left">
          <n-tag :bordered="false" :type="result.aaLarge ? 'success' : 'error'">
            {{ result.aaLarge ? t('tools.color-contrast-checker.pass') : t('tools.color-contrast-checker.fail') }}
          </n-tag>
        </n-form-item>
        <n-form-item :label="t('tools.color-contrast-checker.wcag21AAALabel')" label-width="130px" label-placement="left">
          <n-tag :bordered="false" :type="result.aaaLarge ? 'success' : 'error'">
            {{ result.aaaLarge ? t('tools.color-contrast-checker.pass') : t('tools.color-contrast-checker.fail') }}
          </n-tag>
        </n-form-item>
      </c-card>
    </c-card>

    <c-card v-if="!result.error" :title="t('tools.color-contrast-checker.apcaTitle')">
      <input-copyable readonly :label="t('tools.color-contrast-checker.apcaContrastLabel')" label-width="130px" label-position="left" :value="result.apcaContrastValue" mb-2 />
    </c-card>
  </div>
</template>
