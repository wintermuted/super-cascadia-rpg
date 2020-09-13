import React, { useEffect, useState } from "react";
import { ItemModel } from "@super-cascadia-rpg/api";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import { useParams } from "react-router-dom";
import fetchItemDataHook from "../../hooks/api/items/fetchItemDataHook";
import { getItemTypeNameById } from "../../util/itemType";
import { isEmpty, toNumber } from "lodash";
import Loading from "../../components/Loading";
import DetailPageWrapper from "../../components/DetailPageWrapper";

interface ItemEditState {
  item: ItemModel;
}

type ItemsStateHook = [ItemEditState, (data: any) => void];

function ItemViewForm({ item }: { item: ItemModel }) {
  const itemTypeName = getItemTypeNameById(item?.type);

  return (
    <>
      <Form.Group as={Row} controlId="formId">
        <Form.Label column sm="2">
          ID
        </Form.Label>
        <Col sm="10">
          <Form.Control readOnly defaultValue={item.id} />
        </Col>
      </Form.Group>

      <Form.Group as={Row} controlId="formName">
        <Form.Label column sm="2">
          Name
        </Form.Label>
        <Col sm="10">
          <Form.Control readOnly defaultValue={item.name} />
        </Col>
      </Form.Group>

      <Form.Group as={Row} controlId="formDescription">
        <Form.Label column sm="2">
          Description
        </Form.Label>
        <Col sm="10">
          <Form.Control readOnly value={item.description} />
        </Col>
      </Form.Group>

      <Form.Group as={Row} controlId="formType">
        <Form.Label column sm="2">
          Type
        </Form.Label>
        <Col sm="10">
          <Form.Control as="select" readOnly value={itemTypeName}>
            <option value={0}>Food</option>
            <option value={1}>Weapon</option>
            <option value={2}>Accessory</option>
            <option value={3}>Key Item</option>
            <option value={4}>Armor</option>
          </Form.Control>
        </Col>
      </Form.Group>
    </>
  );
}

export default function ItemView() {
  const { id } = useParams();
  const [data, setData]: ItemsStateHook = useState({ item: {} as ItemModel });
  const { item } = data;

  // @ts-ignore
  useEffect(fetchItemDataHook(id, setData), {});

  if (isEmpty(item)) {
    return <Loading />;
  }

  return (
    <DetailPageWrapper
      objectId={toNumber(id)}
      name={item.name}
      routeName={"items"}
    >
      <ItemViewForm item={item} />
    </DetailPageWrapper>
  );
}
