import { useRef, useState } from "react";
import "./contact.css";

import emailjs from "emailjs-com";

const Contact = () => {
  const formRef = useRef();
  const [done, setDone] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await emailjs.sendForm(
        "service_2qgz10r",
        "template_dzbyz08",
        formRef.current,
        "hUmzTb7sbZ8rECLs0"
      );
      setDone(true);
      alert("訊息傳送成功");
    } catch (err) {
      console.log(err.text);
    }
  };

  return (
    <div className="c">
      <div className="c-bg"></div>
      <div className="c-wrapper">
        <div className="c-right">
          <h2>聯絡資訊</h2>
          <p className="c-desc">歡迎透過信箱聯繫報價</p>
          <form ref={formRef} onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Name"
              name="user_name"
              onChange={(e) => e.target.value}
              required
            />
            <input
              type="text"
              placeholder="Subject"
              name="user_subject"
              onChange={(e) => e.target.value}
            />
            <input
              type="text"
              placeholder="Email"
              name="user_email"
              onChange={(e) => e.target.value}
              required
            />
            <input
              type="text"
              placeholder="Phone"
              name="phone"
              onChange={(e) => e.target.value}
            />
            <textarea
              rows="5"
              placeholder="Message"
              name="message"
              minLength={5}
              maxLength={2000}
            />
            <button>Submit</button>
            {done && done}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
