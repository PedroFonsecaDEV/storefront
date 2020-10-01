import React, { Component } from 'react';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Header from './components/Header';
import ItemListElement from './components/ItemListElement';
import type { Item } from './models/Models';

const API_URL = 'http://localhost:5000';

type State = {
  isLoading: Boolean,
  items: Array<Item>,
};

class App extends Component<State> {
  constructor() {
    super();
    this.fetchItems = this.fetchItems.bind(this);
    this.handleCreate = this.handleCreate.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.state = {
      isLoading: false,
      items: [],
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

  handleEdit(item: Item) {
    console.log('Edit: ', item);
  }

  handleDelete(item: Item) {
    fetch(API_URL + '/items/' + item._id, { method: 'DELETE' }).then(
      (response) => {
        this.fetchItems();
      }
    );
  }

  handleCreate() {
    console.log('Create');
  }

  render() {
    return (
      <div>
        <Header onPressCreate={this.handleCreate}></Header>
        {this.state.isLoading ? (
          <Typography variant="h6">Hand on, loading...</Typography>
        ) : (
          <List>
            {this.state.items.map((item) => (
              <ItemListElement
                key={item._id}
                item={item}
                onPressEdit={() => this.handleEdit(item)}
                onPressDelete={() => this.handleDelete(item)}
              />
            ))}
          </List>
        )}
      </div>
    );
  }
}

export default App;
