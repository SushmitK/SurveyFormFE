import { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRight,
  faBan,
  faCheck,
  faChevronDown,
  faChevronUp,
} from "@fortawesome/free-solid-svg-icons";

const Home = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [nationality, setNationality] = useState("");
  const [message, setMessage] = useState("");
  const [pageNo, setPageNo] = useState(1);
  const [isPreBtnVisible, setIsPreBtnVisible] = useState(false);
  const [isNextBtnVisible, setIsNextBtnVisible] = useState(true);

  const setDefault = () => {
    setFullName("");
    setEmail("");
    setPhone("");
    setNationality("");
    setMessage("");
  };

  const prevPage = () => {
    if (pageNo > 1) {
      setPageNo(pageNo - 1);
    }
  };

  const nextPage = () => {
    if (pageNo < 6) {
      setPageNo(pageNo + 1);
    }
  };

  useEffect(() => {
    switch (pageNo) {
      case 1:
        setIsNextBtnVisible(true);
        break;

      case 3:
        if (
          email.lastIndexOf("@gmail.com") === email.length - 10 &&
          email.lastIndexOf("@gmail.com") !== 0
        ) {
          setIsNextBtnVisible(true);
        } else {
          setIsNextBtnVisible(false);
        }
        break;

      case 4:
        if (phone.length === 10) {
          setIsNextBtnVisible(true);
        } else {
          setIsNextBtnVisible(false);
        }
        break;

      case 6:
        if (message.length > 0) {
          setIsNextBtnVisible(true);
        } else {
          setIsNextBtnVisible(false);
        }
        break;

      case 7:
        setIsNextBtnVisible(false);
        break;

      default:
        break;
    }

    if (pageNo > 1 && pageNo < 7) {
      setIsPreBtnVisible(true);
    } else {
      setIsPreBtnVisible(false);
    }
  }, [pageNo, phone, email, message]);

  const submitForm = () => {
    let newSurvey = {
      fullName: fullName,
      nationality: nationality,
      email: email,
      phone: phone,
      message: message,
    };
    axios
      .post(`/survey`, newSurvey)
      .then((response) => {
        console.log("Survey created successfully:", response.data);
        toast("Gotcha you");
        setDefault();
      })
      .catch((error) => {
        console.error(
          "Error creating survey:",
          error.response ? error.response.data : error.message
        );
        toast("My Bad! please retry");
      });
  };

  return (
    <section className="w-full relative h-screen scrollbar-none bg-gray-300 bg-[url('../../src/assets/images/bg.jpg')] object-cover object-center bg-cover bg-center overflow-x-hidden overflow-y-scroll">
      {/* <FontAwesomeIcon icon={faXmark} /> */}

      <ToastContainer autoClose={2000} closeOnClick draggable theme="dark" />

      {pageNo === 1 && (
        <>
          <div className="text-ceter flex flex-col justify-center items-center h-full w-full">
            <h1 className="font-main font-semibold text-6xl mb-4">Welcome</h1>
            <h4 className="font-main font-semibold text-3xl mb-1">
              How you feeling about your new product?
            </h4>
            <h4 className="font-main font-semibold text-3xl">
              Hope you love it!
            </h4>

            <h3 className="font-main font-semibold text-4xl mt-12 mb-8">
              Can you spare 5 minutes?
            </h3>

            <button
              onClick={() => {
                setPageNo(2);
              }}
              className="font-pop text-2xl px-6 py-3 bg-gray-800 hover:bg-gray-700 font-semibold text-white hover:text-gray-100 transition-all ease-in-out duration-500 rounded-[5px]"
            >
              Ok, let's go
            </button>
          </div>
        </>
      )}

      {pageNo === 2 && (
        <>
          <div className="text-ceter flex justify-center items-center h-full w-full">
            <div className="w-full max-w-[900px] flex justify-start items-start ">
              <div>
                <h1 className="font-pop text-lg text-gray-900 font-semibold mt-1 mr-4">
                  1{" "}
                  <FontAwesomeIcon
                    icon={faArrowRight}
                    className="text-sm mt-2"
                  />
                </h1>
              </div>
              <div className="w-[90%] flex flex-col">
                <label htmlFor="fullName">
                  <h1 className="font-pop text-4xl font-medium mb-1 text-gray-950">
                    Full Name{" "}
                    <span className="text-gray-900 ml-2 text-sm">
                      (optional)
                    </span>
                  </h1>
                  <h2 className="font-main text-2xl font-medium">
                    For our record can i know your good name
                  </h2>
                </label>
                <input
                  id="fullName"
                  type="text"
                  className="w-full outline-none font-pop text-3xl mt-4 py-2 bg-transparent border-b border-gray-500"
                  placeholder="Narendra Modi"
                  value={fullName}
                  onChange={(e) => {
                    setFullName(e.target.value);
                  }}
                />
                <button
                  onClick={() => {
                    setPageNo(3);
                  }}
                  className="w-fit px-4 py-2 mt-4 font-pop text-xl bg-gray-800 hover:bg-gray-700 font-semibold text-white hover:text-gray-100 transition-all ease-in-out duration-500 rounded-[5px]"
                >
                  Ok <FontAwesomeIcon icon={faCheck} className="ml-2" />
                </button>
              </div>
            </div>
          </div>
        </>
      )}

      {pageNo === 3 && (
        <>
          <div className="text-ceter flex justify-center items-center h-full w-full">
            <div className="w-full max-w-[900px] flex justify-start items-start ">
              <div>
                <h1 className="font-pop text-lg text-gray-900 font-semibold mt-1 mr-4">
                  2{" "}
                  <FontAwesomeIcon
                    icon={faArrowRight}
                    className="text-sm mt-2"
                  />
                </h1>
              </div>
              <div className="w-[90%] flex flex-col">
                <label htmlFor="email">
                  <h1 className="font-pop text-4xl font-medium mb-1 text-gray-950">
                    Email Address{" "}
                  </h1>
                  <h2 className="font-main text-2xl font-medium">
                    Now a days email is your e-aadhar card ! Right ?
                  </h2>
                </label>
                <input
                  id="email"
                  type="email"
                  className="w-full outline-none font-pop text-3xl mt-4 py-2 bg-transparent border-b border-gray-500"
                  placeholder="myemail@gmail.com"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  required
                />
                <button
                  onClick={() => {
                    if (
                      email.lastIndexOf("@gmail.com") === email.length - 10 &&
                      email.lastIndexOf("@gmail.com") !== 0
                    ) {
                      setPageNo(4);
                    }
                  }}
                  className={
                    "w-fit px-4 py-2 mt-4 font-pop text-xl bg-gray-800 hover:bg-gray-700 font-semibold text-white hover:text-gray-100 transition-all ease-in-out duration-500 rounded-[5px]"
                  }
                >
                  {email.lastIndexOf("@gmail.com") === email.length - 10 &&
                  email.lastIndexOf("@gmail.com") !== 0 ? (
                    <>
                      Go Ahead{" "}
                      <FontAwesomeIcon icon={faCheck} className="ml-2" />
                    </>
                  ) : (
                    <>
                      A..Ah <FontAwesomeIcon icon={faBan} className="ml-2" />
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </>
      )}

      {pageNo === 4 && (
        <>
          <div className="text-ceter flex justify-center items-center h-full w-full">
            <div className="w-full max-w-[900px] flex justify-start items-start ">
              <div>
                <h1 className="font-pop text-lg text-gray-900 font-semibold mt-1 mr-4">
                  3{" "}
                  <FontAwesomeIcon
                    icon={faArrowRight}
                    className="text-sm mt-2"
                  />
                </h1>
              </div>
              <div className="w-[90%] flex flex-col">
                <label htmlFor="phone">
                  <h1 className="font-pop text-4xl font-medium mb-1 text-gray-950">
                    Phone Number{" "}
                  </h1>
                  <h2 className="font-main text-2xl font-medium">
                    Dont worry! am not gonna send you money using upi
                  </h2>
                </label>
                <input
                  id="phone"
                  type="tel"
                  className="w-full outline-none font-pop text-3xl mt-4 py-2 bg-transparent border-b border-gray-500"
                  placeholder="7020926583"
                  value={phone}
                  onChange={(e) => {
                    setPhone(e.target.value);
                  }}
                  required
                />
                <button
                  onClick={() => {
                    if (phone.length === 10) {
                      setPageNo(5);
                    }
                  }}
                  className={
                    "w-fit px-4 py-2 mt-4 font-pop text-xl bg-gray-800 hover:bg-gray-700 font-semibold text-white hover:text-gray-100 transition-all ease-in-out duration-500 rounded-[5px]"
                  }
                >
                  {phone.length === 10 ? (
                    <>
                      Lets Go{" "}
                      <FontAwesomeIcon icon={faCheck} className="ml-2" />
                    </>
                  ) : (
                    <>
                      Naah <FontAwesomeIcon icon={faBan} className="ml-2" />
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </>
      )}

      {pageNo === 5 && (
        <>
          <div className="text-ceter flex justify-center items-center h-full w-full">
            <div className="w-full max-w-[900px] flex justify-start items-start ">
              <div>
                <h1 className="font-pop text-lg text-gray-900 font-semibold mt-1 mr-4">
                  4{" "}
                  <FontAwesomeIcon
                    icon={faArrowRight}
                    className="text-sm mt-2"
                  />
                </h1>
              </div>
              <div className="w-[90%] flex flex-col">
                <label htmlFor="Nationality">
                  <h1 className="font-pop text-4xl font-medium mb-1 text-gray-950">
                    Nationality{" "}
                    <span className="text-gray-900 ml-2 text-sm">
                      (optional)
                    </span>
                  </h1>
                  <h2 className="font-main text-2xl font-medium">
                    Are you indian? proud of india
                  </h2>
                </label>
                <input
                  id="Nationality"
                  type="tel"
                  className="w-full outline-none font-pop text-3xl mt-4 py-2 bg-transparent border-b border-gray-500"
                  placeholder="India"
                  value={nationality}
                  onChange={(e) => {
                    setNationality(e.target.value);
                  }}
                />
                <button
                  onClick={() => {
                    setPageNo(6);
                  }}
                  className={
                    "w-fit px-4 py-2 mt-4 font-pop text-xl bg-gray-800 hover:bg-gray-700 font-semibold text-white hover:text-gray-100 transition-all ease-in-out duration-500 rounded-[5px]"
                  }
                >
                  Lets Go <FontAwesomeIcon icon={faCheck} className="ml-2" />
                </button>
              </div>
            </div>
          </div>
        </>
      )}

      {pageNo === 6 && (
        <>
          <div className="text-ceter flex justify-center items-center h-full w-full">
            <div className="w-full max-w-[900px] flex justify-start items-start ">
              <div>
                <h1 className="font-pop text-lg text-gray-900 font-semibold mt-1 mr-4">
                  5{" "}
                  <FontAwesomeIcon
                    icon={faArrowRight}
                    className="text-sm mt-2"
                  />
                </h1>
              </div>
              <div className="w-[90%] flex flex-col">
                <label htmlFor="message">
                  <h1 className="font-pop text-4xl font-medium mb-1 text-gray-950">
                    Message{" "}
                  </h1>
                  <h2 className="font-main text-2xl font-medium">
                    I know you like the product! write something about it
                  </h2>
                </label>
                <textarea
                  id="message"
                  type="tel"
                  className="w-full outline-none font-pop text-3xl mt-4 py-2 bg-transparent border-b border-gray-500"
                  placeholder="I loved it"
                  value={message}
                  onChange={(e) => {
                    setMessage(e.target.value);
                  }}
                  rows={4}
                ></textarea>
                <button
                  onClick={() => {
                    if (message.length > 0) {
                      submitForm();
                      setPageNo(7);
                    }
                  }}
                  className={
                    "w-fit px-4 py-2 mt-4 font-pop text-xl bg-gray-800 hover:bg-gray-700 font-semibold text-white hover:text-gray-100 transition-all ease-in-out duration-500 rounded-[5px]"
                  }
                >
                  {message.length > 0 ? (
                    <>
                      Submit <FontAwesomeIcon icon={faCheck} className="ml-2" />
                    </>
                  ) : (
                    <>
                      Love to here from you{" "}
                      <FontAwesomeIcon icon={faBan} className="ml-2" />
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </>
      )}

      {pageNo === 7 && (
        <>
          <div className="text-ceter flex flex-col justify-center items-center h-full w-full">
            <h1 className="font-main font-semibold text-6xl mb-4">Thank You</h1>
            <h4 className="font-main font-semibold text-3xl mb-2">
              I hope you enjoy going through survey form
            </h4>
            <h4 className="font-main font-semibold text-3xl">
              So call me for interview now!
            </h4>

            <h3 className="font-main font-semibold text-4xl mt-12 mb-8">
              Just Kidding
            </h3>

            <button
              onClick={() => {
                setPageNo(1);
              }}
              className="font-pop text-xl px-6 py-3 bg-gray-800 hover:bg-gray-700 font-semibold text-white hover:text-gray-100 transition-all ease-in-out duration-500 rounded-[5px]"
            >
              Wanna, Submit again
            </button>
          </div>
        </>
      )}

      <div className="absolute right-10 bottom-10 flex">
        {isPreBtnVisible && (
          <button
            onClick={prevPage}
            className="font-pop text-xl px-4 py-3 mr-2 bg-gray-800 hover:bg-gray-700 font-semibold text-white hover:text-gray-100 transition-all ease-in-out duration-500 rounded-[5px]"
          >
            <FontAwesomeIcon icon={faChevronUp} className="" />
          </button>
        )}
        {isNextBtnVisible && (
          <button
            onClick={nextPage}
            className="font-pop text-xl px-4 py-3 bg-gray-800 hover:bg-gray-700 font-semibold text-white hover:text-gray-100 transition-all ease-in-out duration-500 rounded-[5px]"
          >
            <FontAwesomeIcon icon={faChevronDown} className="" />
          </button>
        )}
      </div>
    </section>
  );
};
export default Home;
