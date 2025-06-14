import { ValidationErrorsIBAN } from 'ibantools';
import { translate } from '@/plugins/i18n.plugin';

export { getFriendlyErrors };

const ibanErrorToMessage = {
  [ValidationErrorsIBAN.NoIBANProvided]: translate('tools.iban-validator-and-parser.errors.no-iban-provided'),
  [ValidationErrorsIBAN.NoIBANCountry]: translate('tools.iban-validator-and-parser.errors.no-iban-country'),
  [ValidationErrorsIBAN.WrongBBANLength]: translate('tools.iban-validator-and-parser.errors.wrong-bban-length'),
  [ValidationErrorsIBAN.WrongBBANFormat]: translate('tools.iban-validator-and-parser.errors.wrong-bban-format'),
  [ValidationErrorsIBAN.ChecksumNotNumber]: translate('tools.iban-validator-and-parser.errors.checksum-not-number'),
  [ValidationErrorsIBAN.WrongIBANChecksum]: translate('tools.iban-validator-and-parser.errors.wrong-iban-checksum'),
  [ValidationErrorsIBAN.WrongAccountBankBranchChecksum]: translate('tools.iban-validator-and-parser.errors.wrong-account-bank-branch-checksum'),
  [ValidationErrorsIBAN.QRIBANNotAllowed]: translate('tools.iban-validator-and-parser.errors.qr-iban-not-allowed'),
};

function getFriendlyErrors(errorCodes: ValidationErrorsIBAN[]) {
  return errorCodes.map(errorCode => ibanErrorToMessage[errorCode]).filter(Boolean);
}
