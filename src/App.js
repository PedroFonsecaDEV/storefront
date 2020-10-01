import React, { Component } from 'react';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Header from './components/Header';
import Dialog from '@material-ui/core/Dialog';
import ItemListElement from './components/ItemListElement';
import CreateEditItemForm from './components/CreateEditItemForm';
import type { Item } from './models/Models';

const API_URL = 'http://localhost:5000';

type State = {
  isLoading: Boolean,
  items: Array<Item>,
  isModalOpen: Boolean,
  itemToUpdate?: Item,
};

class App extends Component<State> {
  constructor() {
    super();
    this.fetchItems = this.fetchItems.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
    this.handleSave = this.handleSave.bind(this);
    this.state = {
      isLoading: false,
      items: [],
      isModalOpen: false,
    };
  }

  componentDidMount() {
    this.fetchItems();
  }

  fetchItems() {
    this.setState({ isLoading: true }, () => {
      fetch(API_URL + '/items')
        .then((response) => response.json())
        .then((data) => {
          this.setState({ items: data, isLoading: false });
        });
    });
  }

  handleDelete(item: Item) {
    fetch(API_URL + '/items/' + item._id, { method: 'DELETE' }).then(
      (response) => {
        this.fetchItems();
      }
    );
  }

  handleSave(name: string, price: number, id?: string) {
    this.handleCloseModal();
    if (id) {
      fetch(API_URL + '/items/' + id, {
        method: 'PUT',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify({
          name,
          price,
        }),
      }).then((response) => {
        this.fetchItems();
      });
    } else {
      fetch(API_URL + '/items', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify({
          name,
          price,
        }),
      }).then((response) => {
        this.fetchItems();
      });
    }
  }

  handleOpenModal(initialItem: Item) {
    this.setState({
      isModalOpen: true,
      itemToUpdate: initialItem,
    });
  }

  handleCloseModal() {
    this.setState({
      isModalOpen: false,
    });
  }

  render() {
    return (
      <div>
        <Header
          onPressCreate={this.handleOpenModal}
          disabled={this.state.isLoading}
        ></Header>
        {this.state.isLoading ? (
          <Typography variant="h6">Hand on, loading...</Typography>
        ) : (
          <List>
            {this.state.items.map((item) => (
              <ItemListElement
                key={item._id}
                item={item}
                onPressEdit={() => this.handleOpenModal(item)}
                onPressDelete={() => this.handleDelete(item)}
              />
            ))}
          </List>
        )}
        <Dialog open={this.state.isModalOpen} onClose={this.handleClose}>
          <CreateEditItemForm
            onPressClose={this.handleCloseModal}
            onPressSave={this.handleSave}
            initialItem={this.state.itemToUpdate}
          />
        </Dialog>
      </div>
    );
  }
}

export default App;
