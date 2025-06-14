import type {
  AlgorithmHashType,
  Certificate,
  Fingerprint,
  Key,
  PrivateKey, Signature,
} from 'sshpk';
import 'webcrypto-liner-shim';
import type * as openpgp from 'openpgp';
import * as forge from 'node-forge';
import oids from './oids.json';
import { translate } from '@/plugins/i18n.plugin';

export interface LabelValue {
  label: string
  value: string
  multiline?: boolean
}

function onErrorReturnErrorMessage(func: () => any) {
  try {
    return func();
  }
  catch (e: any) {
    return e.toString();
  }
}

function buf2Hex(buffer: ArrayBuffer) { // buffer is an ArrayBuffer
  return [...new Uint8Array(buffer)]
    .map(x => x.toString(16).padStart(2, '0'))
    .join('');
}

export function getPublicKeyLabelValues(publicKey: Key) {
  return [
    {
      label: translate('tools.certificate-key-parser.type'),
      value: translate('tools.certificate-key-parser.publicKey'),
    },
    {
      label: translate('tools.certificate-key-parser.keyType'),
      value: publicKey.type,
    },
    {
      label: translate('tools.certificate-key-parser.size'),
      value: publicKey.size,
    },
    {
      label: translate('tools.certificate-key-parser.comment'),
      value: publicKey.comment,
      multiline: true,
    },
    {
      label: translate('tools.certificate-key-parser.curve'),
      value: publicKey.curve ?? translate('tools.certificate-key-parser.none'),
    },
    {
      label: translate('tools.certificate-key-parser.fingerprintSha256'),
      value: onErrorReturnErrorMessage(() => publicKey.fingerprint('sha256')),
      multiline: true,
    },
    {
      label: translate('tools.certificate-key-parser.fingerprintSha512'),
      value: onErrorReturnErrorMessage(() => publicKey.fingerprint('sha512')),
      multiline: true,
    },
    {
      label: translate('tools.certificate-key-parser.keyPem'),
      value: onErrorReturnErrorMessage(() => publicKey.toString('pem')),
      multiline: true,
    },
  ] as LabelValue[];
}

export function getPrivateKeyLabelValues(privateKey: PrivateKey) {
  return [
    {
      label: translate('tools.certificate-key-parser.type'),
      value: translate('tools.certificate-key-parser.privateKey'),
    },
    {
      label: translate('tools.certificate-key-parser.keyType'),
      value: privateKey.type,
    },
    {
      label: translate('tools.certificate-key-parser.size'),
      value: privateKey.size,
    },
    {
      label: translate('tools.certificate-key-parser.comment'),
      value: privateKey.comment,
      multiline: true,
    },
    {
      label: translate('tools.certificate-key-parser.curve'),
      value: privateKey.curve,
    },
    {
      label: translate('tools.certificate-key-parser.fingerprintSha256'),
      value: onErrorReturnErrorMessage(() => privateKey.fingerprint('sha256')),
      multiline: true,
    },
    {
      label: translate('tools.certificate-key-parser.fingerprintSha512'),
      value: onErrorReturnErrorMessage(() => privateKey.fingerprint('sha512')),
      multiline: true,
    },
    {
      label: translate('tools.certificate-key-parser.keyPem'),
      value: onErrorReturnErrorMessage(() => privateKey.toString('pem')),
      multiline: true,
    },
  ] as LabelValue[];
}

export function getCertificateLabelValues(cert: Certificate, forgeCertificate: forge.pki.Certificate | null) {
  return [
    {
      label: translate('tools.certificate-key-parser.type'),
      value: translate('tools.certificate-key-parser.certificate'),
    },
    {
      label: translate('tools.certificate-key-parser.subjects'),
      value: cert.subjects?.map(s => s.toString()).join('\n'),
      multiline: true,
    },
    {
      label: translate('tools.certificate-key-parser.validFrom'),
      value: cert.validFrom.toISOString(),
    },
    {
      label: translate('tools.certificate-key-parser.validUntil'),
      value: cert.validUntil.toISOString(),
    },
    {
      label: translate('tools.certificate-key-parser.issuer'),
      value: cert.issuer.toString(),
      multiline: true,
    },
    {
      label: translate('tools.certificate-key-parser.subjectKey'),
      value: onErrorReturnErrorMessage(() => cert.subjectKey?.toString('ssh')),
      multiline: true,
    },
    {
      label: translate('tools.certificate-key-parser.subjectKeyType'),
      value: cert.subjectKey?.type,
    },
    {
      label: translate('tools.certificate-key-parser.subjectSize'),
      value: cert.subjectKey?.size,
    },
    {
      label: translate('tools.certificate-key-parser.subjectComment'),
      value: cert.subjectKey?.comment,
      multiline: true,
    },
    {
      label: translate('tools.certificate-key-parser.subjectCurve'),
      value: cert.subjectKey?.curve ?? translate('tools.certificate-key-parser.none'),
    },
    {
      label: translate('tools.certificate-key-parser.issuerKey'),
      value: onErrorReturnErrorMessage(() => cert.issuerKey?.toString('ssh')),
      multiline: true,
    },
    {
      label: translate('tools.certificate-key-parser.serial'),
      value: buf2Hex(cert.serial),
    },
    {
      label: translate('tools.certificate-key-parser.purposes'),
      value: cert.purposes?.join(', '),
    },
    {
      label: translate('tools.certificate-key-parser.extensionsParsed'),
      value: JSON.stringify(cert.getExtensions().map(ext => ({
        oid: (<any>ext).oid,
        name: (<any>ext).name || (<any>oids)[(<any>ext).oid],
        critical: (<any>ext).critical,
        data: ext.data?.toString('hex') || (<any>ext).bits?.toString('hex'),
      })), null, 2),
      multiline: true,
    },
    {
      label: translate('tools.certificate-key-parser.extensionsRaw'),
      value: JSON.stringify(forgeCertificate?.extensions.map(ext => ({
        id: (<any>ext).id,
        name: (<any>ext).id || (<any>oids)[(<any>ext).id],
        ...ext,
      })), null, 2),
      multiline: true,
    },
    ...['sha1', 'sha256', 'sha512'].flatMap(algorithm =>
      [

        {
          label: translate('tools.certificate-key-parser.fingerprintAlgorithm', { algorithm }),
          value: onErrorReturnErrorMessage(() => cert.fingerprint(algorithm as AlgorithmHashType)),
          multiline: true,
        },
        {
          label: translate('tools.certificate-key-parser.fingerprintHexAlgorithm', { algorithm }),
          value: onErrorReturnErrorMessage(() => cert.fingerprint(algorithm as AlgorithmHashType).toString('hex')),
          multiline: true,
        },
      ],
    ),
    {
      label: translate('tools.certificate-key-parser.certificatePem'),
      value: onErrorReturnErrorMessage(() => cert.toString('pem')),
      multiline: true,
    },
  ] as LabelValue[];
}

export async function getPGPPublicKeyLabelValuesAsync(pgpPublicKey: openpgp.Key) {
  return [
    {
      label: translate('tools.certificate-key-parser.type'),
      value: translate('tools.certificate-key-parser.pgpPublicKey'),
    },
    {
      label: translate('tools.certificate-key-parser.creationTime'),
      value: pgpPublicKey.getCreationTime().toString(),
    },
    {
      label: translate('tools.certificate-key-parser.expirationTime'),
      value: (await pgpPublicKey.getExpirationTime())?.toString() || '',
    },
    {
      label: translate('tools.certificate-key-parser.algorithmInfo'),
      value: JSON.stringify(pgpPublicKey.getAlgorithmInfo()),
    },
    {
      label: translate('tools.certificate-key-parser.fingerprint'),
      value: pgpPublicKey.getFingerprint(),
    },
    {
      label: translate('tools.certificate-key-parser.userIds'),
      value: pgpPublicKey.getUserIDs().join(', '),
    },
    {
      label: translate('tools.certificate-key-parser.keyIds'),
      value: pgpPublicKey.getKeyIDs().map(k => k.toHex()).join(' ; '),
    },
  ] as LabelValue[];
}

export async function getPGPPrivateKeyLabelValuesAsync(pgpPrivateKey: openpgp.Key) {
  return [
    {
      label: translate('tools.certificate-key-parser.type'),
      value: translate('tools.certificate-key-parser.pgpPrivateKey'),
    },
    {
      label: translate('tools.certificate-key-parser.creationTime'),
      value: pgpPrivateKey.getCreationTime().toString(),
    },
    {
      label: translate('tools.certificate-key-parser.expirationTime'),
      value: (await pgpPrivateKey.getExpirationTime())?.toString() || '',
    },
    {
      label: translate('tools.certificate-key-parser.algorithmInfo'),
      value: JSON.stringify(pgpPrivateKey.getAlgorithmInfo()),
    },
    {
      label: translate('tools.certificate-key-parser.fingerprint'),
      value: pgpPrivateKey.getFingerprint(),
    },
    {
      label: translate('tools.certificate-key-parser.userIds'),
      value: pgpPrivateKey.getUserIDs().join(', '),
    },
    {
      label: translate('tools.certificate-key-parser.keyIds'),
      value: pgpPrivateKey.getKeyIDs().map(k => k.toHex()).join(' ; '),
    },
  ] as LabelValue[];
}

export function getCSRLabelValues(csr: forge.pki.CertificateSigningRequest) {
  return [
    {
      label: translate('tools.certificate-key-parser.type'),
      value: translate('tools.certificate-key-parser.certificateSigningRequest'),
    },
    {
      label: translate('tools.certificate-key-parser.subject'),
      value: csr.subject?.attributes?.map(a => JSON.stringify(a, null, 2)).join('\n'),
      multiline: true,
    },
    // {
    //   label: translate('tools.certificate-key-parser.requestInfo'),
    //   value: JSON.stringify(csr.certificationRequestInfo, null, 2),
    //   multiline: true,
    // },
    {
      label: translate('tools.certificate-key-parser.signature'),
      value: csr.signature?.toString('hex'),
    },
    {
      label: translate('tools.certificate-key-parser.signatureOid'),
      value: csr.signatureOid?.toString(),
    },
    {
      label: translate('tools.certificate-key-parser.signatureParameters'),
      value: JSON.stringify(csr.signatureParameters, null, 2),
    },
    {
      label: translate('tools.certificate-key-parser.signingInfo'),
      value: JSON.stringify(csr.siginfo, null, 2),
    },
    {
      label: translate('tools.certificate-key-parser.extensions'),
      value: JSON.stringify(csr.attributes, null, 2),
      multiline: true,
    },
    {
      label: translate('tools.certificate-key-parser.publicKey'),
      value: onErrorReturnErrorMessage(() => forge.pki.publicKeyToPem(csr.publicKey as never)),
      multiline: true,
    },
    {
      label: translate('tools.certificate-key-parser.publicKeyFingerprint'),
      value: onErrorReturnErrorMessage(() => forge.pki.getPublicKeyFingerprint(csr.publicKey as never)?.toHex()),
      multiline: true,
    },
  ] as LabelValue[];
}

export function getFingerprintLabelValues(fingerprint: Fingerprint) {
  return [
    {
      label: translate('tools.certificate-key-parser.type'),
      value: translate('tools.certificate-key-parser.fingerprint'),
    },
    {
      label: translate('tools.certificate-key-parser.fingerprintHex'),
      value: fingerprint.toString('hex'),
    },
    {
      label: translate('tools.certificate-key-parser.fingerprintBase64'),
      value: fingerprint.toString('base64'),
    },
  ] as LabelValue[];
}

export function getSignatureLabelValues(signature: Signature) {
  return [
    {
      label: translate('tools.certificate-key-parser.type'),
      value: translate('tools.certificate-key-parser.signature'),
    },
    {
      label: translate('tools.certificate-key-parser.fingerprintAsn1'),
      value: signature.toString('asn1'),
    },
    {
      label: translate('tools.certificate-key-parser.fingerprintSsh'),
      value: signature.toString('ssh'),
    },
  ] as LabelValue[];
}
