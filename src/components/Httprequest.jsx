import { Button, Form, Modal } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import $ from "jquery";

function Httprequest() {
  const [login, setLogin] = useState(true);
  const [logout, setLogout] = useState(true);
  const [allData, setAllData] = useState([]);
  const [oneData, setOneData] = useState([]);
  const [counter, setCounter] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [animation, setAnimation] = useState(
    "animate__animated animate__fadeInRight"
  );
  const [index, setIndex] = useState(1);
  const [button, setButton] = useState(true);
  const [input, setInput] = useState({
    title: "",
    body: "",
  });
  function ajaxRequest() {
    $.ajax({
      type: "GET",
      url: "http://localhost:1000",
      success: (res) => {
        // console.log(res);
        return (
          setAllData(res),
          // console.log(res[res.length - 1].id);
          setIndex(res[res.length - 1].id + 1)
          // console.log(index)
        );
      },
    });
  }

  function httpRequest() {
    $.ajax({
      type: `get`,
      url: `http://localhost:1000/${counter}`,
      success: (response) => {
        // console.log(response);
        if (response.length == 0) {
          setOneData([
            {
              title: "No Data",
              body: "There is No Data",
            },
          ]);
        } else {
          setOneData(response);
        }
      },
    });
  }

  function prevFunction() {
    if (counter > 1) {
      setCounter(counter - 1);
      setAnimation("animate__animated animate__fadeInLeft");
    }
  }

  // useEffect(() => {
  //   alert("Hello World!");
  // }, [login, logout]);

  useEffect(() => {
    // let myBtn = document.getElementById("myBtn");
    // myBtn.addEventListener("click", () => {
    //   alert("Hello World!");
    // })

    $("#myBtn").on("click", () => {
      alert("Hello World!");
    });
  }, []);

  useEffect(() => {
    // console.log(allData[allData.length-1].title);
    ajaxRequest();
    httpRequest();
  }, [counter]);

  function prevFunction() {
    if (counter > 1) {
      setCounter(counter - 1);
    }
    setAnimation("animate__animated animate__fadeInLeft");
  }

  function nextFunction() {
    if (counter < allData.length - 1) {
      setCounter(counter + 1);
    }
    setAnimation("animate__animated animate__fadeInRight");
  }

  function Card({ item }) {
    return (
      <>
        <div
          className={`card my-3 shadow-sm ${animation}`}
          style={{ height: 120 }}
        >
          <div className="card-header fw-bold text-capitalize d-flex justify-content-between align-item-center">
            {item.title}
            <div>
              <Button
                className="btn btn-info me-2"
                on
                onClick={() => editData(item)}
              >
                <i className="fa fa-edit"></i>
              </Button>
              <Button
                className="btn btn-danger"
                on
                onClick={() => deleteData(item.id)}
              >
                <i className="fa fa-edit"></i>
              </Button>
            </div>
          </div>
          <div className="card-body">{item.body}</div>
        </div>
      </>
    );
  }
  //Insert Data
  function insertData(e) {
    e.preventDefault();
    let form = e.target;
    // console.log(form);
    // console.log(...form);
    let formData = new FormData(form);
    // console.log(formData);
    // console.log(formData.get("title"));
    // console.log(formData.get("body"));
    let title = formData.get("title");
    let body = formData.get("body");
    let id = index;
    // console.log(id);
    // console.log(title);
    // console.log(body);

    $.ajax({
      type: "POST",
      url: "http://localhost:1000",
      data: {
        id: id,
        title: title,
        body: body,
      },
      success: (response) => {
        // console.log(response);
        return (
          response,
          setShowModal(false),
          setCounter(response.data.id),
          setInput({
            title: "",
            body: "",
          })
        );
      },
    });
  }
  //Delete Data
  function deleteData(id) {
    // console.log(id);
    let cnf = window.confirm("Are you sure you want to delete this data?");
    if (cnf) {
      $.ajax({
        type: "DELETE",
        url: `http://localhost:1000/${id}`,
        success: (response) => {
          console.log(response);
          let temp;
          if (allData.length > id) {
            temp = id + 1;
          } else if (allData.length < id) {
            temp = id - 1;
          }
          return response, setCounter(temp);
        },
      });
      // alert("Data Deleted Successfully");
    } else {
      window.alert("Your Data is Safe");
    }
  }
  //Edit Data
  function editData(item) {
    //console.log(item);
    return setShowModal(true), setButton(false), setInput(item);
  }
  //Update Data
  function updateData(e) {
    e.preventDefault();
    let formData = new FormData(e.target);
    $.ajax({
      type: "PUT",
      url: `http://localhost:1000/${counter}`,
      data: formData,
      processData: false,
      contentType: false,
      success: (res) => {
        console.log(res);
      },
    });
    return (
      //alert("ok"),
      setShowModal(false),
      setOneData([input]),
      setInput({
        title: "",
        body: "",
      })
    );
    //setCounter(this.index+1)
  }

  //Input Field Value
  function setInputValue(e) {
    e.preventDefault();
    //console.log("ok");
    let input = e.target;
    let value = e.value;
    //console.log(value);
    let key = input.name;
    //alert(key);
    return setInput({
      [key]: value,
    });
    return setInput((old) => {
      return {
        ...old,
        [key]: value,
      };
    });
  }

  return (
    <>
      <div className="container mt-2 bg-primary bg-opacity-10 py-2 px-5 pb-5 shadow-sm rounded overflow-hidden">
        <h1 className="text-center">Http Request</h1>
        {/* <Button
        className="btn btn-primery me-2"
        onClick={() => {
          setLogin(!login);
        }}
      >
        Login
      </Button>
      <Button
        className="btn btn-danger me-2"
        onClick={() => {
          setLogin(!logout)
        }}
      >
        Logout
      </Button> */}
        {/* <Button id="myBtn" className="me-2">Click Me</Button>
      <Button onClick={ajaxRequest}>
        Click
      </Button> */}
        {/* {
        JSON.stringify(allData)
      } */}

        <div className="d-flex text justify-content-between align-items-center">
          <div className="display-4 fw-bold">
            Comments <sup>{allData.length ? counter : null}</sup>
          </div>
          <Button
            className="fs-4 shadow-sm bg-secondary bg-opacity-25 rounded px-2"
            onClick={() => (
              setShowModal(true),
              setButton(true),
              setInput({
                title: "",
                body: "",
              })
            )}
          >
            New Comments <sup>{allData.length}</sup>
          </Button>
        </div>
        {oneData.map((item, index) => {
          return <Card item={item} key={index} />;
        })}
        <div className="float-end">
          <Button className="me-2" onClick={prevFunction}>
            <i className="fa fa-angle-left"></i>
          </Button>
          <Button onClick={nextFunction}>
            <i className="fa fa-angle-right"></i>
          </Button>
        </div>
        <Modal
          show={showModal}
          onHide={() => {
            setShowModal(false);
          }}
        >
          <Modal.Header closeButton>
            <Modal.Title>Add New Comment</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={button ? insertData : updateData}>
              <Form.Group>
                <Form.Label>Title</Form.Label>
                <Form.Control
                  type="text"
                  name="title"
                  value={input.title}
                  onChange={setInputValue}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Body</Form.Label>
                <textarea
                  name="body"
                  className="form-control"
                  value={input.body}
                  onChange={setInputValue}
                ></textarea>
              </Form.Group>
              {button ? (
                <Button type="submit" className="mt-3 me-2">
                  Submit
                </Button>
              ) : (
                <Button type="submit" className="mt-3 me-2 bg-info">
                  Update
                </Button>
              )}
              <Button type="submit" variant="danger" className="mt-3">
                Cancel
              </Button>
              {/* {JSON.stringify(input) 
               } */}
            </Form>
          </Modal.Body>
          <Modal.Footer></Modal.Footer>
        </Modal>
      </div>
    </>
  );
}

export default Httprequest;
