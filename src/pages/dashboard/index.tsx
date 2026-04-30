import React, {useEffect, Dispatch, useState} from 'react';
import { connect } from 'react-redux';
import { Navigate, useParams, Routes, Route } from 'react-router-dom';
import EmailList from '../../components/emails/list';
import EmailOps from '../../components/emails/ops';
import EmailView from '../../components/emails/view';
import Sidebar from '../../components/sidebar';
import Modal from '../../components/modal/default';

import {signOut} from '../../store/auth/actions';
import {reset} from '../../store/notification/actions';
import * as NotificationTypes from '../../store/notification/types';
import * as AuthTypes from '../../store/auth/types';
import {isEmpty} from 'lodash';
import {getEmails} from '../../store/emails/actions';
import {ActionTypes} from '../../store/emails/types';
import {User} from '../../types';
import { Button, Layout, message } from 'antd';
import { MailOutlined } from '@ant-design/icons';
import './style.css';

const { Header, Content, Footer } = Layout;

interface dashboardProps { 
  getEmailsUpdate: (email: string, emailAction?: string) => void,
  successMessage: string,
  errorMessage: string, 
  reset: () => void,
  signOut: (currentUser: User) => void
}

function Dashboard({unreadCount, signOut, currentUser, emails, successMessage, errorMessage, reset, getEmailsUpdate}: any) {
  const [login, goToLogin] = useState(false);
  let { emailAction } = useParams<{emailAction: string}>();

  // ✅ Fix: extract emailAction from URL path if useParams returns undefined
  const pathEmailAction = emailAction || window.location.pathname.split('/')[2];

  useEffect(() => {
    if (successMessage) {
      message.success(successMessage);
      reset();
    }

    if (errorMessage) {
      message.error(errorMessage);
      reset();
    }

    if (!isEmpty(currentUser)) {
      // ✅ Fix: use pathEmailAction instead of emailAction
      getEmailsUpdate(currentUser.email, pathEmailAction);
    } else {
      goToLogin(true);
    }

  // ✅ Fix: use pathEmailAction in dependency array
  }, [currentUser, pathEmailAction, successMessage, errorMessage]);
  
  const getOut = () => {
    signOut(currentUser);
  }

  if (login) {
    return <Navigate to="/login" replace />;
  }

  return (
    <Layout style={{height: window.innerHeight}}>
      <Modal />
      <Header className="site-layout-sub-header-background" style={{ padding: 0 }}>
        <Button className="actions-right" onClick={() => getOut()}>Logout</Button>
        <div className="actions-right">
          <MailOutlined className="mail-icon-style"/>
          <span className="mail-count">{unreadCount}</span>
        </div>
      </Header>
      <Layout>
        <Sidebar />
        <Content>
          <div className="email-ops-container">
            {/* ✅ Fix: pass pathEmailAction instead of emailAction */}
            <EmailOps selectedAction={pathEmailAction}/>
          </div>
          <div className="site-layout-background email-list-container" style={{ padding: 24, minHeight: 360 }}>
            <Routes>
              <Route path=":emailAction/list" element={<EmailList />} />
              <Route path=":emailAction/view/:emailUuid" element={<EmailView />} />
            </Routes>
          </div>
        </Content>
      </Layout>
      <Footer style={{ textAlign: 'center' }}>Created by bron10</Footer>
    </Layout>
  );
}

const mapStateToProps = ({email, notification, auth}: any) => {
  return {
    currentUser: auth.currentUser,
    successMessage: notification.successMessage,
    errorMessage: notification.errorMessage,
    unreadCount: email.unreadCount
  }
}

const mapDispatchToProps = (dispatch: Dispatch<ActionTypes | NotificationTypes.ActionTypes | AuthTypes.ActionTypes>) => {
  return {
    reset: () => dispatch(reset()),
    signOut: (data: User) => dispatch(signOut(data)),
    getEmailsUpdate: (email: string, emailAction?: string) => dispatch(getEmails(email, emailAction))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard);