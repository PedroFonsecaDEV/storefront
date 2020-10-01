import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import type { Item } from './models/Models';

type Props = {
  item: Item,
  onPressEdit: Function,
  onPressDelete: Function,
};

export default function ItemListElement(props: Props) {
  return (
    <ListItem>
      <ListItemText primary={props.item.name} secondary={props.item.price} />
      <ListItemSecondaryAction>
        <IconButton edge="end" aria-label="edit" onClick={props.onPressEdit}>
          <EditIcon />
        </IconButton>
        <IconButton
          edge="end"
          aria-label="delete"
          onClick={props.onPressDelete}
        >
          <DeleteIcon />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  );
}
