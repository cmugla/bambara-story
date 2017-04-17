import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

class TextInput extends PureComponent {
  focus = () => this.refs.input.focus()

  blur = () => this.refs.input.blur()

  handleChange = event => {
    const { onChange, onKeyPress } = this.props

    this.setState({ value: event.target.value })

    if (onChange) onChange(event)

    if (onKeyPress) onKeyPress(event)
  }

  render() {
    const {
      id,
      autoComplete,
      name,
      maxlength,
      placeholder,
      required,
      className,
      type,
      onChange,
      disabled,
      onKeyPress,
      autoFocus,
      min,
      max,
      error,
      label,
      value,
    } = this.props

    const { handleChange } = this
    const block = 'text-input'
    const inputProps = {
      ref: 'input',
      className: 'input',
      onChange: handleChange,
      onKeyPress: handleChange
    }
    let { autoSize } = this.props

    if (min) inputProps.min = min

    if (max) inputProps.max = max

    if (id) inputProps.id = id

    if (autoComplete) inputProps.autoComplete = autoComplete

    if (name) inputProps.name = name

    if (maxlength) inputProps.maxLength = maxlength

    if (placeholder) inputProps.placeholder = placeholder

    if (value) inputProps.defaultValue = value

    if (disabled) inputProps.disabled = disabled

    if (autoFocus) inputProps.autoFocus = autoFocus

    else inputProps.type = type || 'text'

    return (
      <span className={`${block} ${className}`}>
        {label && <label className="label" htmlFor={id || null}>{label}</label>}
        {type === 'textarea' && <textarea {...inputProps} />}
        {type !== 'textarea' && <input {...inputProps} onBlur={this.props.onBlur} />}
        {error &&<label className="error">{error}</label>}
        {required && <span className="required">*</span>}
      </span>
    )
  }
}

TextInput.propTypes = {
  autoComplete: PropTypes.string,
  className: PropTypes.string,
  error: PropTypes.string,
  label: PropTypes.string,
  maxlength: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]),
  onKeyPress: PropTypes.func,
  placeholder: PropTypes.string,
  required: PropTypes.bool,
  type: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
}

export default TextInput
