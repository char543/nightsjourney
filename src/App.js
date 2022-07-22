import { useState } from 'react';
import './App.css';

function App() {

//setup useState for mailer

const [mailerState, setMailerState] = useState({
  email: "",
  name: "",
  message: "",
});

//function to handle the state

function handleStateChange(e) {
  setMailerState((prevState) => ({
    ...prevState,
    [e.target.name]: e.target.value,
  }));
}

//function to post to the route

const submitEmail = async (e) => {
e.preventDefault();
console.log({ mailerState });
const response = await fetch("http://localhost:3001/send", {
  method: "POST",
  headers: {
    "Content-type": "application/json",
  },
  body: JSON.stringify({ mailerState }),
})
  .then((res) => res.json())
  .then(async (res) => {
    const resData = await res;
    console.log(resData);
    if (resData.status === "success") {
      alert("Message Sent");
    } else if (resData.status === "fail") {
      alert("Message failed to send");
    }
  })
  .then(() => {
    setMailerState({
      email: "",
      name: "",
      message: "",
    });
  });
};

  return (
    <div className="App h-screen bg-black justify-around items-center flex flex-col">
      <img className='' src='nights.jpg'></img>
      <div className="z-10 text-white flex justify-center items-center flex-col">
          <span className="footer-title">Newsletter</span>
          <div className="form-control w-[280px] md:w-80">
            <label className="label">
              <span className="label-text ">Enter your email address</span>
            </label>
            <form className="relative" onSubmit={submitEmail}>
              <input
                className="input input-bordered w-full pr-16"
                placeholder="username@site.com"
                onChange={handleStateChange}
                name="email"
                value={mailerState.email}
              />
              <button className="btn btn-primary bg-blue-700 hover:bg-blue-800 absolute top-0 right-0 rounded-l-none">
                Subscribe
              </button>
            </form>
          </div>
        </div>
    </div>
  );
}

export default App;
