import I18n from 'i18n-js';
import moment from 'moment';
import DateHelper from './date';

describe('DateHelper', () => {
  beforeEach(() => {
    I18n.translations = {
      en: {
        date: { formats: { inputs: ['DD/MM/YYYY'] } }
      },

      us: {
        date: { formats: { inputs: ['MM/DD/YYYY'] } }
      }
    };
    moment.updateLocale('us', { parentLocale: 'en' });
  });

  describe('sanitizeDateInput', () => {
    it('replaces all common separators with forward slashes', () => {
      expect(DateHelper.sanitizeDateInput('-')).toEqual('/');
      expect(DateHelper.sanitizeDateInput('.')).toEqual('/');
      expect(DateHelper.sanitizeDateInput(' ')).toEqual('/');
    });
  });

  describe('isValidDate', () => {
    it('returns true when date is valid', () => {
      expect(DateHelper.isValidDate('10/12/2012')).toBeTruthy();
    });

    it('returns false whent he date is not valid', () => {
      expect(DateHelper.isValidDate('FOO')).toBeFalsy();
    });
  });

  describe('isValidLength', () => {
    it('returns true when date length is equal or greater the value, where value provided is 0', () => {
      expect(DateHelper.isValidLength('10/12/2012')).toBeTruthy();
    });

    it('returns true when date length is equal or greater the value, where value provided is 9', () => {
      expect(DateHelper.isValidLength('10/12/2012')).toBeTruthy();
    });

    describe('when valid value length must be 9 chracters long', () => {
      it('returns false when value is less', () => {
        expect(DateHelper.isValidLength('/12/2012', 9)).toBeFalsy();
      });

      it('returns false when value is empty', () => {
        expect(DateHelper.isValidLength('', 9)).toBeFalsy();
      });

      it('returns true when value is equal to required value', () => {
        expect(DateHelper.isValidLength('1/12/2012', 9)).toBeTruthy();
      });

      it('returns true when value is greater to required value', () => {
        expect(DateHelper.isValidLength('10/12/2012', 9)).toBeTruthy();
      });
    });

    describe('when valid value length is not specified', () => {
      it('returns true when value is less', () => {
        expect(DateHelper.isValidLength('/12/2012')).toBeTruthy();
      });

      it('returns false when value is empty', () => {
        expect(DateHelper.isValidLength('')).toBeTruthy();
      });

      it('returns true when valueis equal to required value', () => {
        expect(DateHelper.isValidLength('1/12/2012')).toBeTruthy();
      });

      it('returns true when valueis greater to required value', () => {
        expect(DateHelper.isValidLength('10/12/2012')).toBeTruthy();
      });
    });
  });

  describe('formatValue', () => {
    describe('when a valid date value', () => {
      it('returns the passed date value in the passed form', () => {
        expect(DateHelper.formatValue('10/12/2012', 'YYYY-MM-DD')).toEqual('2012-12-10');
      });
    });

    describe('when an invalid date value', () => {
      it('returns passed value', () => {
        expect(DateHelper.formatValue('FOO', 'YYYY-MM-DD')).toEqual('FOO');
      });
    });

    describe('options', () => {
      describe('sanitize', () => {
        it('does not santize the input before parsing', () => {
          expect(DateHelper.formatValue('10-10-2015', 'DD/MM/YYYY', { sanitize: false })).toEqual('10-10-2015');
        });
      });

      describe('locale', () => {
        beforeAll(() => { I18n.locale = 'us'; });
        afterAll(() => { I18n.locale = 'en'; });

        it('overrides the default i18n locale', () => {
          expect(DateHelper.formatValue('01/31/2015', 'DD/MM/YYYY', { locale: 'us' })).toEqual('31/01/2015');
        });
      });

      describe('strict', () => {
        it('overrides the default strict bool', () => {
          expect(DateHelper.formatValue('31-01-2015', 'DD/MM/YYYY', { strict: false })).toEqual('31/01/2015');
        });
      });

      describe('formats', () => {
        it('overrides the i18n formats when passed', () => {
          expect(DateHelper.formatValue('2016/01/01', 'DD/MM/YYYY', { formats: ['YYYY/MM/DD'] })).toEqual('01/01/2016');
        });
      });
    });
  });

  describe('stringToDate', () => {
    it('converts a value such as "2017-08-23" into a Javascript Date object', () => {
      const date = new Date(2017, 7, 23) // js Date month is zero indexed
      expect(DateHelper.stringToDate("2017-08-23")).toEqual(date);
    });
  });

  describe('formatDateString', () => {
    it('Formats the given date string to a specified format', () => {
      const dateString = 'Wed Aug 23 2017 12:00:00 GMT+0100 (BST)'
      expect(DateHelper.formatDateString(dateString, 'YYYY-MM-DD')).toEqual('2017-08-23')
    });
  });

  describe('todayFormatted', () => {
    it('returns todays date in a in a set format', () => {
      expect(DateHelper.todayFormatted('DD-MM-YYYY')).toEqual(moment().format('DD-MM-YYYY'));
    });
  });

  describe('weekdaysMinified', () => {
    it('returns the days of week by locale minfied', () => {
      expect(DateHelper.weekdaysMinified()).toEqual(['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']);
    });
  });

  describe('withinRange', () => {
    it('returns true if the date is today', () => {
      const testDate = moment().format('DD-MM-YYYY');
      expect(DateHelper.withinRange(testDate, 30, 'days')).toBeTruthy();
    });

    it('returns true if the date is within range', () => {
      const testDate = moment().add(29, 'days').format('DD-MM-YYYY');
      expect(DateHelper.withinRange(testDate, 30, 'days')).toBeTruthy();
    });

    it('returns true if the date is equal to the given range', () => {
      const testDate = moment().add(30, 'days').format('DD-MM-YYYY');
      expect(DateHelper.withinRange(testDate, 30, 'days')).toBeTruthy();
    });

    it('returns false if the date is beyond the given range', () => {
      const testDate = moment().add(31, 'days').format('DD-MM-YYYY');
      expect(DateHelper.withinRange(testDate, 30, 'days')).toBeFalsy();
    });

    it('returns false if the date is many years in the past', () => {
      const testDate = moment().add(100, 'years').format('DD-MM-YYYY');
      expect(DateHelper.withinRange(testDate, 1, 'years')).toBeFalsy();
    });
  });
});
