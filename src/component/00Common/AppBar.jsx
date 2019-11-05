import React from 'react';
import { useHistory } from 'react-router-dom';

import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import Slide from '@material-ui/core/Slide';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import CssBaseline from '@material-ui/core/CssBaseline';
import AccountCircle from '@material-ui/icons/AccountCircle';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';

// app bar 스크롤 숨김
const HideOnScroll = props => {
  const { children } = props;
  const trigger = useScrollTrigger();
  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
};

const CustomAppBar = props => {
  const history = useHistory();
  return (
    <>
      <CssBaseline />
      <HideOnScroll {...props}>
        <AppBar style={{ 'font-family': 'Do Hyeon, sans-serif' }}>
          <div className="global-navbar">
            <nav className="navbar">
              <div className="firstbar">
                <div className="start">
                  <a
                    className="logo"
                    onClick={() => {
                      history.push(`/`);
                    }}
                  >
                    홍개팅
                  </a>
                  <div className="menu-wrapper">
                    <ol className="menulist">
                      <li className="selso">
                        <a
                          className="atag"
                          onClick={() => {
                            history.push(`/selfdatinglist`);
                          }}
                        >
                          <span className="text">#홍셀소</span>
                        </a>
                      </li>
                      <li className="meeting">
                        <a
                          className="atag"
                          onClick={() => {
                            history.push(`/selfmeetinglist`);
                          }}
                        >
                          <span className="text">#홍미팅</span>
                        </a>
                      </li>
                    </ol>
                  </div>
                </div>
                <div className="end">
                  <IconButton
                    color="inherit"
                    onClick={() => {
                      history.push(`/mypage/test`);
                    }}
                  >
                    <AccountCircle />
                  </IconButton>
                </div>
              </div>
              <div className="secondbar">
                <ol className="viewlist">
                  <li className="view">
                    <Button style={{ 'font-family': 'Do Hyeon, sans-serif' }}>
                      전체보기
                    </Button>
                  </li>
                  <li className="view">
                    <Button style={{ 'font-family': 'Do Hyeon, sans-serif' }}>
                      남자보기
                    </Button>
                  </li>
                  <li className="view">
                    <Button style={{ 'font-family': 'Do Hyeon, sans-serif' }}>
                      여자보기
                    </Button>
                  </li>
                </ol>
              </div>
            </nav>
          </div>
        </AppBar>
      </HideOnScroll>

      {/* <CssBaseline />
      <HideOnScroll {...props}>
        <AppBar>
          <Toolbar>
            <nav>
              <Typography
                className="logo"
                variant="h6"
                onClick={() => {
                  history.push(`/`);
                }}
              >
                홍개팅
              </Typography>
            </nav>
          </Toolbar>
        </AppBar>
      </HideOnScroll>
      <Toolbar /> */}
    </>
  );
};

export default CustomAppBar;
