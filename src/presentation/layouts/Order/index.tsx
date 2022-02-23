import React, { useEffect, useState } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import { spacing } from '@material-ui/system';
import { CssBaseline, Paper as MuiPaper, withWidth } from '@material-ui/core';
import { isWidthUp } from '@material-ui/core/withWidth';
import { connect, useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  getLayoutConfig,
  clearLayoutConfig,
} from 'presentation/redux/actions/theme/layoutActions';
import { IHeaderRoutes } from 'presentation/routes/route.interface';
import headerRoutes from 'shared/constants/headerRoutes';
import { routes } from 'presentation/components/Sidebar';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import GitCommitHash from '../../components/GitCommitHash';
import './index.scss';

const GlobalStyle = createGlobalStyle`
  html,
  body,
  #root {
    height: 100%;
  }

  body {
    background: ${(props: any) => props.theme.body.background};
    transition: none;
  }

  .MuiCardHeader-action .MuiIconButton-root {
    padding: 4px;
    width: 28px;
    height: 28px;
  }
`;

const Root = styled.div`
  display: flex;
  min-height: 100vh;
`;

const AppContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const Paper = styled(MuiPaper)(spacing);

const MainContent = styled(Paper)`
  flex: 1;
  background: ${(props) => props.theme.body.background};
  padding: 10px 0;

  @media all and (-ms-high-contrast: none), (-ms-high-contrast: active) {
    flex: none;
  }

  box-shadow: inset 0px 10px 10px #1e28601a;
  position: relative;
`;

const sidebarArgs = {
  routes,
  variant: 'temporary',
  width: 260,
  collapsedWidth: 84,
};
interface ILeadLayout {
  routes: any;
  width: any;
  getLayoutConfig: (payload: IHeaderRoutes[]) => void;
}

const LeadLayout: React.FC<ILeadLayout> = ({
  children,
  width,
  getLayoutConfig: handleGetLayoutConfig,
}) => {
  const [collapse, setCollapse] = useState<boolean>(false);
  const dispatch = useDispatch();

  const toggleCollapse = () => {
    setCollapse(!collapse);
  };

  useEffect(() => {
    handleGetLayoutConfig(headerRoutes);
    return () => {
      dispatch(clearLayoutConfig());
    };
  }, [dispatch, handleGetLayoutConfig]);

  return (
    <Root>
      <CssBaseline />
      <GlobalStyle />
      <AppContent>
        <Header toggleCollapse={toggleCollapse} {...sidebarArgs} />
        <MainContent
          p={isWidthUp('lg', width) ? 10 : 5}
          className="lead-page-detail"
        >
          {children}
          <GitCommitHash />
        </MainContent>
        <Footer />
      </AppContent>
    </Root>
  );
};

const mapStateToProps = (state: any) => {
  return {
    props: state,
  };
};
const mapDispatchToProps = (dispatch: any) =>
  bindActionCreators(
    {
      getLayoutConfig,
    },
    dispatch
  );
export default connect(
  mapStateToProps,
  mapDispatchToProps
)((withWidth() as any)(LeadLayout));
