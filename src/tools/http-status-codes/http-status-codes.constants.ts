import { translate } from '@/plugins/i18n.plugin';

export const codesByCategories: {
  category: string
  codes: {
    code: number
    name: string
    description: string
    type: 'HTTP' | 'WebDav'
  }[]
}[] = [
  {
    category: translate('tools.http-status-codes.categories.1xx'),
    codes: [
      {
        code: 100,
        name: translate('tools.http-status-codes.status.100.name'),
        description: translate('tools.http-status-codes.status.100.description'),
        type: 'HTTP',
      },
      {
        code: 101,
        name: translate('tools.http-status-codes.status.101.name'),
        description: translate('tools.http-status-codes.status.101.description'),
        type: 'HTTP',
      },
      {
        code: 102,
        name: translate('tools.http-status-codes.status.102.name'),
        description: translate('tools.http-status-codes.status.102.description'),
        type: 'WebDav',
      },
      {
        code: 103,
        name: translate('tools.http-status-codes.status.103.name'),
        description: translate('tools.http-status-codes.status.103.description'),
        type: 'HTTP',
      },
    ],
  },
  {
    category: translate('tools.http-status-codes.categories.2xx'),
    codes: [
      {
        code: 200,
        name: translate('tools.http-status-codes.status.200.name'),
        description: translate('tools.http-status-codes.status.200.description'),
        type: 'HTTP',
      },
      {
        code: 201,
        name: translate('tools.http-status-codes.status.201.name'),
        description: translate('tools.http-status-codes.status.201.description'),
        type: 'HTTP',
      },
      {
        code: 202,
        name: translate('tools.http-status-codes.status.202.name'),
        description: translate('tools.http-status-codes.status.202.description'),
        type: 'HTTP',
      },
      {
        code: 203,
        name: translate('tools.http-status-codes.status.203.name'),
        description: translate('tools.http-status-codes.status.203.description'),
        type: 'HTTP',
      },
      {
        code: 204,
        name: translate('tools.http-status-codes.status.204.name'),
        description: translate('tools.http-status-codes.status.204.description'),
        type: 'HTTP',
      },
      {
        code: 205,
        name: translate('tools.http-status-codes.status.205.name'),
        description: translate('tools.http-status-codes.status.205.description'),
        type: 'HTTP',
      },
      {
        code: 206,
        name: translate('tools.http-status-codes.status.206.name'),
        description: translate('tools.http-status-codes.status.206.description'),
        type: 'HTTP',
      },
      {
        code: 207,
        name: translate('tools.http-status-codes.status.207.name'),
        description: translate('tools.http-status-codes.status.207.description'),
        type: 'WebDav',
      },
      {
        code: 208,
        name: translate('tools.http-status-codes.status.208.name'),
        description: translate('tools.http-status-codes.status.208.description'),
        type: 'WebDav',
      },
      {
        code: 226,
        name: translate('tools.http-status-codes.status.226.name'),
        description: translate('tools.http-status-codes.status.226.description'),
        type: 'HTTP',
      },
    ],
  },
  {
    category: translate('tools.http-status-codes.categories.3xx'),
    codes: [
      {
        code: 300,
        name: translate('tools.http-status-codes.status.300.name'),
        description: translate('tools.http-status-codes.status.300.description'),
        type: 'HTTP',
      },
      {
        code: 301,
        name: translate('tools.http-status-codes.status.301.name'),
        description: translate('tools.http-status-codes.status.301.description'),
        type: 'HTTP',
      },
      {
        code: 302,
        name: translate('tools.http-status-codes.status.302.name'),
        description: translate('tools.http-status-codes.status.302.description'),
        type: 'HTTP',
      },
      {
        code: 303,
        name: translate('tools.http-status-codes.status.303.name'),
        description: translate('tools.http-status-codes.status.303.description'),
        type: 'HTTP',
      },
      {
        code: 304,
        name: translate('tools.http-status-codes.status.304.name'),
        description: translate('tools.http-status-codes.status.304.description'),
        type: 'HTTP',
      },
      {
        code: 305,
        name: translate('tools.http-status-codes.status.305.name'),
        description: translate('tools.http-status-codes.status.305.description'),
        type: 'HTTP',
      },
      {
        code: 306,
        name: translate('tools.http-status-codes.status.306.name'),
        description: translate('tools.http-status-codes.status.306.description'),
        type: 'HTTP',
      },
      {
        code: 307,
        name: translate('tools.http-status-codes.status.307.name'),
        description: translate('tools.http-status-codes.status.307.description'),
        type: 'HTTP',
      },
      {
        code: 308,
        name: translate('tools.http-status-codes.status.308.name'),
        description: translate('tools.http-status-codes.status.308.description'),
        type: 'HTTP',
      },
    ],
  },
  {
    category: translate('tools.http-status-codes.categories.4xx'),
    codes: [
      {
        code: 400,
        name: translate('tools.http-status-codes.status.400.name'),
        description: translate('tools.http-status-codes.status.400.description'),
        type: 'HTTP',
      },
      {
        code: 401,
        name: translate('tools.http-status-codes.status.401.name'),
        description: translate('tools.http-status-codes.status.401.description'),
        type: 'HTTP',
      },
      {
        code: 402,
        name: translate('tools.http-status-codes.status.402.name'),
        description: translate('tools.http-status-codes.status.402.description'),
        type: 'HTTP',
      },
      {
        code: 403,
        name: translate('tools.http-status-codes.status.403.name'),
        description: translate('tools.http-status-codes.status.403.description'),
        type: 'HTTP',
      },
      {
        code: 404,
        name: translate('tools.http-status-codes.status.404.name'),
        description: translate('tools.http-status-codes.status.404.description'),
        type: 'HTTP',
      },
      {
        code: 405,
        name: translate('tools.http-status-codes.status.405.name'),
        description: translate('tools.http-status-codes.status.405.description'),
        type: 'HTTP',
      },
      {
        code: 406,
        name: translate('tools.http-status-codes.status.406.name'),
        description: translate('tools.http-status-codes.status.406.description'),
        type: 'HTTP',
      },
      {
        code: 407,
        name: translate('tools.http-status-codes.status.407.name'),
        description: translate('tools.http-status-codes.status.407.description'),
        type: 'HTTP',
      },
      {
        code: 408,
        name: translate('tools.http-status-codes.status.408.name'),
        description: translate('tools.http-status-codes.status.408.description'),
        type: 'HTTP',
      },
      {
        code: 409,
        name: translate('tools.http-status-codes.status.409.name'),
        description: translate('tools.http-status-codes.status.409.description'),
        type: 'HTTP',
      },
      {
        code: 410,
        name: translate('tools.http-status-codes.status.410.name'),
        description: translate('tools.http-status-codes.status.410.description'),
        type: 'HTTP',
      },
      {
        code: 411,
        name: translate('tools.http-status-codes.status.411.name'),
        description: translate('tools.http-status-codes.status.411.description'),
        type: 'HTTP',
      },
      {
        code: 412,
        name: translate('tools.http-status-codes.status.412.name'),
        description: translate('tools.http-status-codes.status.412.description'),
        type: 'HTTP',
      },
      {
        code: 413,
        name: translate('tools.http-status-codes.status.413.name'),
        description: translate('tools.http-status-codes.status.413.description'),
        type: 'HTTP',
      },
      {
        code: 414,
        name: translate('tools.http-status-codes.status.414.name'),
        description: translate('tools.http-status-codes.status.414.description'),
        type: 'HTTP',
      },
      {
        code: 415,
        name: translate('tools.http-status-codes.status.415.name'),
        description: translate('tools.http-status-codes.status.415.description'),
        type: 'HTTP',
      },
      {
        code: 416,
        name: translate('tools.http-status-codes.status.416.name'),
        description: translate('tools.http-status-codes.status.416.description'),
        type: 'HTTP',
      },
      {
        code: 417,
        name: translate('tools.http-status-codes.status.417.name'),
        description: translate('tools.http-status-codes.status.417.description'),
        type: 'HTTP',
      },
      {
        code: 418,
        name: translate('tools.http-status-codes.status.418.name'),
        description: translate('tools.http-status-codes.status.418.description'),
        type: 'HTTP',
      },
      {
        code: 421,
        name: translate('tools.http-status-codes.status.421.name'),
        description: translate('tools.http-status-codes.status.421.description'),
        type: 'HTTP',
      },
      {
        code: 422,
        name: translate('tools.http-status-codes.status.422.name'),
        description: translate('tools.http-status-codes.status.422.description'),
        type: 'HTTP',
      },
      {
        code: 423,
        name: translate('tools.http-status-codes.status.423.name'),
        description: translate('tools.http-status-codes.status.423.description'),
        type: 'HTTP',
      },
      {
        code: 424,
        name: translate('tools.http-status-codes.status.424.name'),
        description: translate('tools.http-status-codes.status.424.description'),
        type: 'HTTP',
      },
      {
        code: 425,
        name: translate('tools.http-status-codes.status.425.name'),
        description: translate('tools.http-status-codes.status.425.description'),
        type: 'HTTP',
      },
      {
        code: 426,
        name: translate('tools.http-status-codes.status.426.name'),
        description: translate('tools.http-status-codes.status.426.description'),
        type: 'HTTP',
      },
      {
        code: 428,
        name: translate('tools.http-status-codes.status.428.name'),
        description: translate('tools.http-status-codes.status.428.description'),
        type: 'HTTP',
      },
      {
        code: 429,
        name: translate('tools.http-status-codes.status.429.name'),
        description: translate('tools.http-status-codes.status.429.description'),
        type: 'HTTP',
      },
      {
        code: 431,
        name: translate('tools.http-status-codes.status.431.name'),
        description: translate('tools.http-status-codes.status.431.description'),
        type: 'HTTP',
      },
      {
        code: 451,
        name: translate('tools.http-status-codes.status.451.name'),
        description: translate('tools.http-status-codes.status.451.description'),
        type: 'HTTP',
      },
    ],
  },
  {
    category: translate('tools.http-status-codes.categories.5xx'),
    codes: [
      {
        code: 500,
        name: translate('tools.http-status-codes.status.500.name'),
        description: translate('tools.http-status-codes.status.500.description'),
        type: 'HTTP',
      },
      {
        code: 501,
        name: translate('tools.http-status-codes.status.501.name'),
        description: translate('tools.http-status-codes.status.501.description'),
        type: 'HTTP',
      },
      {
        code: 502,
        name: translate('tools.http-status-codes.status.502.name'),
        description: translate('tools.http-status-codes.status.502.description'),
        type: 'HTTP',
      },
      {
        code: 503,
        name: translate('tools.http-status-codes.status.503.name'),
        description: translate('tools.http-status-codes.status.503.description'),
        type: 'HTTP',
      },
      {
        code: 504,
        name: translate('tools.http-status-codes.status.504.name'),
        description: translate('tools.http-status-codes.status.504.description'),
        type: 'HTTP',
      },
      {
        code: 505,
        name: translate('tools.http-status-codes.status.505.name'),
        description: translate('tools.http-status-codes.status.505.description'),
        type: 'HTTP',
      },
      {
        code: 506,
        name: translate('tools.http-status-codes.status.506.name'),
        description: translate('tools.http-status-codes.status.506.description'),
        type: 'HTTP',
      },
      {
        code: 507,
        name: translate('tools.http-status-codes.status.507.name'),
        description: translate('tools.http-status-codes.status.507.description'),
        type: 'HTTP',
      },
      {
        code: 508,
        name: translate('tools.http-status-codes.status.508.name'),
        description: translate('tools.http-status-codes.status.508.description'),
        type: 'HTTP',
      },
      {
        code: 510,
        name: translate('tools.http-status-codes.status.510.name'),
        description: translate('tools.http-status-codes.status.510.description'),
        type: 'HTTP',
      },
      {
        code: 511,
        name: translate('tools.http-status-codes.status.511.name'),
        description: translate('tools.http-status-codes.status.511.description'),
        type: 'HTTP',
      },
    ],
  },
];
