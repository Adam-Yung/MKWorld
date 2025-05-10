import React, {useState, useRef} from 'react';
import emailjs from '@emailjs/browser';

const Contact = () => {
  const formRef = useRef(null);

  const [form, setform] = useState({name: '', email: '', message: ''});
  const [isLoading, setisLoading] = useState(false);
  
  const handleChange = (e) => {
    setform({...form, [e.target.name]: e.target.value})
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setisLoading(true);

    // console.log(`Sending email
    //   service id: {${import.meta.env.VITE_APP_EMAILJS_SERVICE_ID}},
    //   template id: {${import.meta.env.VITE_APP_EMAILJS_TEMPLATE_ID}}
    //   public key: {${import.meta.env.VITE_APP_EMAILJS_PUBLIC_KEY}}`)
    emailjs.send(
      import.meta.env.VITE_APP_EMAILJS_SERVICE_ID,
      import.meta.env.VITE_APP_EMAILJS_TEMPLATE_ID,
      {
        from_name: form.name,
        to_name: "Adam",
        from_email: form.email,
        to_email: "thetoastacademy@gmail.com",
        message: form.message
      },
      import.meta.env.VITE_APP_EMAILJS_PUBLIC_KEY
    ).then(() => {
      setisLoading(false);
      // TODO: Show success message
      // TODO: Hide Alert
      setform({name: '', email: '', message: ''});
    }).catch((error) => {
      console.log(error);
      setisLoading(false);
      setform({name: '', email: '', message: ''});
      // TODO: Show error message
    })
  };

  const handleFocus = () => {};
  const handleBlur = () => {};
  return (
    <section className='relative flex lg:flex-row flex-col max-container' ref={formRef}>
      <div className='flex-1 min-w-[50%] flex flex-col'>
        <h1 className='head-text'>
          Get in Touch
        </h1>

        <form
          className='w-full flex flex-col gap-7 mt-14'
          onSubmit={handleSubmit}
          >
            <label className='text-black-500 font-semibold'>
              Name
              <input
                type="text"
                name='name'
                className='input'
                placeholder='John'
                required
                value={form.name}
                onChange={handleChange}
                onFocus={handleFocus}
                onBlur={handleBlur}
                >

                </input>
            </label>

            <label className='text-black-500 font-semibold'>
              Email
              <input
                type="email"
                name='email'
                className='input'
                placeholder='johndoe@gmail.com'
                required
                value={form.email}
                onChange={handleChange}
                onFocus={handleFocus}
                onBlur={handleBlur}
                >

                </input>
            </label>

            <label className='text-black-500 font-semibold'>
              Your Message
              <textarea
                name='message'
                rows={4}
                className='textarea'
                placeholder='Fruit for thoughts?'
                required
                value={form.message}
                onChange={handleChange}
                onFocus={handleFocus}
                onBlur={handleBlur}
              />
            </label>
            <button
              type='submit'
              className='btn'
              disabled={isLoading}
              onFocus={handleFocus}
              onBlur={handleBlur}
            >
              {isLoading ? "Sending..." : "Send Message"}
            </button>
          </form>
      </div>
    </section>
  )
}

export default Contact