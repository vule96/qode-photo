'use client';

import { ConfigProvider, ConfigProviderProps } from 'antd';

type AntdThemeProviderProps = ConfigProviderProps['theme'];

export const antdCustomTheme: AntdThemeProviderProps = {
  // token: {
  //   colorPrimary: '#FF7D37',
  //   colorPrimaryBorder: '#FFFFFF',
  //   colorLink: 'unset',
  // },
  components: {
    Button: {
      defaultActiveColor: '#FF7D37',
    },
    Form: {
      labelColor: '#797979',
    },
    Progress: {
      defaultColor: '#FF7D37',
    },
    Input: {
      activeBorderColor: '#FF7D37',
      hoverBorderColor: '#FF7D37',
    },
  },
};

export const AntdThemeConfigProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  return <ConfigProvider theme={antdCustomTheme}>{children}</ConfigProvider>;
};
