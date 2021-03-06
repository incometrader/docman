import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { Card, CardActions, CardMedia, CardTitle } from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import { orangeA700, redA700, white,
  deepPurpleA700, greenA700 } from 'material-ui/styles/colors';
import insertRole from '../../utils/insertRole';
import avatar from '../../img/avatar.png';

/**
 * Renders the profile information sidebar
 * @param {any} { user, access, deleteUser }
 * @returns {object} jsx
 */
function ProfileSidebar({ user, access, deleteUser }) {
  return (
    <Card className="animated fadeInDown">
      <CardMedia
        overlay={
          <CardTitle
            title={user.username}
            subtitle={user.email}
          />
        }
      >
        <img src={avatar} />
      </CardMedia>
      <CardTitle
        title={user.name}
        subtitle={insertRole(user.roleId)}
        subtitleColor={orangeA700}
      />
      {(access.user.roleId === 1 || access.user.id === user.id)
       && <CardActions>
        <Link to={`/user/${user.id}/edit`}>
          <RaisedButton
            className="edit-profile-button"
            label={access.user.roleId === 1 && user.roleId !== 1
            ? 'CHANGE USER ROLE' : 'EDIT PROFILE'}
            labelColor={white}
            backgroundColor={greenA700}
          />
        </Link>
        {access.user.id === user.id
        && <a className="delete" onClick={deleteUser}>
          <RaisedButton
            title="This will delete your account"
            label="DELETE"
            labelColor={white}
            backgroundColor={redA700}
          />
        </a>}
      </CardActions>}
    </Card>
  );
}

ProfileSidebar.propTypes = {
  user: PropTypes.object.isRequired,
  access: PropTypes.object.isRequired,
  deleteUser: PropTypes.func.isRequired
};

export default ProfileSidebar;
