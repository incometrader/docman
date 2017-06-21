import React from 'react';
import FlatButton from 'material-ui/FlatButton';
import TextInput from '../forms/TextInput.jsx';


function SignupForm({ onSubmit, handleChange, signupDetails, handleConfirmPassword, confirmPassword, signupErrors }) {
  return (
    <form onSubmit={onSubmit} id="signup-form">
      <div>
        <TextInput
          name="name"
          type="text"
          errorText={signupErrors.name}
          floatText="Name"
          handleChange={handleChange}
          value={signupDetails.name}
        />
      </div>
      <div>
        <TextInput
          name="email"
          type="email"
          errorText={signupErrors.email}
          floatText="Email"
          handleChange={handleChange}
          value={signupDetails.email}
        />
      </div>
      <div>
        <TextInput
          name="username"
          type="text"
          errorText={signupErrors.username}
          floatText="Username"
          handleChange={handleChange}
          value={signupDetails.username}
        />
      </div>
      <div>
        <TextInput
          name="password"
          type="password"
          errorText={signupErrors.password}
          floatText="Password"
          handleChange={handleChange}
          value={signupDetails.password}
        />
      </div>
      <div>
        <TextInput
          name="confirmPassword"
          type="password"
          errorText={signupErrors.confirmPassword}
          floatText="Confirm Password"
          handleChange={handleConfirmPassword}
          value={confirmPassword}
        />
      </div>
      <FlatButton
        backgroundColor="#a4c639"
        hoverColor="#8AA62F"
        label={location.pathname === '/' ?
        'Create an Account' : 'Update Account'}
        onClick={onSubmit}
      />
    </form>
  );
}

export default SignupForm;
