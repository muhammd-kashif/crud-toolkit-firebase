import React, { useEffect, useState } from "react";
// import { useDispatch } from "react-redux";
import { Modal } from "react-responsive-modal";
import { Button, Form, Input, Label } from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import { handleEdit } from "../Redux/counterThunk";


const Update = ({ updateData, updateOpen, onCloseUpdateModal }) => {
    console.log('updateData: ', updateData);
    const initialState = {
      name: updateData?.name || "",
      email: updateData?.email || "",
      role: updateData?.role || "",
      address: updateData?.address || "",
  };
  const dispatch = useDispatch();
  const [user, setUser] = useState(initialState);
  // const [update, setUpdate] = useState({});
  // console.log('update: ', update);

  const {modal} = useSelector((state) => state.crud);

  const newData = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  //............
  const handleSubmit = (e) => {
    e.preventDefault();
    const newForm = {
      id: updateData?.id,
      name: user.name,
      email: user.email,
      role: user.role,
      address: user.address,
    };
    console.log('>>>newForm: ', newForm);
    dispatch(handleEdit(newForm));
    setUser(initialState);
  };
  useEffect(() => {
    setUser(initialState);
  }, [updateData]);

  // useEffect(() => {
  //   setUser(updateData);
  // }, [updateData]);
  // console.log('updateData: ', updateData);

  return (
    <div>
      <Modal open={updateOpen}  onClose={onCloseUpdateModal} center>
        <Form onSubmit={handleSubmit}>
        <h2>Update Modail</h2>
          <Label>Name</Label>
          <Input
            type="text"
            name="name"
            placeholder="name"
            onChange={newData}
            // defaultValue={updateData?.email}
            value={user?.name}
          />
          <Label>Email</Label>
          <Input
            type="email"
            name="email"
            placeholder="email"
            onChange={newData}
            value={user?.email}
           
          />
          <Label>Role</Label>
          <Input
            type="text"
            name="role"
            placeholder="role"
            onChange={newData}
            value={user?.role}
          />
          <Label>Address</Label>
          <Input
            type="text"
            name="address"
            placeholder="text"
            onChange={newData}
            value={user?.address}
          />
          <center>
            <Button className="bg-info my-4 px-4" type="submit">
              Submit
            </Button>
          </center>
        </Form>
      </Modal>
    </div>
  );
};

export default Update;
