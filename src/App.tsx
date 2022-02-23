import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import DateFnsUtils from '@date-io/date-fns';
import {
  ThemeProvider as MuiThemeProvider,
  StylesProvider,
} from '@material-ui/core/styles';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import { ThemeProvider } from 'styled-components';
import SnackbarComponent from 'presentation/components/SnackBar';
import { bindActionCreators } from 'redux';
import {
  configureLocalization,
  changeLanguage,
  getLanguage,
  setLanguageToStorage,
  initialLanguage,
} from './presentation/theme/localization';
import Routes from './presentation/routes/Routes';
import maTheme from './presentation/theme';
import { initApplication } from './presentation/redux/actions/general/appInitiation';
import { updatePresence } from './presentation/redux/actions/presence';

function App({ theme, initApplication: initAppHandle }: any): any {
  useEffect(() => {
    initAppHandle();
  }, [initAppHandle]);

  configureLocalization().then(async () => {
    initialLanguage();
    setLanguageToStorage();
    await changeLanguage(getLanguage());
  });

  return (
    <>
      <Helmet titleTemplate="%s" defaultTitle="Rabbit Finance" />
      <StylesProvider injectFirst>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <MuiThemeProvider theme={maTheme[theme.currentTheme]}>
            <ThemeProvider theme={maTheme[theme.currentTheme]}>
              <SnackbarComponent />
              <Routes />
            </ThemeProvider>
          </MuiThemeProvider>
        </MuiPickersUtilsProvider>
      </StylesProvider>
    </>
  );
}
const mapDispatchToProps = (dispatch: any) =>
  bindActionCreators(
    {
      initApplication,
      updatePresence,
    },
    dispatch
  );

export default connect(
  (store: any) => ({
    theme: store.themeReducer,
  }),
  mapDispatchToProps
)(App);
