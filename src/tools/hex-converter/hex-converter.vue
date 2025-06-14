<script setup lang="ts">
import hexArray from 'hex-array';
import { packArray, packString, unpackArray, unpackString } from 'byte-data';
import JSON5 from 'json5';
import { type Conversion, cleanHex, decodeNumber, decodeStruct, encodeStruct } from './hex-converter.service';
import { useValidation } from '@/composable/validation';

const { t } = useI18n();

const mode = ref<'simple' | 'struct'>('simple');

const bits = ref(32);
const floatingPoint = ref(false);
const signed = ref(false);
const bigEndian = ref(false);
const decodeAs = ref<'dec' | 'bin' | 'hexa' | 'char' | 'utf8'>('dec');

const uppercase = ref(false);
const grouping = ref(1);
const rowlength = ref(0);

const hexInput = ref('');
const decodedOutput = computed(() => {
  try {
    const buffer = hexArray.fromString(cleanHex(hexInput.value));
    if (decodeAs.value === 'utf8') {
      return unpackString(buffer);
    }
    else {
      return unpackArray(buffer, {
        bits: bits.value,
        fp: floatingPoint.value,
        signed: signed.value,
        be: bigEndian.value,
      }, 0, buffer.length, true).map(n => decodeNumber(n, bits.value, decodeAs.value as Conversion)).join(' ');
    }
  }
  catch (e: any) {
    return e.toString();
  }
});
const numberInput = ref('');
const encodedOutput = computed(() => {
  try {
    const values = numberInput.value.split(/\s+/).map(Number);
    return hexArray.toString(
      new Uint8Array(
        packArray(values, {
          bits: bits.value,
          fp: floatingPoint.value,
          signed: signed.value,
          be: bigEndian.value,
        })),
      {
        uppercase: uppercase.value,
        grouping: grouping.value,
        rowlength: rowlength.value,
      },
    );
  }
  catch (e: any) {
    return e.toString();
  }
});

const stringInput = ref('');
const utf8Output = computed(() => {
  try {
    return hexArray.toString(
      new Uint8Array(packString(stringInput.value)),
      {
        uppercase: uppercase.value,
        grouping: grouping.value,
        rowlength: rowlength.value,
      },
    );
  }
  catch (e: any) {
    return e.toString();
  }
});

const structDefinition = ref(`{
  x: "int32",
  y: "int32",
}`);
const structDefinitionValidation = useValidation({
  source: structDefinition,
  rules: [
    {
      message: t('tools.hex-converter.struct_definition_not_valid_json'),
      validator: value => JSON5.parse(value.trim()),
    },
  ],
});
const hexStructInput = ref('');
const decodedStructOutput = computed(() => {
  try {
    return JSON.stringify(
      decodeStruct({
        struct: JSON5.parse(structDefinition.value),
        hexArray: hexArray.fromString(cleanHex(hexStructInput.value)),
      }),
      null, 2);
  }
  catch (e: any) {
    return e.toString();
  }
});

const jsonStructInput = ref('');
const encodedStructOutput = computed(() => {
  try {
    return hexArray.toString(
      encodeStruct({
        struct: JSON5.parse(structDefinition.value),
        jsonObject: JSON5.parse(jsonStructInput.value),
      }), {
        uppercase: uppercase.value,
        grouping: grouping.value,
        rowlength: rowlength.value,
      });
  }
  catch (e: any) {
    return e.toString();
  }
});
</script>

<template>
  <div>
    <n-radio-group v-model:value="mode" name="radiogroup" mb-2 flex justify-center>
      <n-space>
        <n-radio
          value="simple"
          :label="t('tools.hex-converter.simple_encoder_decoder')"
        />
        <n-radio
          value="struct"
          :label="t('tools.hex-converter.cpp_typed_struct')"
        />
      </n-space>
    </n-radio-group>

    <div v-if="mode === 'simple'">
      <c-card :title="t('tools.hex-converter.hex_options')" mb-1>
        <c-select
          v-model:value="decodeAs"
          :label="t('tools.hex-converter.decode_encode_as')"
          label-position="left" mb-1
          :options="[{ value: 'dec', label: t('tools.hex-converter.decimal') }, { value: 'bin', label: t('tools.hex-converter.binary') }, { value: 'hex', label: t('tools.hex-converter.hexadecimal') }, { value: 'char', label: t('tools.hex-converter.char_ascii') }, { value: 'utf8', label: t('tools.hex-converter.utf8_string') }]"
        />
        <n-space v-if="decodeAs !== 'utf8'" align="baseline" justify="center">
          <n-form-item :label="t('tools.hex-converter.bits')" label-placement="left">
            <n-input-number v-model:value="bits" :min="1" style="width: 6em" />
          </n-form-item>
          <n-form-item>
            <n-checkbox v-model:checked="floatingPoint">
              {{ t('tools.hex-converter.floating_point') }}
            </n-checkbox>
          </n-form-item>
          <n-form-item>
            <n-checkbox v-model:checked="signed">
              {{ t('tools.hex-converter.signed') }}
            </n-checkbox>
          </n-form-item>
          <n-form-item>
            <n-checkbox v-model:checked="bigEndian">
              {{ t('tools.hex-converter.big_endian') }}
            </n-checkbox>
          </n-form-item>
        </n-space>
      </c-card>
      <c-card :title="t('tools.hex-converter.hex_data_decoder')" mb-3>
        <c-input-text
          v-model:value="hexInput"
          multiline
          :placeholder="t('tools.hex-converter.put_your_hex_data_here')"
          rows="2"
          :label="t('tools.hex-converter.hex_data_to_decode')"
          raw-text
          mb-5
        />

        <n-form-item :label="t('tools.hex-converter.your_decoded_values')">
          <textarea-copyable :value="decodedOutput" />
        </n-form-item>
      </c-card>
      <c-card v-if="decodeAs !== 'utf8'" :title="t('tools.hex-converter.hex_data_encoder')" mt-3>
        <c-input-text
          v-model:value="numberInput"
          multiline
          :placeholder="t('tools.hex-converter.put_your_numbers_array_here')"
          rows="2"
          :label="t('tools.hex-converter.numbers_array_to_encode')"
          raw-text
          mb-5
        />

        <n-form-item :label="t('tools.hex-converter.your_encoded_numbers_array_as_hex')">
          <textarea-copyable :value="encodedOutput" />
        </n-form-item>
      </c-card>
      <c-card v-if="decodeAs === 'utf8'" :title="t('tools.hex-converter.hex_utf8_string_encoder')" mt-3>
        <c-input-text
          v-model:value="stringInput"
          multiline
          :placeholder="t('tools.hex-converter.put_your_text_here')"
          rows="5"
          :label="t('tools.hex-converter.string_to_encode')"
          raw-text
          mb-5
        />

        <n-form-item :label="t('tools.hex-converter.your_encoded_string_as_utf8_hex')">
          <textarea-copyable :value="utf8Output" />
        </n-form-item>
      </c-card>
      <c-card :title="t('tools.hex-converter.hex_encoding_output')" mt-1>
        <n-space align="baseline" justify="center">
          <n-form-item :label="t('tools.hex-converter.uppercase')" label-placement="left">
            <n-switch v-model:value="uppercase" />
          </n-form-item>
          <n-form-item :label="t('tools.hex-converter.group_by')" label-placement="left">
            <n-input-number v-model:value="grouping" :min="0" style="width: 6em" mr-1 /> {{ t('tools.hex-converter.digits_no_grouping') }}
          </n-form-item>
          <n-form-item :label="t('tools.hex-converter.split_as_rows_by')" label-placement="left">
            <n-input-number v-model:value="rowlength" :min="0" style="width: 6em" mr-1 /> {{ t('tools.hex-converter.group_of_digits_no_rows') }}
          </n-form-item>
        </n-space>
      </c-card>
    </div>

    <div v-if="mode === 'struct'">
      <c-card :title="t('tools.hex-converter.struct_definition')">
        <c-input-text
          v-model:value="structDefinition"
          multiline
          :placeholder="t('tools.hex-converter.put_your_struct_definition_here')"
          rows="5"
          :label="t('tools.hex-converter.cpp_like_struct_definition')"
          raw-text
          mb-5
          :validation="structDefinitionValidation"
        />

        <details>
          <summary>{{ t('tools.hex-converter.instructions') }}</summary>
          <n-p>
            {{ t('tools.hex-converter.define_struct_instruction') }}
            <br>
            {{ t('tools.hex-converter.types_syntax') }}
            <br>
            {{ t('tools.hex-converter.where_explanation') }}
            <br>
            {{ t('tools.hex-converter.can_prefix_integer') }}
          </n-p>
        </details>
      </c-card>
      <c-card :title="t('tools.hex-converter.hex_struct_decoder')" m-t-1>
        <c-input-text
          v-model:value="hexStructInput"
          multiline
          :placeholder="t('tools.hex-converter.put_your_hex_data_here')"
          rows="5"
          :label="t('tools.hex-converter.hex_data_to_decode')"
          raw-text
          mb-5
        />

        <n-form-item :label="t('tools.hex-converter.your_decoded_values')">
          <textarea-copyable :value="decodedStructOutput" />
        </n-form-item>
      </c-card>
      <c-card :title="t('tools.hex-converter.hex_struct_encoder')" m-t-1>
        <c-input-text
          v-model:value="jsonStructInput"
          multiline
          :placeholder="t('tools.hex-converter.put_your_struct_to_encode_here')"
          rows="5"
          :label="t('tools.hex-converter.struct_json_to_encode')"
          raw-text
          mb-5
        />

        <n-form-item :label="t('tools.hex-converter.your_encoded_struct_as_hex')">
          <textarea-copyable :value="encodedStructOutput" />
        </n-form-item>
      </c-card>
      <c-card :title="t('tools.hex-converter.hex_encoding_output')" mt-1>
        <n-space align="baseline" justify="center">
          <n-form-item :label="t('tools.hex-converter.uppercase')" label-placement="left">
            <n-switch v-model:value="uppercase" />
          </n-form-item>
          <n-form-item :label="t('tools.hex-converter.group_by')" label-placement="left">
            <n-input-number v-model:value="grouping" :min="0" style="width: 6em" mr-1 /> {{ t('tools.hex-converter.digits_no_grouping') }}
          </n-form-item>
          <n-form-item :label="t('tools.hex-converter.split_as_rows_by')" label-placement="left">
            <n-input-number v-model:value="rowlength" :min="0" style="width: 6em" mr-1 /> {{ t('tools.hex-converter.group_of_digits_no_rows') }}
          </n-form-item>
        </n-space>
      </c-card>
    </div>
  </div>
</template>
