import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router';
import toastr from 'toastr';
import Divider from 'material-ui/Divider';
import { Card } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import Nav from '../layouts/Nav.jsx';
import Sidebar from '../layouts/Sidebar.jsx';
import * as roleActions from '../../actions/roleActions';
import insertRole from '../../utils/insertRole';
import TextInput from '../forms/TextInput.jsx';
import handleError from '../../utils/errorHandler';

class ManageRolesPage extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      roles: [],
      newRole: { title: '' },
      editRole: { title: '' },
      roleToEdit: ''
    };
    this.editButtonClick = this.editButtonClick.bind(this);
    this.handleEditChange = this.handleEditChange.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.onEditSubmit = this.onEditSubmit.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillMount() {
    this.props.actions.getRoles();
  }

  componentDidMount() {
    $('.modal').modal();
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      roles: nextProps.roles
    });
  }

  handleChange(event) {
    if (!/[^A-Za-z]/.test(event.target.value)) {
      const newRole = this.state.newRole;
      newRole.title = event.target.value.substr(0, 20);
      this.setState({ newRole });
    }
  }

  handleEditChange(event) {
    if (!/[^A-Za-z]/.test(event.target.value)) {
      const editRole = this.state.editRole;
      editRole.title = event.target.value.substr(0, 20);
      this.setState({ editRole });
    }
  }

  onSubmit() {
    this.props.actions.createRole(this.state.newRole)
    .then(() => {
      toastr.success('Role added successfully');
      const newRole = this.state.newRole;
      this.state.newRole.title = '';
      this.setState({ newRole });
    })
    .catch(error => handleError(error));
  }

  onEditSubmit() {
    this.props.actions.updateRole(this.state.roleToEdit, this.state.editRole)
    .then(() => {
      $('#roleModal').modal('close');
      toastr.success('Role updated successfully');
    })
    .catch(error => handleError(error));
  }

  editButtonClick(e, role, title) {
    this.setState({ roleToEdit: role });
    this.setState({ editRole: { title } });
  }

  deleteRole(roleId) {
    this.props.actions.deleteRole(roleId)
    .then(() => {
      toastr.warning('You have deleted a role');
    });
  }

  placeRoles = (role) => {
    return (
      <TableRow key={role.id}>
        <TableRowColumn>{role.id}</TableRowColumn>
        <TableRowColumn>{role.title}</TableRowColumn>
        <TableRowColumn>
          <a href="#roleModal" onClick={e => this
            .editButtonClick(e, role.id, role.title)}>
            <i className="material-icons">edit</i>
          </a>
          {role.id > 3 &&
            <a href="#!" onClick={() => { this.deleteRole(role.id); }}>
              <i className="material-icons">delete_forever</i>
            </a>}
        </TableRowColumn>
      </TableRow>
    );
  }

  render() {
    return (
      <div className="roles-page">
        <div className="row">
          <div className="col s12 m4 l3">
            <Sidebar />
          </div>
          <div className="col s12 m8 l9">
            <div className="row">
              <Card className="roles-card">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHeaderColumn>ID</TableHeaderColumn>
                      <TableHeaderColumn>Title</TableHeaderColumn>
                      <TableHeaderColumn>Actions</TableHeaderColumn>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                  {this.state.roles &&
                  this.state.roles.map(this.placeRoles)}
                  </TableBody>
                </Table>
              </Card>
              <form id="roles-form" onSubmit={this.onSubmit}>
                <TextInput
                  name="role"
                  type="text"
                  fullWidth={true}
                  floatText="Role"
                  hint="Add A New Role"
                  handleChange={this.handleChange}
                  value={this.state.newRole.title}
                />
                <FlatButton
                  backgroundColor="#a4c639"
                  hoverColor="#8AA62F"
                  label="Add Role"
                  disabled={this.state.newRole.title.length === 0}
                  onClick={this.onSubmit}
                />
              </form>

              <div id="roleModal" className="modal">
                <div className="modal-content">
                  <h3 className="center">Edit Role</h3>
                  <form onSubmit={this.onEditSubmit}>
                    <TextInput
                      name="edit-role"
                      type="text"
                      fullWidth={true}
                      floatText="Edit Role"
                      hint="Edit Role"
                      handleChange={this.handleEditChange}
                      value={this.state.editRole.title}
                    />
                    <FlatButton
                      backgroundColor="#a4c639"
                      hoverColor="#8AA62F"
                      label="Edit Role"
                      disabled={this.state.editRole.title.length === 0}
                      onClick={this.onEditSubmit}
                    />
                  </form>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    );
  }
}

ManageRolesPage.propTypes = {
  actions: PropTypes.object.isRequired,
};

function mapStateToProps(state, ownProps) {
  return {
    roles: state.roles,
    access: state.userAccess
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(roleActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageRolesPage);