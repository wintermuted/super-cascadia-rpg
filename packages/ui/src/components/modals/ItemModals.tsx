import { ItemModel } from "@super-cascadia-rpg/api/build/src/model/items/itemModel";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import React from "react";

interface Props {
  show: boolean;
  selectedItem: ItemModel;
  handleClose: () => void;
  handleShow: (id: number) => void;
}

export function ItemModal({ show, handleClose, selectedItem }: Props) {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>
          Delete the {selectedItem.name} ({selectedItem.id})
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Please confirm that you would like to delete this item. This action is
        permanent.
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="danger" onClick={handleClose}>
          Delete Item
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
