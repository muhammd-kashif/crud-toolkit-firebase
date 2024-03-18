import "bootstrap/dist/css/bootstrap.min.css";
import React, { useEffect, useState } from "react";
import "react-responsive-modal/styles.css";
import { Button, Col, Container, Row, Table } from "reactstrap";
import { Modal } from "react-responsive-modal";
import Addmodal from "./AddModal";
import { useDispatch, useSelector } from "react-redux";
import { deleteModal, getModal } from "../Redux/counterThunk";
import AddModal from "./AddModal";
import Update from "./Update";

const Home = () => {
  const dispatch = useDispatch();
  const [updateData, setUpdateData] = useState({});
  console.log("updateData: ", updateData);
  const { modal } = useSelector((state) => state.crud);
  console.log("modal: ", modal);
  //AddUser...................
  const [open, setOpen] = useState(false);
  const onOpenModal = () => setOpen(!open);
  const onCloseModal = () => setOpen(!open);
//update user...................
  const [updateOpen, setUpdateOpen] = useState(false);
  const onOpenUpdateModal = () => setUpdateOpen(!updateOpen);
  const onCloseUpdateModal = () => setUpdateOpen(!updateOpen);

  const handleEdit = (id) => {
    console.log("id: ", id);
    const newDataModal = modal?.find((item) => item.id === id);
    console.log('newDataModal: ', newDataModal);
    setUpdateData(newDataModal);
    setUpdateOpen(true); 
  };

  useEffect(() => {
    dispatch(getModal());
  }, [dispatch]);
  return (
    <>
      <Container className="bg-light border">
        <Row className="main bg-light p-3">
          <Col xs="12">
            <h1 className="text-center mb-4">Crud App</h1>
          </Col>
          <Row>
            <Col xs="12" className="d-flex justify-content-end mb-4">
              <Button color="primary" className="mx-4" onClick={onOpenModal}>
                AddUser
              </Button>
            </Col>
          </Row>
          <hr />
          <Row>
            <Col xs="12">
              <Table>
                <thead className="bg-dark text-white">
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Address</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {modal?.map((user, index) => {
                    return (
                      <tr key={index}>
                        <td scope="row">{user.name}</td>
                        <td>{user.email}</td>
                        <td>{user.role}</td>
                        <td>{user.address}</td>
                        <td>
                          <div className="mx-4 d-flex">
                            <Button
                              color="success"
                              onClick={() => handleEdit(user.id)}
                            >
                              Edit
                            </Button>
                            <Button
                              color="danger"
                              className="mx-4"
                              onClick={() => dispatch(deleteModal(user.id))}
                            >
                              Delete
                            </Button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
            </Col>
          </Row>
        </Row>
      </Container>
      <AddModal
        open={open}
        onOpenModal={onOpenModal}
        onCloseModal={onCloseModal}
      />
      <Update
        updateData={updateData}
   updateOpen = {updateOpen}
   onCloseUpdateModal ={onCloseUpdateModal }
        // onOpenUPdateModal={onOpenUpdateModal}
       
      />
    </>
  );
};

export default Home;
