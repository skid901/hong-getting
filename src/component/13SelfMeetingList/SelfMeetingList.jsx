import React, { useState, useEffect, useContext } from 'react';
import Card from '@material-ui/core/Card';
import { makeStyles } from '@material-ui/core/styles';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import { inject, observer } from 'mobx-react';
import './SelfMeetingList.scss';

import {
  BrowserRouter,
  Switch,
  Route,
  Link,
  withRouter,
  useHistory,
} from 'react-router-dom';

import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import Badge from './Badge';
import Axios from '../../../node_modules/axios/index';

import ReactPaginate from 'react-paginate';

const useStyles1 = makeStyles({
  root: {
    width: 300,
    background: 'linear-gradient(45deg, #1e3c72 30%, #2a5298 90%)',
    border: 0,
    borderRadius: 3,
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    color: 'white',
    height: 48,
    padding: '0 30px',
  },
});

const SelfMeetingList = ({
  updated,
  IsLoading,
  getUsers,
  pageNumber,
  pagedUser,
  getAllUsers,
  userCount
}) => {
  const history = useHistory();
  const [searchKeyword, setSearchKeyword] = useState('');
  const classes1 = useStyles1();
  useEffect(() => {
    getUsers(1);
    getAllUsers();
    // console.log(searchKeyword === false);
    // console.log(updated);
    // console.log(IsLoading);
  }, [IsLoading]);

  return (
    <div className="Template">
      <p className="title">홍익 셀프 미팅😎 </p>
      <div className="input" maxWidth="sm" style={{ 'padding-bottom': '0px' }}>
        {/* <SplitButton /> */}
        <Container
          className="input"
          maxWidth="sm"
          style={{ 'padding-bottom': '0px' }}
        >
          <div
            style={{ 'text-align': 'center' }}
            onClick = {() => {
              Axios.post("http://34.97.117.253:80/api/meetingusers/")
                .then(res => {
                  console.log(res);
                })
            }}
          >
            <Button
              className={classes1.root}
              style={{ 'font-family': 'Do Hyeon, sans-serif' }}
            >
              홍미팅 신청하기
            </Button>
          </div>
          <TextField
            label="키워드를 검색하세요🔍"
            type="search"
            className="searchfield"
            margin="normal"
            variant="outlined"
            value={searchKeyword}
            onChange={e => setSearchKeyword(e.target.value)}
            autoComplete="off"
            fullWidth
          />
        </Container>
      </div>
      {IsLoading ? (
        <div>
          <div> 잠시만기다려주세요...</div>
          <div>
            <CircularProgress />
            <CircularProgress color="secondary" />
          </div>
        </div>
      ) : (
        <div className="CardsWrapper">
          <Container className="input" maxWidth="sm">
            {(() => {
              let result = null;
              if (updated) {
                result = searchKeyword
                  ? pagedUser.filter(
                      item =>
                        item.collage.indexOf(searchKeyword) >= 0 ||
                        item.religion.indexOf(searchKeyword) >= 0 ||
                        item.personality.indexOf(searchKeyword) >= 0 ||
                        item.hobby.indexOf(searchKeyword) >= 0,
                    ).map(user => <Cards user={user} history={history} />)
                  : pagedUser.map(user => (
                      <Cards user={user} history={history} />
                    ));
              }
              return result;
            })()}
          </Container>
        </div>
      )}
      <div className="page">
        <ReactPaginate
          pageCount={userCount / 20 ? userCount / 20 + 1: userCount/20}
          marginPagesDisplayed={2}
          pageRangeDisplayed={1}
          onPageChange={e=>getUsers(e.selected+1)}
          previousLabel={<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M15.41 16.59L10.83 12l4.58-4.59L14 6l-6 6 6 6 1.41-1.41z"/><path fill="none" d="M0 0h24v24H0V0z"/></svg>}
          breakLabel={<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="none" d="M0 0h24v24H0V0z"/><path d="M6 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm12 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm-6 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/></svg>}
          nextLabel={<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"/><path fill="none" d="M0 0h24v24H0V0z"/></svg>}
        />
      </div>
    </div>
  );
};

@inject(({ selfMeetingUser }) => ({
  setSelectedUser: selfMeetingUser.setSelectedUser,
}))
@observer
class Cards extends React.Component {
  render() {
    const { setSelectedUser, user, history } = this.props;
    const url = `/selfmeetingdetails/${user.email}`;
    return (
      <div className="CardsWrapper">
        <Card
          onClick={() => {
            setSelectedUser(
              user
            );
            history.push(url);
          }}
        >
          <div className="MuiCardHeader-root">
            {`${user.gender}` == '남학우' ? <p>🤵</p> : <p>👧</p>}
            {`(${user.id}) ${
              user.number
            } /(팀이름넣을예정)${user.chatlink}`}
            {console.log(user.tag)}
          </div>
          <CardContent style={{ 'padding-top': '6px' }}>
            <Badge
              keyword={`#${user.tag.split('#')[1]}`}
              color="primary"
            />
            <Badge
              keyword={`#${user.tag.split('#')[2]}`}
              color="rose"
            />
            <Badge
              keyword={user.tag.split('#')[3]}
              color="rose"
            />

            <Badge
              keyword={user.drink.substring(0, 5)}
              color="warning"
            />
            <p
              className="timebar"
              style={{ display: 'inline-flex', float: 'right' }}
            >
              {user.time.substring(5, 10)}
            </p>
            <p
              className="body"
              style={{ 'padding-top': '5px', 'font-size': '14px' }}
            >
              {user.keysentence}
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }
}

export default inject(({ selfMeetingUser }) => ({
  updated: selfMeetingUser.updated,
  IsLoading: selfMeetingUser.IsLoading,
  getUsers: selfMeetingUser.getUsers,
  pageNuber: selfMeetingUser.pageNumber,
  pagedUser: selfMeetingUser.pagedUser,
  getAllUsers: selfMeetingUser.getAllUsers,
  userCount: selfMeetingUser.userCount,
}))(observer(SelfMeetingList));
