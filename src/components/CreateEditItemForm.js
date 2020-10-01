import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import type { Item } from './models/Models';
import './CreateEditItemForm.css';

type Props = {
  onPressSave: Function,
  onPressClose: Function,
  initialItem?: Item,
};

type State = {
  name: string,
  price: number,
};

class CreateEditItemForm extends Component<Props, State> {
  constructor(props) {
    super(props);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handlePriceChange = this.handlePriceChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      name: props.initialItem ? props.initialItem.name : '',
      price: props.initialItem ? props.initialItem.price : '',
    };
  }

  getHeaderText() {
    return this.props.initialItem && this.props.initialItem._id
      ? 'Update Item'
      : 'Add an Item';
  }

  handleNameChange(event) {
    this.setState({ name: event.target.value });
  }

  handlePriceChange(event) {
    this.setState({ price: event.target.value });
  }

  handleSubmit() {
    if (this.props.initialItem) {
      this.props.onPressSave(
        this.state.name,
        this.state.price,
        this.props.initialItem._id
      );
    } else {
      this.props.onPressSave(this.state.name, this.state.price);
    }
  }

  render() {
    return (
      <div className="create-edit-item-form-container">
        <DialogTitle>{this.getHeaderText()}</DialogTitle>
        <DialogContent>
          <TextField
            required
            label="Name"
            fullWidth
            type="text"
            onChange={this.handleNameChange}
            value={this.state.name}
          />
          <TextField
            required
            label="Price"
            fullWidth
            type="number"
            onChange={this.handlePriceChange}
            value={this.state.price}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={this.props.onPressClose} color="primary">
            Cancel
          </Button>
          <Button onClick={this.handleSubmit} color="primary">
            Save
          </Button>
        </DialogActions>
      </div>
    );
  }
}

export default CreateEditItemForm;
