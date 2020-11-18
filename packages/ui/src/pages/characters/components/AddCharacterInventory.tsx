import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import fetchItemsDataHook from "../../../hooks/api/items/fetchItemsDataHook";
import { Item } from "@super-cascadia-rpg/api";
import { ITEM_GRID_TABS } from "../../Items/ItemGrid/ItemGrid";
import { map } from "lodash";
import { Formik, FormikHelpers, FormikValues } from "formik";
import * as yup from "yup";
import { addCharacterInventory } from "../../../api/characters/inventory/addCharacterInventor";

const DEFAULT_OPTION_ID = "--";

function ItemSelectControl({
  items,
  handleChange,
  selectedItem,
}: {
  items: Item[];
  selectedItem: string;
  handleChange: (event: React.SyntheticEvent) => void;
}) {
  const defaultOption = (
    <option value={DEFAULT_OPTION_ID} key="default">
      --
    </option>
  );

  const itemOptions = map(items, (item: Item) => {
    return (
      <option value={item.id} key={item.id}>
        {item.id} - {item.name}
      </option>
    );
  });

  const selectOptions = [defaultOption, ...itemOptions];

  return (
    <Form.Control
      as="select"
      custom
      onChange={handleChange}
      value={selectedItem}
      id="itemId"
    >
      {selectOptions}
    </Form.Control>
  );
}

interface Props {
  characterId: number;
  onDataReload: () => void;
}

export default function AddCharacterInventory({
  characterId,
  onDataReload,
}: Props) {
  const [items, setItemsData] = useState([] as Item[]);

  useEffect(
    fetchItemsDataHook(ITEM_GRID_TABS.ALL, setItemsData, () => {}),
    // @ts-ignore
    {}
  );

  const handleSubmit = (values: FormikValues, actions: FormikHelpers<any>) => {
    console.log(values);

    if (values.itemId !== DEFAULT_OPTION_ID) {
      actions.setSubmitting(true);
      addCharacterInventory(characterId, values.itemId).then((response) => {
        onDataReload();
        actions.resetForm();
      });
    }
  };

  const initialFormState = {
    itemId: "",
  };

  const schema = yup.object({
    itemId: yup.string(),
  });

  return (
    <Formik
      validationSchema={schema}
      onSubmit={handleSubmit}
      initialValues={initialFormState}
    >
      {({ handleSubmit, dirty, handleChange, values, touched, errors }) => {
        return (
          <Form onSubmit={handleSubmit} noValidate>
            <Form.Group controlId="itemId">
              <Form.Label>Add Inventory</Form.Label>
              <Row>
                <Col xs={10}>
                  <ItemSelectControl
                    items={items}
                    selectedItem={values.itemId}
                    handleChange={handleChange}
                  />
                </Col>
                <Col xs={1}>
                  <Button disabled={!dirty} type="submit" variant="primary">
                    Submit
                  </Button>
                </Col>
              </Row>
            </Form.Group>
          </Form>
        );
      }}
    </Formik>
  );
}
