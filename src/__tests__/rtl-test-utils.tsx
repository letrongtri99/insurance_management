import React, { FC, ReactElement } from 'react';
import { render, RenderOptions } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ThemeProvider } from 'styled-components';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { configureStore } from '../presentation/redux/store';
import maTheme from '../presentation/theme';

const store = configureStore();

const AllTheProviders: FC = ({ children }) => {
  return (
    <Provider store={store}>
      <MuiThemeProvider theme={maTheme[0]}>
        <ThemeProvider theme={maTheme[0]}>
          <BrowserRouter>{children}</BrowserRouter>
        </ThemeProvider>
      </MuiThemeProvider>
    </Provider>
  );
};

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) => render(ui, { wrapper: AllTheProviders, ...options });

export * from '@testing-library/react';
export { customRender as render };
