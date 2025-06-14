import { translate } from '@/plugins/i18n.plugin';

export const jwsAlgorithms = [
  { alg: 'HS256', keyDesc: translate('tools.jwt-generator.key-desc.hs256'), key: 'secret', verify: 'HMAC-SHA256' },
  { alg: 'HS384', keyDesc: translate('tools.jwt-generator.key-desc.hs384'), key: 'secret', verify: 'HMAC-SHA384' },
  { alg: 'HS512', keyDesc: translate('tools.jwt-generator.key-desc.hs512'), key: 'secret', verify: 'HMAC-SHA512' },
  { alg: 'ES256', keyDesc: translate('tools.jwt-generator.key-desc.es256'), key: 'keyspair', verify: 'ECDSA-SHA256' },
  { alg: 'ES256K', keyDesc: translate('tools.jwt-generator.key-desc.es256k'), key: 'keyspair', verify: 'ECDSA-SHA256(secp256k1)' },
  { alg: 'ES384', keyDesc: translate('tools.jwt-generator.key-desc.es384'), key: 'keyspair', verify: 'ECDSA-SHA384' },
  { alg: 'ES512', keyDesc: translate('tools.jwt-generator.key-desc.es512'), key: 'keyspair', verify: 'ECDSA-SHA512' },
  { alg: 'PS256', keyDesc: translate('tools.jwt-generator.key-desc.ps256'), key: 'keyspair', verify: 'RSA-PSS-SHA256' },
  { alg: 'PS384', keyDesc: translate('tools.jwt-generator.key-desc.ps384'), key: 'keyspair', verify: 'RSA-PSS-SHA384' },
  { alg: 'PS512', keyDesc: translate('tools.jwt-generator.key-desc.ps512'), key: 'keyspair', verify: 'RSA-PSS-SHA512' },
  { alg: 'RS256', keyDesc: translate('tools.jwt-generator.key-desc.rs256'), key: 'keyspair', verify: 'RSA-SHA256' },
  { alg: 'RS384', keyDesc: translate('tools.jwt-generator.key-desc.rs384'), key: 'keyspair', verify: 'RSA-SHA384' },
  { alg: 'RS512', keyDesc: translate('tools.jwt-generator.key-desc.rs512'), key: 'keyspair', verify: 'RSA-SHA512' },
];
