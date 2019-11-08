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

const useStyles1 = makeStyles({
  root: {
    width: 300,
    background: 'linear-gradient(45deg, #085F63 30%, #085F63 90%)',
    border: 0,
    borderRadius: 3,
    boxShadow: '0 3px 5px 2px #F1F1F1',
    color: 'white',
    height: 48,
    padding: '0 30px',
  },
});

const SelfMeetingList = ({
  MeetingUserList,
  setMeetingData,
  meetingupdated,
  meetingIsLoading,
}) => {
  const history = useHistory();
  const [searchKeyword, setSearchKeyword] = useState('');
  const classes1 = useStyles1();
  useEffect(() => {
    setMeetingData();
    // console.log(searchKeyword === false);
    // console.log(updated);
    // console.log(IsLoading);
  }, [meetingIsLoading]);

  return (
    <div className="Template">
      <p className="title">홍익 셀프 미팅 </p>
      <div className="input" maxWidth="sm" style={{ 'padding-bottom': '0px' }}>
        {/* <SplitButton /> */}
        <Container
          className="input"
          maxWidth="sm"
          style={{ 'padding-bottom': '0px' }}
        >
          <div style={{ 'text-align': 'center' }}>
            <Button
              className={classes1.root}
              style={{ 'font-family': 'Noto Sans KR, sans-serif' }}
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
      {meetingIsLoading ? (
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
              if (meetingupdated) {
                result = searchKeyword
                  ? MeetingUserList.filter(
                      item =>
                        item.collage.indexOf(searchKeyword) >= 0 ||
                        item.religion.indexOf(searchKeyword) >= 0 ||
                        item.personality.indexOf(searchKeyword) >= 0 ||
                        item.hobby.indexOf(searchKeyword) >= 0,
                    ).map(user => <Cards user={user} history={history} />)
                  : MeetingUserList.map(user => (
                    <Cards user={user} history={history} />
                    ));
              }
              return result;
            })()}
          </Container>
        </div>
      )}
    </div>
  );
};

@inject(({ userListStore }) => ({
  setSelectedMeeting: userListStore.setSelectedMeeting,
}))
@observer
class Cards extends React.Component {
  render() {
    const { setSelectedMeeting, user, history } = this.props;
    const url = `/selfmeetingdetails/${user.email}`;
    return (
      <div className="CardsWrapper">
        <Card
          onClick={() => {
            setSelectedMeeting(
              user.time,
              user.email,
              user.sex,
              user.type,
              user.TwoTwoFirstAge,
              user.TwoTwoFirstCollage,
              user.TwoTwoSecondAge,
              user.TwoTwoSecondCollage,
              user.ThreeThreeFirstAge,
              user.ThreeThreeFirstCollage,
              user.ThreeThreeSecondAge,
              user.ThreeThreeSecondCollage,
              user.ThreeThreeThirdAge,
              user.ThreeThreeThirdCollage,
              user.FourFourFirstAge,
              user.FourFourFirstCollage,
              user.FourFourSecondAge,
              user.FourFourSecondCollage,
              user.FourFourThirdAge,
              user.FourFourThirdCollage,
              user.FourFourFourthAge,
              user.FourFourFourthCollage,
              user.appearance,
              user.personality,
              user.hobby,
              user.drink,
              user.idealtype,
              user.openlink,
              user.hashtag,
              user.selfintro,
            );
            history.push(url);
          }}
        >
          <div className="MuiCardHeader-root">
            {`${user.sex}` === '남학우' ? <p>🤵</p> : <p>👧</p>}
            {`(${user.sex}) ${
              user.type.toString().split(' ')[0]
            } /(팀이름넣을예정)${user.openlink}`}
          </div>
          <CardContent style={{ 'padding-top': '6px' }}>
            <Badge
              keyword={`#${user.hashtag.toString().split('#')[1]}`}
              color="primary"
            />
            <Badge
              keyword={`#${user.hashtag.toString().split('#')[2]}`}
              color="rose"
            />
            <Badge
              keyword={user.hashtag.toString().split('#')[3]}
              color="rose"
            />

            <Badge
              keyword={user.drink.toString().substring(0, 5)}
              color="warning"
            />
            <p
              className="timebar"
              style={{ display: 'inline-flex', float: 'right' }}
            >
              {user.time.toString().substring(5, 10)}
            </p>
            <p
              className="body"
              style={{ 'padding-top': '5px', 'font-size': '14px' }}
            >
              {user.selfintro}
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }
}

export default inject(({ userListStore }) => ({
  MeetingUserList: userListStore.MeetingUserList,
  setMeetingData: userListStore.setMeetingData,
  meetingupdated: userListStore.meetingupdated,
  meetingIsLoading: userListStore.meetingIsLoading,
}))(observer(SelfMeetingList));
