import {Component} from 'react'
import './index.css'

class RegistrationForm extends Component {
  state = {
    firstName: '',
    lastName: '',
    isSubmitted: false,
    showFirstNameErr: false,
    showLastNameErr: false,
  }

  onBlurFirstName = () => {
    const isValidFirstName = this.validateFirstName()

    this.setState({showFirstNameErr: !isValidFirstName})
  }

  onBlurLastName = () => {
    const isValidLastName = this.validateLastName()

    this.setState({showLastNameErr: !isValidLastName})
  }

  validateFirstName = () => {
    const {firstName} = this.state
    return firstName !== ''
  }

  validateLastName = () => {
    const {lastName} = this.state
    return lastName !== ''
  }

  getFirstName = e => {
    const firstName = e.target.value
    this.setState({
      firstName,
    })
  }

  getLastName = e => {
    const lastName = e.target.value
    this.setState({
      lastName,
    })
  }

  onSubmitForm = event => {
    event.preventDefault()
    const isValidFirstName = this.validateFirstName()
    const isValidLastName = this.validateLastName()
    if (isValidFirstName && isValidLastName) {
      this.setState({
        isSubmitted: true,
      })
    } else {
      this.setState({
        isSubmitted: false,
        showFirstNameErr: !isValidFirstName,
        showLastNameErr: !isValidLastName,
      })
    }
  }

  renderForm = () => {
    const {firstName, lastName, showFirstNameErr, showLastNameErr} = this.state

    return (
      <div className="form-container">
        <form onSubmit={this.onSubmitForm}>
          <div className="first-name-container">
            <label htmlFor="firstName" className="label">
              FIRST NAME
            </label>
            <br />
            <input
              value={firstName}
              type="text"
              id="firstName"
              className="input-field"
              placeholder="First Name"
              onBlur={this.onBlurFirstName}
              onChange={this.getFirstName}
            />
            <br />
            {showFirstNameErr && <p className="err-msg">Required</p>}
          </div>
          <div className="last-name-container">
            <label htmlFor="lastName" className="label">
              LAST NAME
            </label>
            <br />
            <input
              value={lastName}
              type="text"
              id="lastName"
              className="input-field"
              placeholder="Last Name"
              onBlur={this.onBlurLastName}
              onChange={this.getLastName}
            />
            <br />
            {showLastNameErr && <p className="err-msg">Required</p>}
          </div>
          <button type="submit" className="btn">
            Submit
          </button>
        </form>
      </div>
    )
  }

  submitAnotherResponse = () => {
    this.setState(prevState => ({
      isSubmitted: !prevState.isSubmitted,

      firstName: '',
      lastName: '',
    }))
  }

  renderOnSuccess = () => (
    <>
      <img
        src="https://assets.ccbp.in/frontend/react-js/success-icon-img.png"
        alt="success"
        className="success-logo"
      />
      <p className="success-text">Submitted Successfully</p>
      <button
        type="button"
        className="another-btn"
        onClick={this.submitAnotherResponse}
      >
        Submit Another Response
      </button>
    </>
  )

  render() {
    const {isSubmitted} = this.state
    return (
      <div className="registration-form-container">
        <h1 className="heading">Registration</h1>
        {isSubmitted ? this.renderOnSuccess() : this.renderForm()}
      </div>
    )
  }
}
export default RegistrationForm
