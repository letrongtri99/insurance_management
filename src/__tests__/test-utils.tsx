import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import maTheme from '../presentation/theme';
import { configureStore } from '../presentation/redux/store';

const store = configureStore();

export const mountWithProviders = (child: any) => {
  return mount(child, {
    wrappingComponent: ({ children }) => (
      <Provider store={store}>
        <ThemeProvider theme={maTheme[0]}>{children}</ThemeProvider>
      </Provider>
    ),
    context: { store },
  });
};

export { mountWithProviders as mount };
