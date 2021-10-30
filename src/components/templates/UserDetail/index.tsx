import React from 'react';
import { RouteComponentProps } from 'react-router-dom';

interface RouterParams {
  id: string;
}

interface Props extends RouteComponentProps<RouterParams> {}

const UserDetail: React.FC<Props> = ({ match }) => (
  <div>User Detail{match.params.id}</div>
);

export default UserDetail;
